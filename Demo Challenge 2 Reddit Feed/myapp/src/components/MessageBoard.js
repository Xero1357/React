import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageBoard = () => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (!message) return;

    const username = localStorage.getItem('username') || 'John';

    const newPost = {
      id: Date.now(),
      title: message,
      body: message,
      userId: username,
      upvotes: 0,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Save to localStorage
    setMessage('');
  };

  const handleUpvote = (id) => {
    const username = localStorage.getItem('username');
    const votes = JSON.parse(localStorage.getItem('votes')) || {};

    if (!votes[id]) votes[id] = [];

    if (votes[id].includes(username)) {
      alert("You've already upvoted this post.");
      return;
    }

    votes[id].push(username);
    localStorage.setItem('votes', JSON.stringify(votes));

    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Save updated posts
  };

  return (
    <>
      <input
        type="text"
        placeholder="Post on Reddit"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="align-end" type="button" onClick={handlePost}>
        Submit Message
      </button>

      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <span>{`Posted by ${post.userId} with ${post.upvotes} upvotes`}</span>
          <button className="align-end" onClick={() => handleUpvote(post.id)}>
            Upvote
          </button>
        </div>
      ))}
    </>
  );
};

export default MessageBoard;
