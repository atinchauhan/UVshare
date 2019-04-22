import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



import {
  BrowserRouter as Router, Route ,Switch ,Link ,Redirect
} from "react-router-dom";

import Mainpage from './mainpage';
import Secondpage from './secondpage';
import A from './homepage';

class App extends Component {
  render() {
    return (
      <div>
     <Router>
     <Switch>
     <Route exact path="/" component={A}/>
      <Route exact path="/add" component={A}/>
     <Route exact path="/404" component={Secondpage}/>
     <Redirect to= "/404"/>
     </Switch>
     </Router>
      
      </div>
    );
  }
}

export default App;
