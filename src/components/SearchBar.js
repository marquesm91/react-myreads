import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import SearchTerms from '../SearchTerms';

class SearchBar extends Component {
  state = {
    query: '',
    showSuggestions: false
  }

  componentDidMount() {
    this.input.focus();
  }

  onChangeQueryHandler = event => {
    this.setState({ query: event.target.value, showSuggestions: true });
  }

  onKeyPressInputHandler = event => {
    if (event.key === 'Enter' && this.state.query) {
      this.setState({ showSuggestions: false });
      this.props.onEnterPressed(this.state.query)
    }
  }

  onClickSuggestionHandler = suggestion => {
    this.setState({ query: suggestion, showSuggestions: false })
    this.input.focus();
    let event = new Event('keypress');
    event.key = 'Enter';
    this.onKeyPressInputHandler(event);
  }

  onKeyPressSuggestionHandler = (event, suggestion) => {
    if (event.key === 'Enter') {
      this.onClickSuggestionHandler(suggestion);
    }
  }

  render() {
    const { query } = this.state;
    let suggestions;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      suggestions = SearchTerms.filter(term => match.test(term)).slice(0, 10);
    } else {
      suggestions = null;
    }

    return (
      <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SearchTerms.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            type="text"
            placeholder={this.props.placeholder}
            value={this.state.query}
            onKeyPress={this.onKeyPressInputHandler}
            onChange={this.onChangeQueryHandler}
            ref={input => this.input = input}
          />
        </div>
        {this.state.showSuggestions && suggestions && suggestions.length
          ? <div className="search-books-input-suggestions">
              <ol className="search-books-input-suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() => this.onClickSuggestionHandler(suggestion)}
                    onKeyPress={event => this.onKeyPressSuggestionHandler(event, suggestion)}
                    tabIndex="0"
                  >
                    {suggestion}
                  </li>
                ))}
              </ol>
            </div>
          : null
        }
      </div>
    );
  }
}

export { SearchBar };
