import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=4')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = () => {
    if (!task.trim()) return;

    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: task,
      completed: false,
      userId: 1
    })
    .then(response => {
      setTodos(prev => [response.data, ...prev]);
      setTask('');
    })
    .catch(error => console.error('Error posting data:', error));
  };

  return (
    <div className="grid-item item3">
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="align-end" type="button" onClick={handleSubmit}>
          Submit
        </button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;
