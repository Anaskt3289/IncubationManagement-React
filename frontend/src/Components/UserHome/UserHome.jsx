import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material'
import './UserHome.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerURL } from '../../Constants/Constants'



function UserHome() {

  const navigate = useNavigate()
  const [userId ,setUserId] = useState(null)
 
  
  
  const user = JSON.parse(localStorage.getItem("user")) 
  
  useEffect(() => {
    
    if (user) {
      
      window.scrollTo(0, 0);
      setUserId(user.id)
      
      if(user.slot){
        navigate('/slotAllocated')
      }
    } else {
      navigate('/')
    }
    
  }, [])
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    }
  };
  
  
  const initialState = {
    name: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: '',
    companyName: '',
    teamAndBackground: '',
    companyAndProducts: '',
    problemTryingToSolve: '',
    uniqueAboutSolution: '',
    propositionToCustomer: '',
    competitorsAndAdvantage: '',
    revenueModel: '',
    marketSizeOfProduct: '',
    HowToMarketProduct: '',
    incubationType: '',
    businessProposel: ''

  }


  const [formData, setFormData] = useState(initialState)
  const [errMsg, setErrMsg] = useState(null)
  const [logo , setLogo]= useState(null)

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
   

  }

  const handleSubmit = () => {
    
    if (!logo||!formData.name || !formData.address || !formData.city || !formData.state || !formData.email || !formData.phone || !formData.companyName ||!formData.teamAndBackground || !formData.companyAndProducts || !formData.problemTryingToSolve || !formData.uniqueAboutSolution || !formData.propositionToCustomer || !formData.competitorsAndAdvantage || !formData.revenueModel || !formData.marketSizeOfProduct || !formData.HowToMarketProduct || !formData.incubationType || !formData.businessProposel) {
      setErrMsg('Enter the required fields')
      window.scrollTo(0, 0);
    }else{
      setErrMsg(null)
      const applicationData = { ...formData, userId: userId }

      const data = new FormData()
      data.append('logo',logo)
      data.append('details',JSON.stringify(applicationData))

      axios.post(`${ServerURL}/submitApplication`,data,config).then((resp)=>{
        navigate('/applicationProcessing')
      }).catch((err)=>{
        console.log(err);
      })
    }
  }



  return (
    <div>
      <div className='form' >

        <h2 className='formHeading'>APPLICATION FOR INCUBATION</h2>

        {errMsg ? <p className='errMsg'>{errMsg}</p> : ''}

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Name" name='name' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Address" name='address' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="City" name='city' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="State" name='state' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>



          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Email" name='email' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Phone Number" name='phone' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField id="outlined-basic" label="Company Name" name='companyName' variant="outlined" className='homeTextBox' onChange={handleOnchange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <label htmlFor="companylogo" className='logoField'>Company Logo</label> <br />
            <input type='file' id='companylogo' name='companyLogo' onChange={(e)=> setLogo(e.target.files[0])}/>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Describe your team and background"
              name='teamAndBackground'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Describe your company and products"
              name='companyAndProducts'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Describe the problem you are trying to solve"
              name='problemTryingToSolve'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="What is unique about your solution?"
              name='uniqueAboutSolution'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="What is your value proposition for the customer?"
              name='propositionToCustomer'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          {/* <Button variant="text" sx={{mt:5,marginLeft:'auto'}} onClick={()=> navigate('/home/next')} >Next</Button> */}

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Who are your competitors and what is your competitive advantage ?"
              name='competitorsAndAdvantage'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Explain your revenue model"
              name='revenueModel'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="What is the potential market size of the product?"
              name='marketSizeOfProduct'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="How do you market or plan to market your products and services"
              name='HowToMarketProduct'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>

          <Grid item xs={12}>

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Type of Incubation needed</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel value="Physical Incubation" onChange={handleOnchange} name='incubationType' control={<Radio />} label="Physical Incubation" />
                <FormControlLabel value="Virtual Incubation" onChange={handleOnchange} name='incubationType' control={<Radio />} label="Virtual Incubation" />
              </RadioGroup>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Upload a detailed business proposel"
              name='businessProposel'
              multiline
              rows={4}
              className='homeTextBox'
              onChange={handleOnchange}
            />
          </Grid>


          <Button variant="contained" sx={{ mt: 5, marginLeft: 'auto', marginRight: 'auto' }} className='submitbtn' onClick={handleSubmit}  > Apply </Button>

        </Grid>


      </div>
    </div>
  )

}

export default UserHome
