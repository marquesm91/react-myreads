import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import { Suggestions } from './index';

class SearchBar extends Component {
  state = {
    query: '',
    onlyNewBooks: false,
    showSuggestions: false
  }

  componentDidMount() {
    this.input.focus();
    this.onKeyDownInputHandler = debounce(500, this.onKeyDownInputHandler);
  }

  onChangeQueryHandler = event => this.setState({
    query: event.target.value,
    showSuggestions: true
  });

  onKeyDownInputHandler = () => {
    const { query, onlyNewBooks } = this.state;

    if (query) {
      this.props.doSearch(query, onlyNewBooks);
    }
  }

  onChooseSuggestion = suggestion => {
    this.input.focus();
    this.setState({ showSuggestions: false });

    if (suggestion !== this.state.query) {
      this.setState({ query: suggestion });
      this.onKeyDownInputHandler();
    }
  }

  render() {
    const { query, showSuggestions } = this.state;

    return (
      <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
        <div className="search-books-filter">
          <span>Only new</span>
          <input
            type="checkbox"
            value={this.state.onlyNewBooks}
            onChange={event => this.setState({ onlyNewBooks: event.target.checked })}
          />
        </div>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder={this.props.placeholder}
            value={query}
            onKeyDown={this.onKeyDownInputHandler}
            onChange={this.onChangeQueryHandler}
            ref={input => this.input = input}
          />
        </div>
        <Suggestions
          query={query}
          showSuggestions={showSuggestions}
          onChooseSuggestion={suggestion => this.onChooseSuggestion(suggestion)}
          onClickOutsideSuggestions={() => this.setState({ showSuggestions: false })}
        />
      </div>
    );
  }
}

export { SearchBar };
