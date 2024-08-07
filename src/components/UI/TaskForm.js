import React, { useState, useEffect } from 'react';

export const TaskForm = ({ onSaveTask, onCancel, initialData = null }) => {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        dueDate: '', 
        completed: false,
        updatedAt: ''
    })

    useEffect(() => {
        if(initialData){
            setDetails({
                title: '',
                description: '',
                dueDate: '', 
                completed: false
            })
        }
    }, [initialData])

    const changeHandler = (e) => {
        const { name, value } = e.target
        //To allow valid keys only as form-level onChange handler catching events from elements other than intended input fields
            if(name && name in details) {
                setDetails(prevState => ({
                  ...prevState,
                  [name]: value
                }))
            }
    }

    //To handle form submission, based on whether editing/ saving
    const submitHandler = (e) => {
        e.preventDefault();
        const taskData = {
            ...details,
            updatedAt: new Date().toISOString() 
        };
        if(initialData){
            //If we're editing, include the id
            taskData.id = initialData.id;
        } 
        else{
            //If we're creating a new task, set the createdAt
            taskData.createdAt = taskData.updatedAt
        }
        onSaveTask(taskData)
    }

    //To disable past dates 
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <form onSubmit={submitHandler} className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto" onChange={changeHandler}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input type="text" id="title" name='title' value={details.title} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Task Title" required />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea id="description" name="description" value={details.description} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Task Description" rows="4" required></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                <input type="date" id="dueDate" name="dueDate" value={details.dueDate} className="w-full p-2 border border-gray-300 rounded-md" required min={getTodayDate()}/>
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onCancel} className="mr-4 px-4 py-2 text-sm rounded-md bg-gray-300 text-gray-700 hover:bg-gray-200">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm rounded-md bg-blue-700 text-white hover:bg-blue-600">
                {initialData ? 'Update Task' : 'Create Task'}
                </button>
            </div>
        </form>
    );
};