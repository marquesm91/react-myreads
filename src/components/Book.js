import React from 'react';
import { ShelfChanger } from './index';

const Book = ({ title, author, imageUrl }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageUrl})` }}></div>
      <ShelfChanger />
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{author}</div>
  </div>
);

export { Book };
