import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ size, color }) => {
  return (
    <div className="bookshelf-loading-container">
      <div
        className={`bookshelf-loading ${size}`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
};

Loading.defaultProps = {
  size: 'large',
  color: '#277c32'
};

export { Loading };
