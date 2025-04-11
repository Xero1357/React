import React, { useState } from 'react';

const TodoList = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleNameChange = ({ target: { value } }) => setTaskName(value);
  const handleDescChange = ({ target: { value } }) => setTaskDesc(value);

  const addTask = () => {
    if (taskName.trim() === '') return;

    const newTask = {
      name: taskName,
      description: taskDesc,
      done: false,
    };

    setTasks(prev => [...prev, newTask]);
    setTaskName('');
    setTaskDesc('');
  };

  const removeTask = (indexToRemove) => {
    setTasks(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h2>New Task</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="Describe it"
          value={taskDesc}
          onChange={handleDescChange}
        />
      </div>
      <button onClick={addTask}>Add</button>

      <div>
        <h3>My To-Do List</h3>
        <ul>
            {tasks.map((task, index) => (
            <li key={index}>
            <span>{task.name}: {task.description}</span>
            {' '}
            <a
                href="#"
            onClick={(e) => {
             e.preventDefault();
            removeTask(index);
            }}
             style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
            >
                Done
        </a>
            </li>
                ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
