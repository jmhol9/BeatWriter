var React = require('react'),
    ReactDOM = require('react-dom'),
    Composer = require('./components/composer'),
    Song = require('./components/song'),
    SplashPage = require('./components/splash_page'),
    Instructions = require('./components/instructions'),
    TrackList = require('./components/track_list'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory;

var router = (
  <Router history={hashHistory}>
    <Route path="/song/:songId" component={Song} />
    <Route path="/composer" component={Composer} />
    <Route path="/instructions" component={Instructions} />
    <Route path="/track-list" component={TrackList} />
    <Route path="/" component={SplashPage} />
  </Router>
);


$(document).on('ready', function () {
  ReactDOM.render(
    router, $('.react-root')[0]
  );
});
