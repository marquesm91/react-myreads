import React from 'react';
import { Book } from './index';

const Shelf = ({ title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(({ title, author, imageUrl }) => (
          <li key={title} >
            <Book title={title} author={author} imageUrl={imageUrl} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export { Shelf };
