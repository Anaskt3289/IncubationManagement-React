import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Paper, Box, Typography, TextField, Button, Link} from '@mui/material'
import axios from 'axios'
import {ServerURL} from '../../Constants/Constants'
import SignupStyles from './SignupStyle'

function Signup() {
    const style = SignupStyles()
    const navigate = useNavigate()

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"));
        if(user){
          navigate('/home')
        }
    },[])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pword, setPword] = useState('')
    const [repword, setRePword] = useState('')

    const [errMsg, setErrMsg] = useState(null)
   
    const postSignup = ()=>{

        if(!name||!email||!pword||!repword){
            setErrMsg('Enter the required details.')
        }else if(pword.length<6){
            setErrMsg('Password should have minimum 6 letters.')
          }else if(pword!=repword){
            setErrMsg('Passwords doesnt match !')
          }else{
            setErrMsg(null)
            const userDetails = {
                name,
                email,
                pword,
                repword
            }
        axios.post(`${ServerURL}/signup`,userDetails).then(()=>{
            
            navigate('/')
             
         }).catch((err)=>{
             console.log(err);
             if(err.response.data.errMsg){
                 setErrMsg(err.response.data.errMsg)
             }
         })
            
          }  
        
    }

  return (
    <div className={style.mainDiv}>


      <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: "auto",
                        width: 360,
                        height: 450,
                        mt: 6,
                        textAlign: "center",
                        paddingTop: 5,
                        paddingBottom: 8,
                        
                    },
                }}
            >
                <Paper elevation={3}>
                <Typography variant='h5' className={style.signupheading}>
                        Sign up
                    </Typography>

                    {errMsg ?  <p className={style.errMsg}>{errMsg}</p> :''}
                  
                    <TextField id="outlined-basic" label="Enter your Name" variant="outlined" className={style.signupTextField} onChange={(e)=>setName(e.target.value)} />

                    <TextField id="outlined-basic" label="Enter your email" variant="outlined" sx={{ mt: 2 }} type={'email'} className={style.signupTextField} onChange={(e)=>setEmail(e.target.value)} />

                    <TextField id="outlined-basic" label="Enter your password" variant="outlined" sx={{ mt: 2 }} type={'password'} className={style.signupTextField} onChange={(e)=>setPword(e.target.value)} />

                    <TextField id="outlined-basic" label="Confirm Password" variant="outlined" sx={{ mt: 2 }} type={'password'} className={style.signupTextField} onChange={(e)=>setRePword(e.target.value)} />

                    <Button variant="contained" sx={{ mt: 4 }} className={style.signupbtn} onClick={postSignup}>Sign up</Button><br />


                    <Link onClick={()=>{
                        navigate('/')
                    }}  underline="always" sx={{mr:5,mt:2}} className={style.alreadyhaveAccount}>
                        Already have an account? Sign in
                    </Link>
                   
                </Paper>
            </Box>
    </div>
  )
}

export default Signup
