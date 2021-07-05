import React, { useState, useEffect } from 'react';
import Post from './post.component';

const Posts = () => {
  const [postStart, setPostStart] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${postStart}&_limit=10`
      )
        .then((postsRes) => postsRes.json())
        .then((posts) => {
          setPosts((oldPosts) => [...oldPosts, ...posts]);
        })
        .catch((error) => console.log(error));
    };

    if (!loading) return;
    setPostStart(postStart + 10);
    fetchPostsData();
    setLoading(false);
  }, [loading, postStart, posts.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        posts.length !== 100
      )
        setLoading(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [posts.length]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
};

export default Posts;
