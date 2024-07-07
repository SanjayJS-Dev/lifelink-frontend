import { Domain, LoginTwoTone, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import apiService from '../../services/apiCalling';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")
    const [alert, setAlert] = useState("")
    const [passwdVisible, setPasswdVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email == "") {
            setAlert("Enter Email")
        } else if (passwd == "") {
            setAlert("Enter Password")
        } else {
            setAlert("")
            setLoading(true)
            const institution = {
                email: email,
                password: passwd
            }
            try {
                const response = await apiService.post("/validateLogin", institution)
                if (response.status == 200) {
                    localStorage.setItem('token', response.data)
                    navigate('/dashboard')
                } else {
                    setAlert(response.data.message)
                }
            } catch (error) {
                setAlert(error.response.data.message)
            } finally {
                setLoading(false)
            }
        }
    }
    return (
        <main className="container flex justify-center">
            <div className="flex flex-col border rounded-md p-5 gap-5 w-full max-w-lg">
                <h1 className="prompt-semibold text-xl select-none text-green-600 text-center"> <Domain /> Institution Login </h1>
                {alert != "" && <Alert severity="error"> {alert} </Alert>}
                {loading && <LinearProgress />}
                <form className="flex flex-col gap-5" autoComplete="off" onSubmit={handleLogin}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="email">Enter Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="email"
                            label="Enter Email"
                            onChange={(event) => setEmail(event.target.value)}
                            autoFocus
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={passwdVisible ? "text" : "password"}
                            onChange={(event) => setPasswd(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswdVisible(!passwdVisible)}
                                        edge="end"
                                    >
                                        {passwdVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button type="submit" color="success" variant="contained"> <LoginTwoTone sx={{ marginRight: 1 }} /> Login </Button>
                </form>
            </div>
        </main>
    )
}

export default Login;
