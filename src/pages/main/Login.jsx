import { Domain, LoginTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput } from '@mui/material';
import React, { Component } from 'react';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            passwd: "",
            alert: "",
            passwdVisible: false,
            loading: false
        }
    }

    handleLogin = (e) => {
        e.preventDefault()
        const email = this.state.email
        const passwd = this.state.passwd
        if (email == "") {
            this.setState({alert:"Enter Email"})
        } else if (passwd == "") {
            this.setState({alert:"Enter Password"})
        } else {
            this.setState({alert:""})
            this.setState({loading:true})
        }
    }

    shouldComponentUpdate(nP,nS) {
        if(this.state.passwdVisible!=nS.passwdVisible || this.state.alert!=nS.alert || this.state.loading != nS.loading)
            return true
        return false
    }

    render() {
        return (
            <main className="container flex justify-center">
                <div className="flex flex-col border rounded-md p-5 gap-5 w-full max-w-lg">
                    <h1 className="prompt-semibold text-xl select-none text-green-600 text-center"> <Domain /> Institution Login </h1>
                    {this.state.alert!="" && <Alert severity="error"> {this.state.alert} </Alert>}
                    {this.state.loading && <LinearProgress/>}
                    <form className="flex flex-col gap-5" autoComplete="off" onSubmit={this.handleLogin}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="email">Enter Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                type="email"
                                label="Enter Email"
                                onChange={(event)=>this.setState({email:event.target.value})}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={this.state.passwdVisible ? "text" : "password"}
                                onChange={(event)=>this.setState({passwd:event.target.value})}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => this.setState({ passwdVisible: !this.state.passwdVisible })}
                                            edge="end"
                                        >
                                            {this.state.passwdVisible ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button type="submit" color="success" variant="contained"> <LoginTwoTone sx={{marginRight:1}}/> Login </Button>
                    </form>
                </div>
            </main>
        );
    }
}

export default Login;
