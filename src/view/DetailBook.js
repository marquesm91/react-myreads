import React from 'react';
import { HeaderPage } from '../components';

const DetailBook = ({ book }) => {
  console.log(book);
  const { id, title, authors, imageLinks, shelf } = book;

  return (
    <div className="details-book">
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
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors ? authors.join(', ') : null}</div>
    </div>
  );
};

export default DetailBook;
