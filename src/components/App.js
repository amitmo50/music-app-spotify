import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import store from '../store';
import MusicPlayer from './MusicPlayer';
import Login from './Login/Login';

const App = () => {

  const toLoginRoute = () => {
    window.location.href = "https://music-app-spotipy.netlify.app/login";
  }

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={toLoginRoute}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/player" component={MusicPlayer}/>  
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
