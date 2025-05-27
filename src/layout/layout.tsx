import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen w-full items-center">
            <Navbar></Navbar>
            <div className="w-full flex justify-center items-center">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Layout;
