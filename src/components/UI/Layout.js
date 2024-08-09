import { useEffect, useState } from "react";
import { Header } from "../UI/Header";
import { SideBar } from "../UI/SideBar";
import { getTasks } from "../../utils/api";
import { TaskForm } from "./TaskForm";
import { useLocation } from "react-router-dom";
import { ErrorDialog } from "./ErrorDialog";

//Layout present for each page visited, consisting of Header, SideBar and children/ Form always
export const Layout = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const location = useLocation()
    const [error, setError] = useState(null)

    //To toggle form visibility
    const toggleFormVisibility = () => {
        setFormVisible(prevState => !prevState);
    };

    //Save tasks
    const saveTaskHandler = async (task) => {
        try{
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            });
            if (!response.ok) {
                setError('Failed to save task');
                return
            }
            const savedTask = await response.json();
            setTasks(prevTasks => [...prevTasks, savedTask]);
            setFormVisible(false);
        } 
        catch(err){
            setError(`Error saving task: ${err.message}`);
            return
        }
    };

    //To fetch already existing tasks when visited
    useEffect(() => {
        const loadTasks = async () => {
            try{
                const fetchTasks = await getTasks();
                setTasks(fetchTasks);
            } 
			catch(err) {
                setError(`Error loadin task: ${err.message}`);
            }
        };
        loadTasks();
    }, []);

    useEffect(() => {
        //Hide the form when the location changes
        setFormVisible(false);
    }, [location])

    //To close the error dialog box
    const closeErrorDialog = () => {
        setError(null)
    }

    //If error, display the dialog box
     if(error){
        return <ErrorDialog error={error} onClose={closeErrorDialog}/>
    }

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
