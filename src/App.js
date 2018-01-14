import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { arrayToObject } from './util';
import * as BooksAPI from './BooksAPI';
import ListBooks from './view/ListBooks';
import SearchBooks from './view/SearchBooks';

import './App.css'

class MyReadsApp extends Component {
  state = {
    books: {}
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        // transform array into object and its key = book.id
        let booksAsObject = arrayToObject(books);

        this.setState({ books: booksAsObject });
      });
  }

  setBookShelf = (book, shelf) => {
    // Add book to books object and set its shelf properly
    this.setState(prevState => {
      return {
        ...prevState,
        books: {
          ...prevState.books,
          [book.id]: {
            ...book,
            shelf: shelf
          }
        }
      };
    });

    // Also updates shelf on server to persist data
    BooksAPI.update(book, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onChangeShelf={this.setBookShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeShelf={this.setBookShelf}
          />
        )} />
      </div>
    )
  }
}

export default MyReadsApp;
