import { Diversity1, VerifiedUser } from '@mui/icons-material';
import { Alert, Button, FormControl, InputLabel, LinearProgress, OutlinedInput } from '@mui/material';
import React, { Component } from 'react';
import Banner from './../../assets/images/blood.png'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            req_id: "",
            alert: "",
            loading: false,
        }
    }
    shouldComponentUpdate(nP,nS) {
        if(nS.req_id!=this.state.req_id) return false
        return true
    }
    render() {
        return (
            <main className="container flex flex-col gap-5 md:flex-row">
                <div className="hidden w-full md:flex flex-col items-center gap-5">
                    <h1 className="text-xl dela-gothic-one-regular flex gap-2 select-none"> <span className="text-green-700"> Welcome to </span> <span className="text-red-700 flex items-center gap-2">LifeLink <Diversity1/> </span>  </h1>
                    <img src={Banner} className="animate-pulse"/>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Alert severity="warning"> Warning: Beware of fake donation requests </Alert>
                    <span className="block w-full rounded-lg px-3 py-2 text-xl text-teal-600 bg-teal-100 font-semibold select-none">
                        Verify Donation Requests Here <VerifiedUser/>
                    </span>
                    {this.state.alert!="" && <Alert severity="error"> {this.state.alert} </Alert>}
                    <div className="w-full flex gap-2">
                        <FormControl variant="outlined" sx={{flex:1}}>
                            <InputLabel htmlFor="reqid">Enter Request ID</InputLabel>
                            <OutlinedInput
                                id="reqid"
                                type="text"
                                label="Enter Request ID"
                                onChange={(event) => this.setState({ req_id: event.target.value })}
                                autoFocus
                                autoComplete="off"
                            />
                        </FormControl>
                        <Button variant="contained" sx={{padding:2}}>
                            Verify <VerifiedUser fontSize="small" sx={{marginLeft:1}}/>
                        </Button>
                    </div>
                    {this.state.loading && <LinearProgress/>}
                </div>
            </main>
        );
    }
}

export default Home;
