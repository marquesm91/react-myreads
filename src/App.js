import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './view/ListBooks';
import SearchBooks from './view/SearchBooks';

import './App.css'

class MyReadsApp extends Component {
  state = {
    books: {
      currentlyReading: null,
      wantToRead: null,
      read: null,
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
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read,
            allBooks: books.map(({ id, shelf }) => ({ id, shelf }))
          }
        });
      });
  }

  setBookShelf = (book, shelf) => {
    this.setState(prevState => {
      return {
        books: {
          ...prevState.books,
          allBooks: [...prevState.books.allBooks.filter(b => b.id !== book.id), { id: book.id, shelf }],
          [shelf]: [...prevState.books[shelf], { ...book, shelf: shelf }],
          [book.shelf]: prevState.books[book.shelf].filter(b => b.id !== book.id)
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
