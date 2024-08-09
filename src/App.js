import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./components/Pages/HomePage";
import { TaskDetailPage } from './components/Pages/TaskDetailPage';
import { Layout } from './components/UI/Layout';
import { TaskCtxProvider } from './store/Task-Context';

function App() {
  return (
    <TaskCtxProvider>
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:taskId" element={<TaskDetailPage />} />
            </Routes>
        </Layout>
    </TaskCtxProvider>
  );
}

export default App;