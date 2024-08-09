import { createContext, useState, useEffect } from "react"

export const TaskContext = createContext()

export const TaskCtxProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    //To reflect changes immediately in sidebar
    const updateTask = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
        )
    }

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3001/tasks')
            if(!response.ok) {
                throw new Error('Failed to fetch tasks')
            }
            const result = await response.json()
            setTasks(result)
        } 
        catch(err){
            console.error('Error loading tasks:', err)
        }
    }
    
    //To fetch already existing tasks when visited
    useEffect(() => {
        fetchTasks()
    }, [])

    const ctxValue = {
        tasks,
        updateTask,
        fetchTasks
    }

    return <TaskContext.Provider value={ctxValue}>{children}</TaskContext.Provider>
}