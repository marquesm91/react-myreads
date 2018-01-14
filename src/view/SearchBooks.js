import React, { Component } from 'react';
import { SearchBar, Book } from '../components';
import { arrayToObject, partition } from '../util';
import * as BooksAPI from '../BooksAPI';

class SearchBooks extends Component {
  state = {
    fetchedBooks: {}
  }

  doSearch = query => {
    BooksAPI.search(query.trim())
      .then(fetchedResult => {
        if (fetchedResult.error) {
          console.log(fetchedResult.error)
        } else {
          // partition fetchedBooks into books which belongs to any shelf or none
          let [fetchedBooksOffMyShelf, fetchedBooksOnMyShelf] = partition(fetchedResult, book => !this.props.books[book.id])

          // Get local books state to show its shelf
          let booksOnMyShelf = fetchedBooksOnMyShelf.map(({ id }) => this.props.books[id]);

          this.setState({
            fetchedBooks: arrayToObject([...fetchedBooksOffMyShelf, ...booksOnMyShelf])
          });
        }
      });
  }

  changeShelfHandler = (book, shelf) => {
    this.setState({
      fetchedBooks: {
        ...this.state.fetchedBooks,
        [book.id]: {
          ...book,
          shelf: shelf
        }
      }
    });

    this.props.onChangeShelf(book, shelf);
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
                <Book book={book} onChangeShelf={(book, shelf) => this.changeShelfHandler(book, shelf)}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
