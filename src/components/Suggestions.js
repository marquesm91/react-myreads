import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import SearchTerms from '../SearchTerms';

class Suggestions extends Component {

  onClickSuggestionHandler = suggestion => {
    let event = new Event('keypress');
    event.key = 'Enter';
    this.props.onChooseSuggestion(event, suggestion);
  }

  onKeyDownSuggestionHandler = (event, suggestion) => {
    if (event.key === 'Enter') {
      this.onClickSuggestionHandler(suggestion);
    }
  }

  render() {
    const { query, showSuggestions } = this.props;
    let suggestions = null;

    if (query && showSuggestions) {
      const match = new RegExp(escapeRegExp(query), 'i');
      suggestions = SearchTerms.filter(term => match.test(term)).slice(0, 10);
    }

    return (
      suggestions && suggestions.length
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
    );
  }
}

export { Suggestions };
