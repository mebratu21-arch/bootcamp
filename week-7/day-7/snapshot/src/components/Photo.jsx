import React from 'react';

const Photo = ({ url, title }) => (
  <li>
    <img src={url} alt={title} />
  </li>
);

export default Photo;
