import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { Feedback } from './components';
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
    },
    feedback: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        let currentlyReading = [];
        let wantToRead = [];
        let read = [];
        let allBooks = [];

        books.forEach(book => {
          allBooks.push({ id: book.id, shelf: book.shelf });

          switch (book.shelf) {
            case 'currentlyReading': currentlyReading.push(book); break;
            case 'wantToRead': wantToRead.push(book); break;
            case 'read': read.push(book); break;
          }
        })

        this.setState({ books: { currentlyReading, wantToRead, read, allBooks } });
      });
  }

  setBookShelf = (book, newShelf) => {
    this.setState({ feedback: 'Loading' })

    // Updates shelf on server to persist data
    BooksAPI.update(book, newShelf).then(() => {
      this.setState(prevState => {
        const { books } = prevState;

        let nextState = {};
        let tagBook = books.allBooks.find(b => b.id === book.id);

        // if updating shelf book will be readd or filtered when newShelf === 'none'
        nextState.allBooks = books.allBooks.filter(b => b.id !== book.id)

        if (tagBook) {
          const { shelf } = tagBook;

          // Remove book from old shelf
          nextState[shelf] = books[shelf].filter(b => b.id !== book.id);
        }

        if (newShelf !== 'none') {
          // Add book into new shelf and update allBooks
          nextState[newShelf] = [...books[newShelf], { ...book, shelf: newShelf }];
          nextState.allBooks = [...nextState.allBooks, { id: book.id, shelf: newShelf }]
        }

        return {
          books: { ...books, ...nextState },
          feedback: 'Success'
        };
      });

      setTimeout(() => this.setState({ feedback: '' }), 1500);
    });
  }

  render() {
    return (
      <div className="app">
        <Feedback type={this.state.feedback} />

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
