import React, { Component } from 'react';
import { length } from '../util';
import { BookList, Loading } from './index';

class Shelf extends Component {
  shouldComponentUpdate(nextProps) {
    return length(nextProps.books) !== length(this.props.books);
  }

  render() {
    const { onChangeShelf, title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {books.length
            ? <BookList books={books} onChangeShelf={(book, shelf) => onChangeShelf(book, shelf)} />
            : <Loading />
          }
        </div>
      </div>
    );
  }
}


export { Shelf };
