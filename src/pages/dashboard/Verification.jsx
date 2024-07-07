import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiCalling';
import { Backdrop, CircularProgress } from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';
import Verify from './components/Verify';

const Verification = () => {

    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [volunteers, setVolunteers] = useState([])
    const loadVolunteers = async (token) => {
        setLoading(true)
        try {
            const response = await apiService.post("/getVolunteers",
                {
                    locality: localStorage.getItem("locality")
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
            if (response.status == 200) {
                setVolunteers(response.data)
            } else {
                setVolunteers([])
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
            reload && setReload(false)
        }
    }

    const dataUpdate = () => {
        setReload(true)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        loadVolunteers(token)
    }, [reload])

    return (
        <main className="container">
            <Backdrop open={loading}> <CircularProgress sx={{ color: 'white', marginRight: 2 }} /> <span className="text-white"> Loading Data</span>  </Backdrop>
            <span className="flex items-center gap-2 select-none w-full text-xl font-semibold text-teal-600 p-2 rounded-md bg-teal-100"> Verify Volunteer Data <VerifiedUser /> </span>
            <div className="mt-5 flex flex-wrap gap-5">
                {
                    volunteers.length > 0 ?
                    volunteers.map((item, index) => (
                        <Verify key={index} name={item.name} bgrp={item.bgrp} gender={item.gender} dob={item.dob} last={item.last} address={item.address} phone={item.mobile} update={dataUpdate}/>
                    ))
                    : <span className="text-red-800"> No Pending Verification </span>
                }
            </div>
        </main>
    );
}

export default Verification;
