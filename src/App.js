import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Stage from './components/Stage';
import ErrorPage from './components/ErrorPage';
import {Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path="/" component={Home} exact={true}/>
          <Route path="/stage/:roomId" component={Stage}/>
          <Route component={ErrorPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
