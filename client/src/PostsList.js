import { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './Post';

const PostsList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:3003/events');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='mt-3 d-flex flex-wrap'>
      {Object.entries(posts).map(([id, post]) => (
        <Post key={id} id={id} title={post.title} comments={post.comments} />
      ))}
    </div>
  );
};

export default PostsList;
