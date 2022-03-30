import React from 'react'
import {Box,List,ListItem,Grid} from '@mui/material'
import ListItemText from '@mui/material/ListItemText';
import './AdminHeader.css'
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupIcon from '@mui/icons-material/Group';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'




function AdminSidebar() {
  const navigate = useNavigate()
  const IconsArray = [<GroupIcon/> , <CalendarViewMonthIcon/>, <ReceiptLongIcon/>,<LogoutIcon/>]
  const sidebarRoutes = ['applicationList' , 'recordTrack', 'bookingSlots', 'logout']
  return (
    <div>
     


    <Box
      role="presentation"
      className='sidebar'
    >
      <List >
        {['Application List', 'Record Track', 'Booking Slots', 'Logout'].map((text, index) => (
          <ListItem button key={text} onClick={text==='Logout' ? ()=>localStorage.removeItem("admin") :()=>navigate(`/admin/${sidebarRoutes[index]}`)}>
            <Grid container>

              <Grid item xs={12} md={3}>
            <ListItemIcon sx={{color:'white',paddingBottom:2}}>
              {IconsArray[index]}
            </ListItemIcon>
              </Grid>


              <Grid item xs={12} md={9}>
            <ListItemText primary={text} className='listText' />
              </Grid>

            </Grid>
          </ListItem>
        ))}
      </List>
    </Box>



    </div>
  )
}

export default AdminSidebar
