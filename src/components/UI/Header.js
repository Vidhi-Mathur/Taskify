import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

export const Header = () => {
    return (
        <nav className="fixed top-0 z-50 w-full border-b bg-blue-900 border-blue-700">
        <div className="px-2 py-5 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                    <Link to="/" className="flex ms-2 md:me-24">
                        <img src={logo} className="h-10 me-3" alt="Taskify Logo" />
                        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Taskify</span>
                    </Link>
                </div>
            </div>
        </div>
      </nav>
    )
}