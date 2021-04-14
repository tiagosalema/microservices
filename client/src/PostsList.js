import { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState({});

  const renderPosts = Object.entries(posts).map(([id, post]) => (
    <Post key={id} id={id} title={post.title} />
  ));

  const onSubmit = e => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:3001/posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return <div className='mt-3 d-flex flex-wrap'>{renderPosts}</div>;
};

export default PostsList;
