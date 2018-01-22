import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Suggestions } from './index';

class SearchBar extends Component {
  state = {
    query: '',
    showSuggestions: false
  }

  componentDidMount() {
    this.input.focus();
  }

  onChangeQueryHandler = event => this.setState({
    query: event.target.value,
    showSuggestions: true
  });

  onKeyDownInputHandler = event => {
    const { query } = this.state;

    if (event.key === 'Enter' && query) {
      this.setState({ showSuggestions: false });
      this.props.onEnterPressed(query)
    }
  }

  onChooseSuggestion = (event, suggestion) => {
    this.input.focus();
    this.setState({ query: suggestion })
    this.onKeyDownInputHandler(event);
  }

  render() {
    const { query, showSuggestions } = this.state;

    return (
      <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
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
          onChooseSuggestion={(event, suggestion) => this.onChooseSuggestion(event, suggestion)}
        />
      </div>
    );
  }
}

export { SearchBar };
