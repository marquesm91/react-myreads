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
      read: null
    },
    feedback: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        const currentlyReading = [];
        const wantToRead = [];
        const read = [];

        books.forEach(book => {
          switch (book.shelf) {
            case 'currentlyReading': currentlyReading.push(book); break;
            case 'wantToRead': wantToRead.push(book); break;
            case 'read': read.push(book); break;
          }
        })

        this.setState({ books: { currentlyReading, wantToRead, read } });
      });
  }

  updateShelf = (shelfResult, shelfName) => (
    new Promise(resolve => {
      let promise = null;
      let shelf = [];

      shelfResult.forEach(id => {
        let book = this.state.books[shelfName].find(book => book.id === id)
        // Populate shelf if book exists in shelf otherwise save promise to fetch book later
        book ? shelf.push(book) : (promise = BooksAPI.get(id));
      });

      // If any promise exists some book need to be fetched
      promise
        ? promise.then(book => {
            shelf.push(book);
            resolve(shelf);
          })
        : resolve(shelf);
    })
  )

  setBookShelf = (book, newShelf) => {
    this.setState({ feedback: 'Loading' });

    // Update shelf on server to persist data
    BooksAPI.update(book, newShelf).then(resultBooks => {
      this.setState({ feedback: 'Success' });
      const shelves = Object.keys(this.state.books);

      // Also Update shelves locally consuming the result provided from API
      shelves.forEach(async shelfName => {
        const shelf = await this.updateShelf(resultBooks[shelfName], shelfName);
        this.setState(prevState => {
          return {
            ...prevState,
            books: {
              ...prevState.books,
              [shelfName]: shelf
            }
          }
        });
      })

      // When code reached here omit feedback box after 1 second
      setTimeout(() => this.setState({ feedback: '' }), 1000);
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
