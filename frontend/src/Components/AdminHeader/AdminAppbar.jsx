import React, { useEffect, useState } from 'react'
import {AppBar,Toolbar,IconButton,Button,Typography,Box} from '@mui/material'
import {useNavigate} from 'react-router-dom'

function AdminAppbar(props) {

  const [refresh , setRefresh] = useState(false)
  const navigate = useNavigate()
  
  const userLogout = ()=>{
    localStorage.removeItem("user")
    setRefresh(!refresh)
  }
  const adminLogout = ()=>{
    localStorage.removeItem("admin")
    setRefresh(!refresh)
  }

  useEffect(()=>{

    if(props.user){
      let user = localStorage.getItem("user")
      if (!user) {
         navigate('/')
      }
    }else{
      let admin = localStorage.getItem("admin")
      if (!admin) {
         navigate('/admin')
      }
    }

  },[refresh])
  return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#2c3d4a'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          </IconButton> */}

          {
            props.user ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
           </Typography> :
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          }
          <Button color="inherit" onClick={props.user ? userLogout : adminLogout} >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default AdminAppbar
