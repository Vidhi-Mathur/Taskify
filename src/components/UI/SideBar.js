import React from 'react';
import { Link } from 'react-router-dom';

export const SideBar = ({ toggleFormVisibility, tasks = [] }) => {
  return (
    <aside id="logo-sidebar" className="flex flex-col w-80 h-full pt-20 border-r bg-gray-900 border-gray-700" aria-label="Sidebar">
      <h2 className="mt-8 ml-4 uppercase font-bold md:text-xl text-gray-300">Your Tasks</h2>
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
    </aside>
  );
};