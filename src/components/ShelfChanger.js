import React from 'react';

const ShelfChanger = ({ onChangeShelf, shelf }) => (
  <div className="book-shelf-changer">
    <select
      value={shelf}
      onChange={event => onChangeShelf(event.target.value)}
    >
      <option value="none" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

export { ShelfChanger };
