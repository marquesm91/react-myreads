import React from 'react';
import { Book } from './index';

const Shelf = ({ onChangeShelf, title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id} >
            <Book book={book} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export { Shelf };
