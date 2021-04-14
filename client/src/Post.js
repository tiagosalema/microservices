import { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ title, id: postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://localhost:3002/posts/${postId}/comments`);
      console.log({ result, postId });
      setComments(result.data);
    };
    fetchData();
  }, []);
  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`http://localhost:3002/posts/${postId}/comments`, { comment });
    setComment('');
  };
  const renderComments = () => {
    console.log({ comments });
    return comments.map(comment => (
      <li key={comment.id} className='list-group-item'>
        {comment.comment}
      </li>
    ));
  };
  return (
    <div className='card mb-3' style={{ marginRight: 20, flex: '30% 0 0' }} key={postId}>
      <h5 className='card-header'>{title}</h5>
      <ul className='list-group list-group-flush'>{renderComments()}</ul>
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
    </div>
  );
};

export default Post;
