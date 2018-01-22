import React, { Component } from 'react';
import { SearchBar, BookList, NotFound } from '../components';
import * as BooksAPI from '../BooksAPI';

class SearchBooks extends Component {
  state = {
    fetchedBooks: [],
    progressBarStatus: ''
  }

  doSearch = query => {
    this.setState({ progressBarStatus: 'active' });

    BooksAPI.search(query.trim())
      .then(fetchedResult => {
        if (fetchedResult.error) {
          // Update fetchedBooks with and object with error key prop
          this.setState({ fetchedBooks: fetchedResult, progressBarStatus: '' });
        } else {
          let result = [];

          fetchedResult.forEach(fetchedBook => {
            let tagBook = this.props.books.allBooks.find(book => book.id === fetchedBook.id);
            if (tagBook) {
              const { id, shelf } = tagBook;
              const book = this.props.books[shelf].find(b => b.id === id);
              result.push(book);
            } else {
              result.push(fetchedBook);
            }
          })

          this.setState({ fetchedBooks: result, progressBarStatus: '' });
        }
      });
  }

  render() {
    const { fetchedBooks, progressBarStatus } = this.state;
    let content = null;

    if (fetchedBooks.error) {
      content = <NotFound />;
    } else {
      content = <BookList books={fetchedBooks} onChangeShelf={(book, shelf) => this.props.onChangeShelf(book, shelf)} />;
    }

    return (
      <div className="search-books">
        <SearchBar
          placeholder="Search by title or author and hit enter"
          onEnterPressed={query => this.doSearch(query)}
        />
        <div className="search-progress-bar-container">
          <div className={`search-progress-bar ${progressBarStatus}`}></div>
        </div>
        <div className="search-books-results">
          {content}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
