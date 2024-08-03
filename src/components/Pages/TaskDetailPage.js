import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CalendarDays, ClipboardList } from 'lucide-react';

export const TaskDetailPage = () => {
    const { taskId } = useParams();
    const [taskDetail, setTaskDetail] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:3001/tasks/${taskId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch task');
                }
                const result = await response.json();
                setTaskDetail(result);
            }
            catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
    }, [taskId]);

    if (!taskDetail) {
        return <div className="flex justify-center items-center h-full text-gray-300">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>;
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
            </div>
        </div>
    );
};