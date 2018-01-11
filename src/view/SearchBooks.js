import React, { Component } from 'react';
import { SearchBar } from '../components';

class SearchBooks extends Component {
  render() {
    return (
      <div className="search-books">
        <SearchBar placeholder="Search by title or author" onMainPage={() => this.props.onMainPage()} />
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
