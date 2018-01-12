import React, { Component } from 'react';
import { SearchBar, Book } from '../components';
import { partition } from '../util';
import * as BooksAPI from '../BooksAPI';

class SearchBooks extends Component {
  state = {
    fetchedBooks: {}
  }

  doSearch = query => {
    BooksAPI.search(query).then(fetchedBooks => {
      // partition fetchedBooks into books which belongs to any shelf or none
      let [fetchedBooksOffMyShelf, fetchedBooksOnMyShelf] = partition(fetchedBooks, book => !this.props.books[book.id])

      // Get local books state to show its shelf
      let booksOnMyShelf = fetchedBooksOnMyShelf.map(({ id }) => this.props.books[id]);

      this.setState({
        fetchedBooks: {
          ...fetchedBooksOffMyShelf,
          ...booksOnMyShelf
        }
      });
    });
  }

  render() {
    const booksAsArray = Object.values(this.state.fetchedBooks);

    return (
      <div className="search-books">
        <SearchBar
          placeholder="Search by title or author and hit enter"
          onEnterPressed={query => this.doSearch(query)}
        />
        <div className="search-books-results">
          <ol className="books-grid">
            {booksAsArray.length > 0 && booksAsArray.map(book => (
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
