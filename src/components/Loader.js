import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size, color }) => {
  return (
    <div className="bookshelf-loader-container">
      <div
        className={`bookshelf-loader ${size}`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

Loader.defaultProps = {
  size: 'large',
  color: '#277c32'
};

export { Loader };
