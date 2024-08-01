export const SideBar = ({ toggleFormVisibility, tasks }) => {
  return (
    <aside id="logo-sidebar" className="w-64 h-full pt-20 border-r bg-gray-900 border-gray-700" aria-label="Sidebar">
      <h2 className="mt-8 ml-4 uppercase font-bold md:text-xl text-gray-300">Your Tasks</h2>
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-900">
      <ul className="space-y-2 font-medium">
          {tasks.map(task => (
            <li key={task.id} className="text-gray-300">
              {task.title}
            </li>
          ))}
        </ul>
        <button className="mt-4 px-4 py-2 text-xs md:text-base rounded-md text-gray-100 bg-blue-700 hover:bg-blue-600 hover:text-white" onClick={toggleFormVisibility}>
          + Add More
        </button>
      </div>
    </aside>
  );
};
