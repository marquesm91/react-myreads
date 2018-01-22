import React, { Component } from 'react';
import { ShelfChanger } from './index';

class Book extends Component {
  state = {
    scale: 1
  }

  render() {
    const { onChangeShelf, book } = this.props;
    const { title, authors, imageLinks, shelf } = book;

    return (
      <div className="book" style={{ transform: `scale(${this.state.scale})` }}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundColor: '#44793B',
              backgroundImage: imageLinks ? `url(${imageLinks.smallThumbnail})` : null
            }}
            onMouseEnter={() => this.setState({ scale: 1.1 })}
            onMouseLeave={() => this.setState({ scale: 1 })}
          ></div>
          <ShelfChanger
            initialShelf={shelf}
            onChangeShelf={shelf => onChangeShelf(book, shelf)}
          />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors ? authors.join(', ') : null}</div>
      </div>
    );
  }
}

export { Book };
