import React, { Component } from 'react';
import { SearchBar, BookList, NotFound } from '../components';
import { arrayToObject, partition } from '../util';
import * as BooksAPI from '../BooksAPI';

class SearchBooks extends Component {
  state = {
    fetchedBooks: {},
    progressBarStatus: ''
  }

  doSearch = query => {
    this.setState({ progressBarStatus: 'active' });
    BooksAPI.search(query.trim())
      .then(fetchedResult => {
        if (fetchedResult.error) {
          // Update fetchedBooks with and object with error key prop
          this.setState({ fetchedBooks: fetchedResult });
        } else {
          // partition fetchedBooks into books which belongs to any shelf or none
          let [fetchedBooksOnMyShelf, fetchedBooksOffMyShelf] = partition(fetchedResult, book => this.props.books[book.id])

          // Get local books state to show its shelf
          let booksOnMyShelf = fetchedBooksOnMyShelf.map(({ id }) => this.props.books[id]);

          this.setState({
            fetchedBooks: arrayToObject([...booksOnMyShelf, ...fetchedBooksOffMyShelf])
          });
        }

        this.setState({ progressBarStatus: '' });
      });
  }

  render() {
    let content = null;

    if (this.state.fetchedBooks.error) {
      content = <NotFound />;
    } else {
      const booksAsArray = Object.values(this.state.fetchedBooks);
      content = <BookList books={booksAsArray} onChangeShelf={(book, shelf) => this.props.onChangeShelf(book, shelf)} />;
    }

    return (
      <div className="search-books">
        <SearchBar
          placeholder="Search by title or author and hit enter"
          onEnterPressed={query => this.doSearch(query)}
        />
        <div className="search-progress-bar-container">
          <div className={`search-progress-bar ${this.state.progressBarStatus}`}></div>
        </div>
        <div className="search-books-results">
          {content}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
