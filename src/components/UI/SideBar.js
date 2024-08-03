import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import { Tooltip } from '@mui/material';

export const SideBar = ({ toggleFormVisibility, tasks = [] }) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleSideBarVisibility = () => {
        setIsVisible(prevState => !prevState)
    }

    return (
        <aside id="logo-sidebar" className={`flex flex-col ${isVisible ? 'w-80' : 'w-16'} h-full pt-20 border-r bg-gray-900 border-gray-700 transition-all duration-300`} aria-label="Sidebar">
            <div className="flex items-center justify-between mt-8 ml-4 mr-4">
            {isVisible && <h2 className="uppercase font-bold md:text-xl text-gray-300">Your Tasks</h2>}
            <Tooltip title={isVisible ? "Hide Your List" : "Expand Your List"} placement="right" arrow>
                <ViewSidebarIcon color='info' className='cursor-pointer' onClick={toggleSideBarVisibility}/>
            </Tooltip>
            </div>
            {isVisible && (
                <>
                <div className="flex-grow px-3 pb-4 overflow-y-auto bg-gray-900 mt-4 hide-scrollbar">
                    <ul className="space-y-2 font-medium">
                       {tasks.map(task => (
                           <li key={task.id}>
                               <Link to={`/${task.id}`} className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group">
                                   <span className="ms-3">{task.title}</span>
                               </Link>
                           </li>
                        ))}
                    </ul>
                </div>
                <button className="m-4 px-4 py-2 text-sm md:text-base rounded-md text-gray-100 bg-blue-700 hover:bg-blue-600 hover:text-white" onClick={toggleFormVisibility}>
                  + Add More
                </button>
                </>
            )}
        </aside>
    );
};