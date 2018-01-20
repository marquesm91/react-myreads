import React from 'react';
import { BookList } from './index';

const Shelf = ({ onChangeShelf, title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookList books={books} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
    </div>
  </div>
);

export { Shelf };
