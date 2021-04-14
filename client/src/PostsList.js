import { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
  const [posts, setPosts] = useState({});

  const renderPosts = Object.values(posts).map(post => {
    return <div key={post.title}>{post.title}</div>;
  });
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:3001/posts');
    setPosts(res.data);
  };

  useEffect(fetchPosts, []);
  return (
    <div className='mt-3'>
      <h1>Posts list</h1>
      {renderPosts}
    </div>
  );
};

export default PostsList;
