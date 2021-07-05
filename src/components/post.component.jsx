import React from 'react';

const Post = (props) => {
  const { id, title, body } = props.postData;

  return (
    <div className="post">
      <h4>
        <span className="post-id">{id}</span> {title}{' '}
      </h4>
      <p>{body}</p>
    </div>
  );
};

export default Post;
