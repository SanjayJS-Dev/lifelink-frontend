import { Cancel, EditNote, Verified } from '@mui/icons-material';
import { Button, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import apiService from '../../../services/apiCalling';

const Verify = (props) => {

    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState("")

    const accept = async () => {
        setLoading(true)
        try {
            const response = await apiService.patch("/acceptVolunteer",
                {
                    mobile: props.phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            if (response.status == 200) {
                setLoading(false)
                props.update()
            }
            else {
                setLoading(false)
                alert("error")
            }
        } catch (error) {
            setLoading(false)
            alert(error.message)
        }
    }

    const reject = async () => {
        setLoading(true)
        try {
            const response = await apiService.delete("/rejectVolunteer", {
                data: {
                    mobile: props.phone
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                setLoading(false)
                props.update()
            }
            else {
                setLoading(false)
                alert("error")
            }
        } catch (error) {
            setLoading(false)
            alert(error.message)
            console.log(error)
        }
    }

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[])

    return (
        <section className="p-5 shadow-md rounded-md bg-slate-200 min-w-72 flex flex-col flex-grow">
            {loading && <LinearProgress />}
            <span className="text-xl font-semibold text-slate-800 mb-5"> {props.name} </span>
            <span className="text-md mb-2 font-medium text-slate-600"> Gender: {props.gender} </span>
            <span className="text-md mb-2 font-medium text-slate-600"> DOB: {props.dob} </span>
            <span className="text-md mb-2 font-medium text-slate-600"> Last Donated Date: {props.last} </span>
            <span className="text-md mb-2 font-medium text-slate-600"> Address: {props.address} </span>
            <span className="text-md mb-2 font-medium text-slate-600"> Phone: {props.phone} </span>
            <span className="text-md mb-5 font-medium text-slate-600"> Blood Group: {props.bgrp} </span>
            <span className="flex w-full gap-2">
                <Button variant="contained" onClick={accept} color="success">Accept <Verified fontSize="small" sx={{ marginLeft: 1 }} /> </Button>
                <Button variant="contained" color="warning">Edit <EditNote fontSize="small" sx={{ marginLeft: 1 }} /> </Button>
                <Button variant="contained" onClick={reject} color="error">Reject <Cancel fontSize="small" sx={{ marginLeft: 1 }} /> </Button>
            </span>
        </section>
    );
}

export default Verify;
