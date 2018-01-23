import React from 'react';
import { HeaderPage } from '../components';

const DetailBook = ({ book }) => {
  console.log(book);
  const { id, title, authors, imageLinks, shelf } = book;

  return (
    <div className="details-book">
      <div
        className="book-cover"
        style={{
          width: 225,
          height: 300,
          backgroundColor: '#44793B',
          backgroundImage: imageLinks ? `url(${imageLinks.thumbnail})` : null,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors ? authors.join(', ') : null}</div>
    </div>
  );
};

export default DetailBook;
