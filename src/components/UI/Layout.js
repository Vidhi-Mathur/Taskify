import { Header } from "../UI/Header";
import { SideBar } from "../UI/SideBar";

export const Layout = ({ children, tasks, toggleFormVisibility }) => {
    
  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <Header />
        <div className="flex flex-grow overflow-hidden">
            <SideBar toggleFormVisibility={toggleFormVisibility} tasks={tasks}/>
            <main className="flex-grow p-8">
                {children}
            </main>
        </div>
    </div>
  );
};
