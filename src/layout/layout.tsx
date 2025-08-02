import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar';
import { Footer } from '../component/footer';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen w-full items-center gap-4">
            <Navbar></Navbar>
            <div className="w-full flex justify-center items-center">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
