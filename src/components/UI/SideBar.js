import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'
import SearchSharpIcon from '@mui/icons-material/SearchTwoTone'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export const SideBar = ({ toggleFormVisibility, tasks = [] }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [query, setQuery] = useState('')
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    //To handle sidebar visiblity, which is initially hidden
    const toggleSideBarVisibility = () => {
        setIsVisible(prevState => !prevState)
    }

    //To handle searching tasks
    const toggleSearchBarVisibility = () => {
        if(isSearchActive){
            //Reset query and filtered tasks when closing search
            setQuery('')
            setFilteredTasks(tasks)
        }
        setIsSearchActive(prevState => !prevState)
    }

    useEffect(() => {
        //Nothing entered
        if(query.trim() === ''){
            setFilteredTasks(tasks)
        } 
        //Filter based on search results
        else{
            setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase())))
        }
    }, [query, tasks])

    //Handling change in search query 
    const inputChangeHandler = (e) => {
        setQuery(e.target.value)
    }

    return (
        <aside id="logo-sidebar" className={`flex flex-col ${isVisible ? 'w-80' : 'w-16'} h-full pt-20 border-r bg-gray-900 border-gray-700 transition-all duration-300`} aria-label="Sidebar">
            <div className="flex items-center justify-between mt-8 ml-4 mr-4">
                {isVisible && !isSearchActive && <h2 className="uppercase font-bold md:text-xl text-gray-300">Your Tasks</h2>}
                {isVisible && !isSearchActive && (
                    <Tooltip title="Search" placement="right" arrow>
                        <SearchSharpIcon color='info' className='ml-20 cursor-pointer' onClick={toggleSearchBarVisibility} />
                    </Tooltip>
                )}
                {isVisible && isSearchActive && (
                    <>
                        <div className="flex w-full max-w-4xl mx-auto border border-gray-300 rounded-md overflow-hidden mr-2">
                            <input type="search" placeholder="Search" className="flex-grow px-4 py-1 text-base outline-none bg-gray-800 text-gray-300" value={query} onChange={inputChangeHandler}/>
                            <button className="px-4 py-1 bg-gray-800 hover:bg-gray-700 transition-colors" onClick={toggleSearchBarVisibility}>
                            <ArrowBackIcon color='info' />
                            </button>
                        </div>
                    </>
                )}
                <Tooltip title={isVisible ? "Hide Your List" : "Expand Your List"} placement="right" arrow>
                    <ViewSidebarIcon color='info' className='cursor-pointer' onClick={toggleSideBarVisibility} />
                </Tooltip>
            </div>
            {isVisible && (
                <>
                    <div className="flex-grow px-3 pb-4 overflow-y-auto bg-gray-900 mt-4 hide-scrollbar">
                        {isSearchActive && query.trim() !== '' && filteredTasks.length === 0 && (
                            <div className="p-2 text-gray-500">No tasks found</div>
                        )}
                        <ul className="space-y-2 font-medium">
                            {filteredTasks.map(task => (
                                <li key={task.id}>
                                    <Link to={`/${task.id}`} className="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
                                        <span className={`ms-3 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{task.title}</span>
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
    )
}
