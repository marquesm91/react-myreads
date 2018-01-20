import React from 'react';
import { ShelfChanger } from './index';

const Book = ({ onChangeShelf, book }) => {
  const { title, authors, imageLinks, shelf } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundColor: '#44793B',
            backgroundImage: imageLinks ? `url(${imageLinks.smallThumbnail})` : null
          }}
        ></div>
        <ShelfChanger
          shelf={shelf}
          onChangeShelf={shelf => onChangeShelf(book, shelf)}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors ? authors.join(', ') : null}</div>
    </div>
  );
};

export { Book };
