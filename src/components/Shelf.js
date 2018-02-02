import React from 'react';
import { BookList, Loader } from './index';

const Shelf = ({ onChangeShelf, title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      {books
        ? <BookList books={books} onChangeShelf={onChangeShelf} />
        : <Loader />
      }
    </div>
  </div>
);

export { Shelf };
