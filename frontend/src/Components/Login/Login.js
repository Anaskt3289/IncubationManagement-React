import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Paper, Box, Typography, TextField, Button, Link } from '@mui/material'
import LoginStyles from './LoginStyle'
import axios from 'axios'
import { ServerURL } from '../../Constants/Constants'

function Login(props) {
    const style = LoginStyles()
    const navigate = useNavigate()

    useEffect(() => {
        if (props.admin) {
            let admin = localStorage.getItem("admin");
            if (admin) {
                navigate('/admin/applicationList')
            }
        } else {
            let user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                navigate('/home')
            }

        }

    }, [])

    const [email, setEmail] = useState(null)
    const [pword, setPword] = useState(null)

    const [errMsg, setErrMsg] = useState(null)

    const loginPost = () => {
        if (!email || !pword) {
            setErrMsg('Enter required details.')
        } else {
            setErrMsg(null)
            const loginData = {
                email,
                pword
            }
            if (props.admin) {
                axios.post(`${ServerURL}/admin/login`, loginData).then((response) => {
                    localStorage.setItem("admin", true);
                    navigate('/admin/applicationList')
                }).catch((err) => {
                    console.log(err);
                    if (err.response.data.errMsg) {
                        setErrMsg(err.response.data.errMsg)
                    }
                })
            } else {
                axios.post(`${ServerURL}/login`, loginData).then((response) => {

                    localStorage.setItem("user", JSON.stringify(response.data));

                    navigate('/home')
                }).catch((err) => {
                    console.log(err);
                    if (err.response.data.errMsg) {
                        setErrMsg(err.response.data.errMsg)
                    }
                })
            }

        }
    }
    return (
        <div>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: "auto",
                        width: 400,
                        height: 450,
                        mt: 6,
                        textAlign: "center",
                        paddingTop: 7
                    },
                }}
            >
                <Paper elevation={0}>
                    <Typography variant='h5' className={style.signinheading}>
                        {props.admin ? 'Admin' : 'Sign in'}
                    </Typography>

                    {errMsg ? <p className={style.loginerr}>{errMsg}</p> : ''}

                    <TextField id="outlined-basic" label="Enter your email" variant="outlined" type={'email'} className={style.loginTextField}
                        onChange={(e) => setEmail(e.target.value)} />


                    <TextField id="outlined-basic" label="Enter your password" variant="outlined" sx={{ mt: 3 }} type={'password'} className={style.loginTextField}
                        onChange={(e) => setPword(e.target.value)} />

                    <Button variant="contained" sx={{ mt: 5 }} className={style.loginbtn} onClick={loginPost}>Sign in</Button><br />
                    {props.admin ? '' : <Link onClick={() => {
                        navigate('/signup')
                    }} underline="always" sx={{ mr: 3, mt: 3 }} className={style.donthaveAccount}>
                        Don't have an account? Sign Up
                    </Link>}


                </Paper>
            </Box>
        </div>
    )
}

export default Login
