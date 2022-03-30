import React,{useEffect} from 'react'

import {Grid , TextField, Button, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel} from '@mui/material'
import './UserHome.css'


function UserHomeNext() {

    useEffect(()=>{

        window.scrollTo(0, 0);
    },[])
    
    return (
   
    <div>
      <div className='form' >

<h2   className='formHeading'>APPLICATION FOR INCUBATION</h2>

<Grid container spacing={4}>


<Grid item xs={12}>
<TextField
    id="outlined-textarea"
    label="Who are your competitors and what is your competitive advantage ?"
    multiline
    rows={4}
    className='homeTextBox'
  />
</Grid>

<Grid item xs={12}>
<TextField
    id="outlined-textarea"
    label="Explain your revenue model"
    multiline
    rows={4}
    className='homeTextBox'
  />
</Grid>

<Grid item xs={12}>
<TextField
    id="outlined-textarea"
    label="What is the potential market size of the product?"
    multiline
    rows={4}
    className='homeTextBox'
  />
</Grid>

<Grid item xs={12}>
<TextField
    id="outlined-textarea"
    label="How do you market or plan to market your products and services"
    multiline
    rows={4}
    className='homeTextBox'
  />
</Grid>

<Grid item xs={12}>

<FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Type of Incubation needed</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    name="radio-buttons-group"
  >
    <FormControlLabel value="Physical Incubation" control={<Radio />} label="Physical Incubation" />
    <FormControlLabel value="Virtual Incubation" control={<Radio />} label="Virtual Incubation" />
  </RadioGroup>
</FormControl>
</Grid>


<Grid item xs={12}>
<TextField
    id="outlined-textarea"
    label="Upload a detailed business proposel"
    multiline
    rows={4}
    className='homeTextBox'
  />
</Grid>


<Button variant="contained" sx={{mt:5,marginLeft:'auto',marginRight:'auto'}} className='submitbtn' > Submit </Button>




</Grid>


</div>
    </div>
  )
}

export default UserHomeNext
