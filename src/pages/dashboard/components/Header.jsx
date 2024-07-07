import React, { useState } from 'react';
import Logo from './../../../assets/images/logo.jpg'
import { Button, IconButton } from '@mui/material';
import { Close, Home, Logout, Menu, Verified } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

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
                    <Link onClick={()=>{setMenuOpen(false)}} className={linkStyles} to={'/dashboard'}> <Home/> Home</Link>
                    <Link onClick={()=>{setMenuOpen(false)}} className={linkStyles} to={'/dashboard/verification'}> <Verified/> Volunteer Verification </Link>
                    <Button variant="outlined" color="error" onClick={()=>{localStorage.clear(); navigate('/login')}}> <Logout sx={{marginRight:1}}/> Logout  </Button>
                </div>
            </nav>
        </div>
    </header>
    );
}

export default Header;
