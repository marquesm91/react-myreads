import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import SearchTerms from '../SearchTerms';

class SearchBar extends Component {
  state = {
    query: '',
    suggestions: null
  }

  componentDidMount() {
    this.input.focus();
  }

  onChangeQueryHandler = event => {
    let query = event.target.value;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      this.setState({ suggestions: SearchTerms.filter(term => match.test(term)).slice(0, 10) });
    } else {
      this.setState({ suggestions: null });
    }

    this.setState({ query });
  }

  onKeyDownInputHandler = event => {
    const { query } = this.state;

    if (event.key === 'Enter' && query) {
      this.setState({ suggestions: null });
      this.props.onEnterPressed(query)
    }
  }

  onClickSuggestionHandler = suggestion => {
    this.setState({ query: suggestion, showSuggestions: false })
    this.input.focus();
    let event = new Event('keypress');
    event.key = 'Enter';
    this.onKeyDownInputHandler(event);
  }

  onKeyDownSuggestionHandler = (event, suggestion) => {
    if (event.key === 'Enter') {
      this.onClickSuggestionHandler(suggestion);
    }
  }

  render() {
    const { query, suggestions } = this.state;

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
            value={query}
            onKeyDown={this.onKeyDownInputHandler}
            onChange={this.onChangeQueryHandler}
            ref={input => this.input = input}
          />
        </div>
        {suggestions && suggestions.length
          ? <div className="search-books-input-suggestions">
              <ol className="search-books-input-suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() => this.onClickSuggestionHandler(suggestion)}
                    onKeyDown={event => this.onKeyDownSuggestionHandler(event, suggestion)}
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
