import React from 'react';
import sortBy from 'sort-by';
import { Book } from './index';

const BookList = ({ onChangeShelf, books }) => (
  <ol className="books-grid">
    {books.sort(sortBy('title')).map(book => (
      <li key={book.id} >
        <Book book={book} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
      </li>
    ))}
  </ol>
);

export { BookList };
