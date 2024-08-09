import { useContext, useEffect, useState } from "react";
import { Header } from "../UI/Header";
import { SideBar } from "../UI/SideBar";
import { TaskForm } from "./TaskForm";
import { useLocation } from "react-router-dom";
import { ErrorDialog } from "./ErrorDialog";
import { TaskContext } from "../../store/Task-Context";

//Layout present for each page visited, consisting of Header, SideBar and children/ Form always
export const Layout = ({ children }) => {
    const { tasks, fetchTasks } = useContext(TaskContext)
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
            //Fetch after saving
            await fetchTasks();
            setFormVisible(false);
        } 
        catch(err){
            setError(`Error saving task: ${err.message}`);
            return
        }
    };

    useEffect(() => {
        //Hide the form when the location changes
        setFormVisible(false);
    }, [location])

    //To close the error dialog box
    const closeErrorDialog = () => {
        setError(null)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-400">
            <Header />
            <div className="flex flex-grow overflow-hidden">
                <SideBar toggleFormVisibility={toggleFormVisibility} tasks={tasks}/>
                {error && <ErrorDialog error={error} onClose={closeErrorDialog}/>}
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
