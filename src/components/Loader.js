import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size, backgroundColor, loaderColor }) => {
  return (
    <div className="bookshelf-loader-container">
      <div
        className={`bookshelf-loader ${size}`}
        style={{
          borderColor: backgroundColor,
          borderTopColor: loaderColor
        }}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  loaderColor: PropTypes.string
};

Loader.defaultProps = {
  size: 'large',
  backgroundColor: '#fff',
  loaderColor: '#277c32'
};

export { Loader };
