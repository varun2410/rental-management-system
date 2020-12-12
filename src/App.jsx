import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import data from './__data__/catalog.json';

import Header from './components/header/Header';
import HomePage from './components/homePage/HomePage';
import Category from './components/category/Category';
import SubCategory from './components/category/SubCategory';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Router>
          <Header data={data.data} />
          <Switch>
            <Route exact path="/">
              <HomePage data={data.data} />
            </Route>
            <Route exact path="/category">
              <Category data={data.data} />
            </Route>
            <Route exact path="/sub-category">
              <SubCategory data={data.data} />
            </Route>
          </Switch>
        </Router>
        <footer className="footer" />
      </div>
    );
  }
}

export default App;
