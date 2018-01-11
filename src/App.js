import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import ListBooks from './view/ListBooks';
import SearchBooks from './view/SearchBooks';

import './App.css'

class MyReadsApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks} />
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default MyReadsApp;
