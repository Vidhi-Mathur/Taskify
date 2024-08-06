import React, { useEffect, useState } from 'react';

export const TaskForm = ({ onSaveTask, onCancel, initialData = null }) => {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        dueDate: '', 
        completed: false
    })

  const submitHandler = (event) => {
    event.preventDefault();
    onSaveTask(details);
    setDetails({
        title: '',
        description: '', 
        dueDate: '',
        completed: false
    })
  };

  useEffect(() => {
    if (initialData) {
        setDetails({
            title: initialData.title,
            description: initialData.description,
            dueDate: initialData.dueDate.split('T')[0], 
            completed: initialData.completed
        });
    }
}, [initialData]);

  const changeHandler = (e) => {
    const { name, value } = e.target
    //To allow valud keys only as form-level onChange handler catching events from elements other than intended input fields
        if(name && name in details) {
            setDetails(prevState => ({
              ...prevState,
              [name]: value
            }))
        }
    }

    //To get Today's date in YYYY-MM-DD format, so no past dates can be selected
    const getTodayDate = () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

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
              Save Task
            </button>
        </div>
    </form>
  );
};
