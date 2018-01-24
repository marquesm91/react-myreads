import React from 'react';
import { Loader } from './index';

const Feedback = ({ type }) => {
  let content = null;

  if (type === 'Loading') {
    content = <Loader size="small" />;
  }

  return (
    <div className="feedback-api-container">
      <div className={`feedback-api ${type ? 'active' : ''}`}>
        {content}&nbsp;{type}
      </div>
    </div>
  )
};

export { Feedback };
