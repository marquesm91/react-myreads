import React, { Component } from 'react';
import { SearchBar, Book } from '../components';
import * as BooksAPI from '../BooksAPI';

class SearchBooks extends Component {
  state = {
    fetchedBooks: {}
  }

  search = () => {
    if (this.props.query) {
      BooksAPI.search(this.props.query)
        .then(fetchedBooks => {
          let fetchedBooksAsObject = fetchedBooks.reduce((acc, cur) => {
            cur.shelf = 'none';
            acc[cur.id] = cur;
            return acc;
          }, {});

          let books = [];

          fetchedBooks.filter(book => this.props.books[book.id]).map(({ id }) => {
            BooksAPI.get(id).then(book => {
              books.push({
                [book.id]: {
                  ...book
                }
              });

              console.log(...books);
              this.setState({
                fetchedBooks: {
                  ...fetchedBooksAsObject,
                  ...books
                }
              });
            });
          })


        });
    }
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar
          placeholder="Search by title or author"
          onUpdateQuery={value => this.props.onUpdateQuery(value)}
          query={this.props.query}
        />
        <div className="open-search">
          <button onClick={this.search}>Search</button>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Object.values(this.state.fetchedBooks).length > 0 && Object.values(this.state.fetchedBooks).map(book => (
              <li key={book.id} >
                <Book book={book} onChangeShelf={(book, shelf) => this.props.onChangeShelf(book, shelf)}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
