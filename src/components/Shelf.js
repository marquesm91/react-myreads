import React, { Component } from 'react';
import { BookList, Loader } from './index';

class Shelf extends Component {
  shouldComponentUpdate(nextProps) {
    if (!this.props.books) {
      return true;
    }

    return nextProps.books.length !== this.props.books.length;
  }

  render() {
    const { onChangeShelf, title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {books
            ? <BookList books={books} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
            : <Loader />
          }
        </div>
      </div>
    );
  }
}


export { Shelf };
