export const getTasks = async () => {
    try {
        const response = await fetch('http://localhost:3001/tasks');
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};