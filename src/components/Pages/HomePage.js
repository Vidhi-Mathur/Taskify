import { useState, useEffect } from "react";
import { TaskForm } from "../UI/TaskForm";
import { Layout } from "../UI/Layout";
import { getTasks } from "../../utils/api";

export const HomePage = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);

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
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

	useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchTasks = await getTasks();
                setTasks(fetchTasks);
            } 
			catch (error) {
                console.error('Error loading tasks:', error);
            }
        };
        loadTasks();
    }, []);

    return (
        <Layout tasks={tasks} toggleFormVisibility={toggleFormVisibility}>
            {formVisible && (
                <div className="max-w-3xl mx-auto mt-28">
                    <TaskForm onSaveTask={saveTaskHandler} onCancel={() => setFormVisible(false)} />
                </div>
            )}
        </Layout>
    );
};
