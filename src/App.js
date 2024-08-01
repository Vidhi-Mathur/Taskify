import React, { useState } from 'react';
import './App.css';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [tasks, setTasks] = useState([])

  const toggleFormVisibility = () => {
    setFormVisible(prev => !prev);
  };

  const saveTaskHandler = async (task) => {
    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      if (!response.ok) {
        throw new Error('Failed to save task');
      }
      const savedTask = await response.json();
      setTasks(prevTasks => [...prevTasks, savedTask]);
      setFormVisible(false);
    } 
    catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <SideBar toggleFormVisibility={toggleFormVisibility} tasks={tasks}/>
        <main className="flex-grow p-8 bg-gray-100 overflow-y-auto pt-40">
          {formVisible && (
            <div className="max-w-3xl mx-auto">
              <TaskForm onSaveTask={saveTaskHandler} onCancel={() => setFormVisible(false)} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;