import React, { useState } from 'react';

const TaskForm = ({ taskName, taskDesc, onNameChange, onDescChange, onAdd }) => (
  <div>
    <h2>New Task</h2>
    <div className="input-container">
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={onNameChange}
      />
      <input
        type="text"
        placeholder="Describe it"
        value={taskDesc}
        onChange={onDescChange}
      />
    </div>
    <button onClick={onAdd}>Add</button>
  </div>
);

const TaskItem = ({ task, onRemove }) => (
  <li>
    <span>{task.name}: {task.description}</span>{' '}
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onRemove(task.id);
      }}
      style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
    >
      Done
    </a>
  </li>
);

const TaskList = ({ tasks, onRemove }) => (
  <div>
    <h3>My To-Do List</h3>
    <ul>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onRemove={onRemove} />
      ))}
    </ul>
  </div>
);

const TodoList = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleNameChange = ({ target: { value } }) => setTaskName(value);
  const handleDescChange = ({ target: { value } }) => setTaskDesc(value);

  const addTask = () => {
    if (taskName.trim() === '') return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDesc,
      done: false,
    };

    setTasks(prev => [...prev, newTask]);
    setTaskName('');
    setTaskDesc('');
  };

  const removeTask = (idToRemove) => {
    setTasks(prev => prev.filter(task => task.id !== idToRemove));
  };

  return (
    <div>
      <TaskForm
        taskName={taskName}
        taskDesc={taskDesc}
        onNameChange={handleNameChange}
        onDescChange={handleDescChange}
        onAdd={addTask}
      />
      <TaskList tasks={tasks} onRemove={removeTask} />
    </div>
  );
};

export default TodoList;
