import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiCalling';
import { Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { io } from 'socket.io-client';
import Donors from './Donors';
import parseDate from '../../utils/parseDates';
import { calculateAge } from '../../utils/calculateAge';

const HomePage = () => {

    const navigate = useNavigate()

    const [bgrp, setBgrp] = useState("")
    const [donors, setDonors] = useState([])
    const [filterDonors, setFilteredDonors] = useState([])
    const [loading, setLoading] = useState(true)
    const [donorLoading, setDonorLoading] = useState(false)
    const [socket, setSocket] = useState(null)

    const getDonors = () => {
        if (bgrp == "") {
            alert("Select Blood Group")
            return
        }
        if (socket == null) {
            alert("Connection to Volunteers not Established")
            return
        }
        socket.emit("request", bgrp)
        setDonorLoading(true)
    }

    const haverSine = (vloc, hloc) => {
        const R = 6371;

        // Convert degrees to radians
        const toRadians = (degrees) => degrees * (Math.PI / 180);

        const dLat = toRadians(vloc.latitude - hloc.latitude);
        const dLon = toRadians(vloc.longitude - hloc.longitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(vloc.latitude)) * Math.cos(toRadians(hloc.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance in kilometers
        const distance = R * c;

        return distance;
    }

    const listenEvents = () => {
        socket.on("connect_error", () => {
            alert("Connection to Volunteers Failed")
        })
        socket.on("receivedLocation", (data) => {
            setDonors([...donors, data])
        })
    }

    const setDonorData = async (donor) => {
        const token = localStorage.getItem("token")
        const response = await apiService.post("getDonorData", {
            mobile: donor.mobile
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status == 200) {
            const volunteer = response.data
            const location = {
                latitude: donor.latitude,
                longitude: donor.longitude
            }
            const instLocation = {
                latitude: localStorage.getItem("latitude"),
                longitude: localStorage.getItem("longitude")
            }

            let today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            today = `${day}-${month}-${year}`;

            const todayDate = parseDate(today)
            const lastDonated = parseDate(volunteer.last)
            let difference = todayDate - lastDonated
            difference = difference / (1000 * 60 * 60 * 24);

            const donorData = {
                name: volunteer.name,
                age: calculateAge(volunteer.dob),
                bgrp: volunteer.bgrp,
                mobile: volunteer.mobile,
                distance: parseFloat(haverSine(location, instLocation).toFixed(1)),
                lastDonated: difference
            }

            let repeat = false
            filterDonors.map((donor)=>{
                if(donor.mobile == donorData.mobile) {
                    repeat = true
                }
            })

            if(!repeat) setFilteredDonors([...filterDonors,donorData])

        } else {
            alert("Something went wrong!")
        }
    }

    useEffect(() => {
        donors.map((donor) => {
            if(donor.bgrp == bgrp) {
                setDonorData(donor)
            }
        })
    }, [donors])

    useEffect(() => {
        if (socket != null) {
            listenEvents()
        } else {
            setSocket(io.connect("https://lifelinkapi.azurewebsites.net", {
                withCredentials: true
            }))
        }
    }, [socket])

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
                localStorage.setItem("latitude", response.data.location.latitude)
                localStorage.setItem("longitude", response.data.location.longitude)
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
                <span className="flex items-center gap-2 select-none w-full text-xl font-semibold text-teal-600 p-2 rounded-md bg-teal-100 mb-5"> Search Donor <Search /> </span>
                <div className="flex items-center gap-5 w-fit flex-wrap">
                    Select Blood Group:
                    <FormControl sx={{ minWidth: 175 }} className="w-full flex-grow md:w-auto">
                        <InputLabel id="bgrp">Select Blood Group</InputLabel>
                        <Select
                            labelId="bgrp"
                            defaultValue=""
                            label="Select Blood Group"
                            onChange={(e) => setBgrp(e.target.value)}>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={() => getDonors()} size="large"> Search Donor <Search sx={{ marginLeft: 2 }} /> </Button>
                </div>
                {
                    donorLoading &&
                    <div className="flex flex-col mt-5">
                        <div className="flex items-center gap-5 mb-5">
                            <CircularProgress /> Searching Donors
                        </div>
                        <div className="flex flex-wrap gap-5">
                            {
                                filterDonors.length > 0 &&
                                filterDonors.map((item, index) => (
                                    <Donors key={index} name={item.name} age={item.age} blood={item.bgrp} distance={item.distance} last={item.lastDonated} />
                                ))
                            }
                        </div>
                    </div>
                }
            </main>

        </>
    );
}

export default HomePage;
