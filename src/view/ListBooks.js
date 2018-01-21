import React from 'react';
import { Link } from 'react-router-dom';
import { Shelf, HeaderPage } from '../components';

const ListBooks = ({ onChangeShelf, books }) => {
  const { currentlyReading, wantToRead, read } = books;

  const currentlyReadingAsArray = Object.values(currentlyReading);
  const wantToReadAsArray = Object.values(wantToRead);
  const readAsArray = Object.values(read);

  return (
    <div className="list-books">
      <HeaderPage title="My Reads" />
      <div className="list-books-content">
        <div>
          <Shelf title="Currently Reading" books={currentlyReadingAsArray} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
          <Shelf title="Want to Read" books={wantToReadAsArray} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
          <Shelf title="Read" books={readAsArray} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  );
};

export default ListBooks;
