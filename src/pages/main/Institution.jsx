import React, { Component } from 'react';
import Banner from './../../assets/images/blood.png';
import { Domain, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, OutlinedInput, Select } from '@mui/material';
import { getLocalities } from '../../services/getLocalities';
import apiService from '../../services/apiCalling';

class Institution extends Component {

    constructor() {
        super()
        this.state = {
            localities: [],
            name: "",
            locality: "",
            phone: "",
            address: "",
            email: "",
            psswd: "",
            cpsswd: "",
            vPsswd: false,
            vCPsswd: false,
            alert: "",
            alert_type: false,
            loading: false,
            loc_loading: true
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const name = this.state.name
        const locality = this.state.locality
        const phone = this.state.phone
        const address = this.state.address
        const email = this.state.email
        const psswd = this.state.psswd
        const cpsswd = this.state.cpsswd

        if (name == "") {
            this.setState({ alert: "Enter Name of Institution" })
        } else if (locality == "") {
            this.setState({ alert: "Select Locality" })
        } else if (phone == "") {
            this.setState({ alert: "Enter Phone Number" })
        } else if (address == "") {
            this.setState({ alert: "Enter Address" })
        } else if (email == "") {
            this.setState({ alert: "Enter Email ID" })
        } else if (psswd == "") {
            this.setState({ alert: "Choose Password" })
        } else if (cpsswd == "") {
            this.setState({ alert: "ReEnter Password" })
        } else if (psswd != cpsswd) {
            this.setState({ alert: "Passwords do not match" })
        } else {
            this.setState({ loading: true, alert: "" })
            const institution = {
                name: name,
                locality: locality,
                phone: phone,
                address: address,
                password: psswd,
                email: email
            }
            try {
                const response = await apiService.post("/addInstitution", institution)
                this.setState({ alert_type: true, alert: response.data.message })
            } catch (error) {
                this.setState({ alert_type: false, alert: error.response.data.message })
            }
            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        getLocalities().then((response) => {
            if (response.status == true) {
                this.setState({ localities: response.localities, loc_loading: false })
            } else {
                this.setState({ alert: "Localities fetching failed", loc_loading: false })
            }
        }).catch((error) => {
            this.setState({ alert: error.message + ": Localities fetching failed", loc_loading: false })
        })
    }

    render() {
        return (
            <main className="container flex flex-col gap-5 md:flex-row">
                <div className="hidden w-full md:flex flex-col items-center gap-5">
                    <div className="flex flex-col items-center">
                        <h2 className="text-md text-red-700"> &#x275D; Blood is meant for circulation. Donate Blood &#x275E; </h2>
                        <h1 className="text-xl text-red-700 dela-gothic-one-regular flex items-center gap-2 select-none"> Register an Institution <Domain /> </h1>
                    </div>
                    <img src={Banner} className="animate-pulse" />
                </div>
                <div className="w-full flex flex-col gap-5">
                    <span className="block w-full rounded-lg px-3 py-2 text-xl text-teal-600 bg-teal-100 font-semibold select-none">
                        Institution Registration <Domain />
                    </span>
                    {this.state.loading && <LinearProgress />}
                    {this.state.alert != "" && <Alert severity={this.state.alert_type ? "success" : "error"}> {this.state.alert} </Alert>}
                    <form autoComplete="off" onSubmit={this.handleSubmit} className="flex flex-wrap gap-5">
                        <FormControl className="w-full flex-grow md:w-auto">
                            <InputLabel htmlFor="name">Enter Name of Institution</InputLabel>
                            <OutlinedInput
                                id="name"
                                label="Enter Name of Institution"
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </FormControl>
                        <FormControl sx={{ minWidth: 175 }} className="w-full md:w-auto">
                            <InputLabel id="locality">Select Locality</InputLabel>
                            <Select
                                labelId="locality"
                                defaultValue=""
                                label="Select Locality"
                                onChange={(e) => this.setState({ locality: e.target.value })}>
                                {this.state.loc_loading && <MenuItem disabled> <CircularProgress size={20} sx={{ marginRight: 1 }} /> Loading Localities </MenuItem>}
                                {
                                    this.state.localities.length > 0 && (
                                        this.state.localities.map((locality, index) => (
                                            <MenuItem key={index} value={locality.loc_id}>{locality.name}</MenuItem>
                                        ))
                                    )
                                }
                            </Select>
                        </FormControl>
                        <FormControl className="w-full flex-grow md:w-auto">
                            <InputLabel htmlFor="phone">Enter Phone Number</InputLabel>
                            <OutlinedInput
                                type="tel"
                                id="phone"
                                label="Enter Phone Number"
                                onChange={(e) => this.setState({ phone: e.target.value })}
                            />
                        </FormControl>
                        <FormControl className="w-full flex-grow">
                            <InputLabel htmlFor="addr">Enter Address</InputLabel>
                            <OutlinedInput
                                type="text"
                                id="addr"
                                label="Enter Address"
                                onChange={(e) => this.setState({ address: e.target.value })}
                            />
                        </FormControl>
                        <FormControl className="w-full flex-grow">
                            <InputLabel htmlFor="email">Enter Email ID</InputLabel>
                            <OutlinedInput
                                type="email"
                                id="email"
                                label="Enter Email ID"
                                onChange={(e) => this.setState({ email: e.target.value })}
                            />
                        </FormControl>
                        <FormControl className="w-full md:w-auto flex-grow">
                            <InputLabel htmlFor="psswd">Choose Password</InputLabel>
                            <OutlinedInput
                                type={this.state.vPsswd ? "text" : "password"}
                                id="psswd"
                                label="Choose Password"
                                onChange={(e) => this.setState({ psswd: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => this.setState({ vPsswd: !this.state.vPsswd })}
                                            edge="end">
                                            {this.state.vPsswd ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className="w-full md:w-auto flex-grow">
                            <InputLabel htmlFor="cpsswd">Confirm Password</InputLabel>
                            <OutlinedInput
                                type={this.state.vCPsswd ? "text" : "password"}
                                id="cpsswd"
                                label="Confirm Password"
                                onChange={(e) => this.setState({ cpsswd: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => this.setState({ vCPsswd: !this.state.vCPsswd })}
                                            edge="end">
                                            {this.state.vCPsswd ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div className="w-full flex">
                            <Button variant="contained" type="submit"> Register as Volunteer </Button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

export default Institution;

