import { Button } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full fixed bottom-0 z-50 bg-slate-300">
            <div className="container py-3 md:py-5 flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="md:border md:rounded-md md:p-2 md:bg-gray-100 md:shadow-md select-none">Copyright &copy; 2024 LifeLink </span>
                <span className="flex flex-col gap-2">
                    Wan't to be a part of LifeLink ? <br />
                    <Link to={'/institution'} className="text-blue-700">
                        <Button variant="outlined" color="success">
                            Register Here
                        </Button>
                    </Link>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
