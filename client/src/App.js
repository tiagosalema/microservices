import React from 'react';
import PostsCreate from './PostsCreate';
import PostsList from './PostsList';

const App = () => {
  return (
    <div className='container'>
      <PostsCreate />
      <PostsList />
    </div>
  );
};

export default App;
