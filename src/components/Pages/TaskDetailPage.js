import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CalendarDays, ClipboardList } from 'lucide-react'
import { TaskForm } from '../UI/TaskForm'

export const TaskDetailPage = () => {
    const { taskId } = useParams()
    const [taskDetail, setTaskDetail] = useState(null)
    const [isCompleted, setIsCompleted] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    //Fetch task based on it
    useEffect(() => {
        const fetchTask = async () => {
            try{
                const response = await fetch(`http://localhost:3001/tasks/${taskId}`)
                if(!response.ok){
                    throw new Error('Failed to fetch task')
                }
                const result = await response.json()
                setTaskDetail(result)
                setIsCompleted(result.completed)
            } 
            catch(error) {
                console.error('Error fetching task:', error)
            }
        }
        fetchTask()
    }, [taskId])

    //To update the completion status of task in the backend
    const toggleCompletion = async () => {
        try{
            const newCompletionStatus = !isCompleted
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: newCompletionStatus })
            })
            if(!response.ok){
                throw new Error('Failed to update task completion status')
            }
            const updatedTask = await response.json()
            setTaskDetail(updatedTask)
            setIsCompleted(newCompletionStatus) 
        } 
        catch(error) {
            console.error('Error updating task completion status:', error)
        }
    }

    //To enable editing mode
    const editHandler = () => {
        setIsEditing(true)
    }

    //To disable editing mode
    const cancelHandler = () => {
        setIsEditing(false)
    }

    //To modify tasks
    const saveTaskHandler = async (updatedTask) => {
        try{
            const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });
            if(!response.ok){
                throw new Error('Failed to update task');
            }
            const result = await response.json();
            setTaskDetail(result);
            setIsCompleted(result.completed);
            setIsEditing(false);
        } 
        catch(error){
            console.error('Error updating task:', error);
        }
    }

    if(!taskDetail){
        return (
            <div className="flex justify-center items-center h-full text-gray-300">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    //If in editing mode, render the form along with initial data
    if(isEditing){
        return (
            <div className="max-w-3xl mx-auto mt-28">
                <TaskForm onSaveTask={saveTaskHandler} onCancel={cancelHandler} initialData={taskDetail}/>
            </div>
        )
    }

    return (
        <div className="bg-gray-900 text-gray-300 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-28 border border-gray-700">
            <h1 className="text-4xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-4">{taskDetail.title}</h1>
            <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-md shadow-inner">
                    <div className="flex items-center mb-3">
                        <ClipboardList className="text-blue-400 mr-2" size={24} />
                        <h2 className="text-2xl font-semibold text-blue-300">Description</h2>
                    </div>
                    <p className="text-gray-400 ml-8">{taskDetail.description}</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-md shadow-inner">
                    <div className="flex items-center mb-3">
                        <CalendarDays className="text-blue-400 mr-2" size={24} />
                        <h2 className="text-2xl font-semibold text-blue-300">Due Date</h2>
                    </div>
                    <p className="text-gray-400 ml-8">{new Date(taskDetail.dueDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <button onClick={toggleCompletion} className='px-4 py-2 text-sm md:text-base rounded-md text-gray-100 bg-blue-700 hover:bg-blue-600 hover:text-white mr-3'>
                    Mark as {isCompleted ? "to be Done" : "Complete"}
                </button>
                <button onClick={editHandler} className='px-4 py-2 text-sm md:text-base rounded-md text-gray-100 bg-blue-700 hover:bg-blue-600 hover:text-white'>
                    Update
                </button>
            </div>
        </div>
    )
}