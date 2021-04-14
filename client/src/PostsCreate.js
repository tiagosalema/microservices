import { useState } from 'react';
import axios from 'axios';

const PostsCreate = () => {
  const [title, setTitle] = useState('');
  const onSubmit = async e => {
    e.preventDefault();
    console.log({ title });
    await axios.post('http://localhost:3001/posts', { title });
    setTitle('');
  };
  return (
    <div>
      <h1>CreatePost</h1>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label className='form-label'>
            Title
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='form-control'
            />
          </label>
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default PostsCreate;
