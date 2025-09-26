import { Outlet } from "react-router-dom";
import Navbar from "../nav/NavBar";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
const UserLayout = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <Navbar />

                <Outlet />

                {/* Footer */}
            </div>
        </>
    );
};

export default UserLayout;