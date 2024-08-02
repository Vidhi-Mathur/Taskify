import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./components/Pages/HomePage";
import { TaskDetailPage } from './components/Pages/TaskDetailPage';

function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:taskId" element={<TaskDetailPage />} />
        </Routes>
    </div>
  );
}

export default App;