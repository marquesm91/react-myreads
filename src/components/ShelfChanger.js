import React, { Component } from 'react';

class ShelfChanger extends Component {
  state = {
    shelf: this.props.initialShelf || 'none'
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.shelf !== this.state.shelf;
  }

  onChangeShelfHandler = (event) => {
    this.setState({
      shelf: event.target.value
    });

    this.props.onChangeShelf(event.target.value);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          value={this.state.shelf}
          onChange={this.onChangeShelfHandler}
        >
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export { ShelfChanger };
