var React = require('react'),
    ApiUtil = require('../util/api_util');

var Song = React.createClass({
  getInitialState: function () {
    return {
      localTime: 0,
      ytTime: 0,
      nextBeat: 0
    }
  },

  componentDidMount: function () {
    $(document.body).on('keydown', this.keyDownHandler);
    this.enableIframeApi();
    ApiUtil.getSongBeats("1", this.storeSongBeats);
  },

  componentWillUnmount: function () {
    $(document.body).off('keydown', this.keyDownHandler);
  },

  keyDownHandler: function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.which === 32) {
      this.togglePlay();
    }
  },

  storeSongBeats: function (song) {
    this.setState({
      beats: song.beats,
      name: song.name,
      songId: song.id
    });
  },

  togglePlay: function () {
    if (this.getPlayer().getPlayerState() !== 1) {
      this.getPlayer().playVideo();
      this.intervalVar = setInterval(this.playerTimeInterval, 15);
    } else {
      this.getPlayer().pauseVideo();
      clearInterval(this.intervalVar);
    }
  },

  playerTimeInterval: function () {
    var ytTime = this.getPlayer().getCurrentTime();
    if (ytTime === this.state.ytTime) {
      this.setState({ localTime: this.state.localTime + .015 });
    } else {
      this.setState({ localTime: ytTime, ytTime: ytTime });
    }

    this.incrementBeat();
  },

  incrementBeat: function () {
    var nextBeat = this.state.nextBeat;
    if (this.state.beats[nextBeat].time < this.state.localTime){
      this.setState({nextBeat: this.state.nextBeat + 1});
    }
  },

  showBeat: function () {
    var nextBeat = this.state.nextBeat;
    if (this.state.beats) {
      return this.state.beats[nextBeat].time;
    } else {
      return null;
    }
  },

  enableIframeApi: function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    var youtubeId = this.props.youtubeId;
    onYouTubeIframeAPIReady = function () {
      player = new YT.Player('song-container', {
        videoId: "Zbhc6ypLnuw",
        height: window.innerHeight,
        width: window.innerWidth,
        modestBranding: 1,
        showinfo: 0,
        controls: 0,
        fs: 0,
        disablekb: 0,
        wmode: "transparent",
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': console.log('state change')
        }
      });
    }

    // make player in scope throughout composer
    this.getPlayer = function () {
      return player;
    }
  },

  render: function () {
    return (
      <div>
        <div className="game-layer" id="game-layer">
          <div className="current-letter">
            {this.showBeat()}
          </div>
        </div>
        <container className="song-container" id="song-container">
        </container>
      </div>
    );
  }
});

module.exports = Song;
