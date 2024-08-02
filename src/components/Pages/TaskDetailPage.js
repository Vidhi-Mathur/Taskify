import { useParams } from "react-router-dom";
import { Layout } from "../UI/Layout";
import { useEffect, useState } from "react";
import { getTasks } from "../../utils/api";

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
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h1>{taskDetail.title}</h1>
            <p>{taskDetail.description}</p>
            <p>Due Date: {taskDetail.dueDate}</p>
        </Layout>
    );
};
