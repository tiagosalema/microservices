import { useState } from 'react';
import axios from 'axios';

const Post = ({ title, comments, id: postId }) => {
  const [comment, setComment] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`http://localhost:3002/posts/${postId}/comments`, { content: comment });
    setComment('');
  };

  const commentsList = (
    <ul className='list-group list-group-flush'>
      {comments.map(comment => (
        <li key={comment.id} className='list-group-item'>
          {comment.content}
        </li>
      ))}
    </ul>
  );

  const commentCreate = (
    <div className='card-body d-flex align-items-end mt-3'>
      <form onSubmit={onSubmit}>
        <div>
          <label className='form-label'>
            New Comment
            <input
              className='form-control'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </label>
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );

  return (
    <div className='card mb-3' style={{ marginRight: 20, flex: '30% 0 0' }} key={postId}>
      <h5 className='card-header'>{title}</h5>
      {commentsList}
      {commentCreate}
    </div>
  );
};

export default Post;
