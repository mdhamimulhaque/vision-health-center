import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import LOGO from "../../../img/logo.png";


const Header = () => {
    const navbarData = [
        {
            id: 1,
            name: "Home",
            path: '/'
        },
        {
            id: 2,
            name: "About",
            path: '/about'
        },
        {
            id: 3,
            name: "Appointment",
            path: '/appointment'
        },
        {
            id: 4,
            name: "Reviews",
            path: '/reviews'
        },


        {
            id: 5,
            name: "Contact Us",
            path: '/contact'
        },
    ]


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);


    const handleLogout = () => {
        logOut()
            .then(result => {
                console.log("logout successfully")
            })
    }
    return (
        <div className="px-2 py-3 lg:px-5 z-50 bg-emerald-300">
            <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="logo flex gap-2 items-center text-white">
                        <img className='w-10' src={LOGO} alt="" />
                        <span className='text-xl font-semibold '>Vision Health Center</span>
                    </div>
                    <ul className="flex items-center hidden space-x-8 lg:flex ml-4">


                        {
                            navbarData?.map(navItem =>
                                <li
                                    key={navItem?.id}
                                    className=' text-white hover:text-emerald-500 font-medium tracking-wide duration-200 hover:text-deep-purple-accent-400'>
                                    <Link to={navItem?.path}>{navItem?.name}</Link>
                                </li>
                            )
                        }


                        {
                            user?.uid &&
                            <li
                                className=' text-white hover:text-emerald-500 font-medium tracking-wide duration-200 hover:text-deep-purple-accent-400'>
                                <Link to='/dashboard'>Dashboard</Link>
                            </li>
                        }
                    </ul>
                </div>
                <ul className="flex items-center hidden space-x-3 lg:flex">
                    {
                        user?.uid ?
                            <>
                                <li>
                                    <Link to="/"
                                        onClick={handleLogout}
                                        className="px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </>


                            : <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    >
                                        Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/registration"
                                        className="px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    >
                                        Registration
                                    </Link>
                                </li>
                            </>
                    }


                </ul>
                <div className="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full z-50">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="logo flex items-center text-white">
                                        <img className='w-10' src={LOGO} alt="" />
                                        <span className='ml-2 text-xl font-semibold '>Vision Health Center</span>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">


                                        {
                                            navbarData?.map(navItem =>
                                                <li
                                                    key={navItem?.id}
                                                    className='inline-flex items-center justify-center w-full px-6 font-medium tracking-wide transition duration-200 rounded focus:shadow-outline focus:outline-none'>
                                                    <Link to={navItem?.path}>{navItem?.name}</Link>
                                                </li>
                                            )
                                        }


                                    </ul>
                                    {
                                        user?.uid ?
                                            <div className='flex gap-2 mt-4 justify-center'>
                                                <Link to="/"
                                                    onClick={handleLogout}
                                                    className="px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                >
                                                    Log Out
                                                </Link></div>


                                            : <div className='flex gap-2 mt-4 justify-center'>
                                                <Link to="/login"
                                                    className="px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                >
                                                    Log in
                                                </Link>
                                                <Link
                                                    to="/registration"
                                                    className="px-4 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                >
                                                    Registration
                                                </Link>
                                            </div>
                                    }


                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Header;