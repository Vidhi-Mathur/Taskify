import { useEffect, useState } from "react";
import { Header } from "../UI/Header";
import { SideBar } from "../UI/SideBar";
import { getTasks } from "../../utils/api";
import { TaskForm } from "./TaskForm";
import { useLocation } from "react-router-dom";

export const Layout = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const location = useLocation();

    const toggleFormVisibility = () => {
        setFormVisible(prevState => !prevState);
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

    useEffect(() => {
        //Hide the form when the location changes
        setFormVisible(false);
    }, [location])

  return (
    <div className="flex flex-col h-screen bg-gray-400">
        <Header />
        <div className="flex flex-grow overflow-hidden">
            <SideBar toggleFormVisibility={toggleFormVisibility} tasks={tasks}/>
            <main className="flex-grow p-8">
            {formVisible? (
                <div className="max-w-3xl mx-auto mt-28">
                    <TaskForm onSaveTask={saveTaskHandler} onCancel={() => setFormVisible(false)} />
                </div>
            ): (
                children
            )}
            </main>
        </div>
    </div>
  );
};
