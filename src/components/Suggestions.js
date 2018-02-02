import React, { PureComponent } from 'react';
import escapeRegExp from 'escape-string-regexp';
import SearchTerms from '../SearchTerms';

class Suggestions extends PureComponent {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClickOutsideSuggestions();
    }
  }

  onKeyDownSuggestionHandler = (event, suggestion) => {
    if (event.key === 'Enter') {
      this.props.onChooseSuggestion(suggestion);
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
        ? <div className="search-books-input-suggestions" ref={node => this.wrapperRef = node}>
            <ol className="search-books-input-suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() => this.props.onChooseSuggestion(suggestion)}
                  onKeyDown={event => this.onKeyDownSuggestionHandler(event, suggestion)}
                  tabIndex="0"
                >
                  <span>{suggestion}</span>
                </li>
              ))}
            </ol>
          </div>
        : null
    );
  }
}

export { Suggestions };
