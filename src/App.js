import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import ListBooks from './view/ListBooks';
import { SearchBar } from './components';

import './App.css'

class MyReadsApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBar placeholder="Search by title or author" onMainPage={() => this.setState({ showSearchPage: false })} />
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <ListBooks onSearchPage={() => this.setState({ showSearchPage: true })}/>
        )}
      </div>
    )
  }
}

export default MyReadsApp;
