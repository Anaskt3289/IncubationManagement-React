import React from 'react'
import {AppBar,Toolbar,IconButton,Button,Typography,Box} from '@mui/material'

function AdminAppbar() {
  return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#2c3d4a'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* {toggle ? <CloseIcon onClick={()=>setToggle(!toggle)}/> : <MenuIcon onClick={()=>setToggle(!toggle)} />} */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default AdminAppbar
