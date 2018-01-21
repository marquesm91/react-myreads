import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { arrayToObject, removeByKey } from './util';
import * as BooksAPI from './BooksAPI';
import ListBooks from './view/ListBooks';
import SearchBooks from './view/SearchBooks';

import './App.css'

class MyReadsApp extends Component {
  state = {
    books: {
      currentlyReading: {},
      wantToRead: {},
      read: {},
      allBooks: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        let currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
        let wantToRead = books.filter(book => book.shelf === 'wantToRead');
        let read = books.filter(book => book.shelf === 'read');

        this.setState({
          books: {
            currentlyReading: arrayToObject(currentlyReading),
            wantToRead: arrayToObject(wantToRead),
            read: arrayToObject(read),
            allBooks: books.map(({ id, shelf }) => ({ id, shelf }))
          }
        });
      });
  }

  setBookShelf = (book, shelf) => {
    const { allBooks, currentlyReading, wantToRead, read } = this.state.books;

    this.setState(prevState => {
      return {
        books: {
          currentlyReading: removeByKey(currentlyReading, book.id),
          wantToRead: removeByKey(wantToRead, book.id),
          read: removeByKey(read, book.id),
          allBooks: [...allBooks.filter(b => b.id !== book.id), { id: book.id, shelf }],
          [shelf]: {
            ...prevState.books[shelf],
            [book.id]: {
              ...book,
              shelf: shelf
            }
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
