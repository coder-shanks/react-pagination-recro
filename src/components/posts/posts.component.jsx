import React, { useState, useEffect } from 'react';
import Post from '../post/post.component';

const Posts = () => {
  const [postStart, setPostStart] = useState(0);
  const [posts, setPosts] = useState([]);
  const [fetchStart, setFetchStart] = useState(true);

  // Fetches the posts from API based on start position with a limit of 10
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

    if (!fetchStart) return;
    setPostStart(postStart + 10);
    fetchPostsData();
    setFetchStart(false);
  }, [fetchStart, postStart]);

  // Set loading to true and check if we reached the end of posts' list on "scroll" event trigger
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        posts.length !== 100
      )
        setFetchStart(true);
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
