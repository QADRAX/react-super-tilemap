import React from 'react';

const wrapperStyle = {
    width: '100%',
    height: '500px',
  };

export const decorators = [
  (Story) => (
    <div style={wrapperStyle}>
      <Story />
    </div>
  ),
];