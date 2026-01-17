import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Photo from './Photo';
import { PhotoContext } from '../context/PhotoContext';
import NotFound from './NotFound';

const Gallery = () => {
  const { images, loading, runSearch } = useContext(PhotoContext);
  const { searchInput } = useParams();

  useEffect(() => {
    runSearch(searchInput);
    // eslint-disable-next-line
  }, [searchInput]);

  let content;

  if (loading) {
     content = <li className="not-found">Loading...</li>;
  } else if (images.length > 0) {
    content = images.map(image => (
      <Photo url={image.src.medium} key={image.id} title={image.alt} />
    ));
  } else {
    content = <NotFound />;
  }

  return (
    <div className="photo-container">
      <h2>{searchInput ? `${searchInput} Pictures` : "Pictures"}</h2>
      <ul>
        {content}
      </ul>
    </div>
  );
}

export default Gallery;
