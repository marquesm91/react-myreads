import React from 'react';
import { Link } from 'react-router-dom';
import { Shelf, HeaderPage } from '../components';

const ListBooks = ({ onChangeShelf, books }) => {
  const { currentlyReading, wantToRead, read } = books;

  return (
    <div className="list-books">
      <HeaderPage title="My Reads" />
      <div className="list-books-content">
        <div>
          <Shelf title="Currently Reading" books={currentlyReading} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
          <Shelf title="Want to Read" books={wantToRead} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
          <Shelf title="Read" books={read} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
