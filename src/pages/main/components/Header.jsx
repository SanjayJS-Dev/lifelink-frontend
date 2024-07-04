import React, { useState } from 'react';
import Logo from './../../../assets/images/logo.jpg'
import { IconButton } from '@mui/material';
import { Close, Home, Info, Login, Menu, PersonAdd } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {

    const [menu,setMenuOpen] = useState(false)
    const linkStyles = 
    "flex items-center gap-1 border rounded-md border-blue-200 text-blue-800 px-3 md:px-5 py-2 "+
    "hover:font-semibold hover:bg-blue-200 hover:text-blue-800 transition duration-1000"

    return (
        <header className="w-full sticky top-0 shadow-md mb-5 bg-white z-50">
            <div className="container py-3 md:py-5">
                <nav className="flex flex-wrap justify-between items-center">
                    <span className="flex items-center justify-center gap-2 select-none">
                        <img src={Logo} alt="LifeLink Logo" className="h-16 hover:animate-ping"/>
                        <h1 className="text-2xl text-red-700 dela-gothic-one-regular">LifeLink</h1>
                    </span>
                    <div className="md:hidden border rounded-full">
                        {
                            !menu ?
                            <IconButton onClick={()=>setMenuOpen(true)}>
                                <Menu/>
                            </IconButton>
                            :
                            <IconButton onClick={()=>setMenuOpen(false)}>
                                <Close/>
                            </IconButton>
                        }
                    </div>
                    <div className={`flex flex-col ${menu?"mt-5 h-auto":"h-0"} overflow-hidden w-full md:flex-row md:h-auto md:w-auto prompt-regular transition-all duration-300 ease-out gap-3`}>
                        <Link onClick={()=>{setMenuOpen(false)}} className={linkStyles} to={'/'}> <Home/> Home</Link>
                        <Link onClick={()=>{setMenuOpen(false)}} className={linkStyles} to={'/about'}> <Info/> About us </Link>
                        <Link onClick={()=>{setMenuOpen(false)}} className={linkStyles} to={'/login'}> <Login/> Login</Link>
                        <Link onClick={()=>{setMenuOpen(false)}} className={linkStyles} to={'/register'}> <PersonAdd/> Volunteer Registration </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
