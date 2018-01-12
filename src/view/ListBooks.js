import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Shelf, HeaderPage } from '../components';


class ListBooks extends Component {
  filterBooks(shelf) {
    return Object.values(this.props.books).filter(book => book.shelf === shelf);
  }

  render() {
    const { onChangeShelf } = this.props;

    return (
      <div className="list-books">
        <HeaderPage title="My Reads" />
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" books={this.filterBooks('currentlyReading')} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
            <Shelf title="Want to Read" books={this.filterBooks('wantToRead')} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
            <Shelf title="Read" books={this.filterBooks('read')} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
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
