import React, { useState } from 'react';

const App = () => {
  const [postId, setPostId] = useState('');
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPostId(e.target.value);
  };

  const handleSearch = () => {
    // Валідація ід
    if (postId < 1 || postId > 100) {
      setError('Ід має бути від 1 до 100');
      setPost(null);
      setComments(null);
      return;
    }

    setError(null);
    setPost(null);
    setComments(null);

    // Запит на отримання даних поста за ід
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // Якщо пост знайдено
        if (data) {
          setPost(data);
          // Запит на отримання коментарів до поста
          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((response) => response.json())
            .then((data) => {
              setComments(data);
            })
            .catch((error) => {
              setError('Помилка при отриманні коментарів');
              console.error(error);
            });
        } else {
          setError('Пост не знайдено');
        }
      })
      .catch((error) => {
        setError('Помилка при отриманні поста');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Пошук поста за ід</h1>
      <input type="number" value={postId} onChange={handleInputChange} />
      <button onClick={handleSearch}>Пошук</button>
      {error && <p>{error}</p>}
      {post && (
        <div>
          <h2>Пост:</h2>
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      )}
      {comments && (
        <div>
          <h2>Коментарі:</h2>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>ID: {comment.id}</p>
              <p>Name: {comment.name}</p>
              <p>Email: {comment.email}</p>
              <p>Body: {comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;