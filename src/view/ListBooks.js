import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shelf, HeaderPage } from '../components';
import * as BooksAPI from '../BooksAPI';

class ListBooks extends Component {
  state = {
    books: {}
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        // transform array into object and its key = book.id
        let booksAsObject = books.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

        this.setState({ books: booksAsObject });
      });
  }

  filterBooks(shelf) {
    return Object.values(this.state.books).filter(book => book.shelf === shelf)
  }

  setBookShelf = (book, shelf) => {
    // Add book to books object and set its shelf properly
    this.setState({
      books: {
        ...this.state.books,
        [book.id]: {
          ...book,
          shelf: shelf
        }
      }
    });

    // Also updates shelf on server to persist data
    BooksAPI.update(book, shelf);
  }

  render() {
    const { currentlyReadingBooks, wantToReadBooks, readBooks } = this.state;

    return (
      <div className="list-books">
        <HeaderPage title="My Reads" />
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={this.filterBooks('currentlyReading')} onChangeShelf={this.setBookShelf} />
            <Shelf title="Want to Read" books={this.filterBooks('wantToRead')} onChangeShelf={this.setBookShelf} />
            <Shelf title="Read" books={this.filterBooks('read')} onChangeShelf={this.setBookShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;
