import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiCalling';
import { Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';

const HomePage = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem('token')
        token == undefined && navigate('/login')
        const loadData = async () => {
            const response = await apiService.get("/getInstData", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                setLoading(false)
                localStorage.setItem("locality", response.data.locality)
            } else {
                navigate('/login')
            }
        }
        loadData()
    }, [])
    return (
        <>
            <Backdrop open={loading}> <CircularProgress sx={{ color: 'white', marginRight: 1 }} /> <span className="text-white"> Loading Data </span> </Backdrop>

            <main className="container">
                <span className="flex items-center gap-2 select-none w-full text-xl font-semibold text-teal-600 p-2 rounded-md bg-teal-100"> Search Donor <Search /> </span>
            </main>

        </>
    );
}

export default HomePage;
