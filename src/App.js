import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./components/Pages/HomePage";
import { TaskDetailPage } from './components/Pages/TaskDetailPage';
import { Layout } from './components/UI/Layout';

function App() {
  return (
    <Layout>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:taskId" element={<TaskDetailPage />} />
        </Routes>
    </Layout>
  );
}

export default App;