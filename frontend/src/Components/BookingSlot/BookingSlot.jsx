import React, { useEffect, useState } from 'react'
import { Box, Paper, Divider } from '@mui/material'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import './BookingSlot.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerURL } from '../../Constants/Constants'

function BookingSlot() {

   const navigate = useNavigate()
   const [slotsA, setSlotsA] = useState([])
   const [slotsB, setSlotsB] = useState([])
   const [slotsC, setSlotsC] = useState([])
   const [slotsD, setSlotsD] = useState([])
   const [slotsE, setSlotsE] = useState([])

   const [open, setOpen] = useState(false);
   const [selectedSlot, setSelectedtSlot] = useState(null)
   const [selectedCompany, setSelectedCompany] = useState(null)
   const [companies, setCompanies] = useState([])
   const [errMsg , setErrMsg] = useState(null)

   const handleClose = () => setOpen(false);

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };

   useEffect(() => {
      let admin = localStorage.getItem("admin")
      if (!admin) {
         navigate('/admin')
      } else {

         axios.get(`${ServerURL}/admin/getBookingSlots`).then(async (resp) => {
            setSlotsA(resp.data.slotsA)
            setSlotsB(resp.data.slotsB)
            setSlotsC(resp.data.slotsC)
            setSlotsD(resp.data.slotsD)
            setSlotsE(resp.data.slotsE)

            axios.get(`${ServerURL}/admin/getApplications`).then((resp) => {

               setCompanies(resp.data.ActiveCompanies)

            }).catch((err) => {
               console.log(err);
            })

         }).catch((err) => {
            console.log(err);
         })
      }
   },[])

   const bookSlot = () => {
      if (!selectedCompany){
         setErrMsg('Select a company')
      }else{
         setErrMsg(null)
         const bookingData = {
            selectedSlot,
            selectedCompany
         }
         axios.post(`${ServerURL}/admin/bookSlot`,bookingData).then(()=>{
            axios.get(`${ServerURL}/admin/getBookingSlots`).then(async (resp) => {
               setSlotsA(resp.data.slotsA)
               setSlotsB(resp.data.slotsB)
               setSlotsC(resp.data.slotsC)
               setSlotsD(resp.data.slotsD)
               setSlotsE(resp.data.slotsE)
   
               axios.get(`${ServerURL}/admin/getApplications`).then((resp) => {
   
                  setCompanies(resp.data.ActiveCompanies)
                  handleClose()
   
               }).catch((err) => {
                  console.log(err);
               })
   
            }).catch((err) => {
               console.log(err);
            })
            
         }).catch((err)=>{
            console.log(err);
         })
      }
   }




   return (
      <div className='mainDiv'>
         <div className='wrapper'>
            <Box className='box'
               sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '& > :not(style)': {
                     m: 2,
                     width: 70,
                     height: 70,
                     fontSize: 13,
                     padding: 1,
                     color: '#586a87'
                  },
               }}
            >


               {
                  slotsA.map((slot) => (

                     <Paper elevation={3} sx={{ backgroundColor: slot.booked ? 'rgba(0, 0, 0, 0.397)' : '#e1e4e8' }} className={!slot.booked ? 'availableSlot' : ''}
                        onClick={!slot.booked ?
                           () => {
                              setOpen(true)
                              setSelectedtSlot(slot.slot)
                           } : ''}
                     >{slot.slot}</Paper>

                  ))
               }

               <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
               >
                  <Box sx={style}>
                     <Typography id="modal-modal-title" variant="h6" component="h2">
                        Book a slot
                     </Typography>
                     <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Select company
                     </Typography>

                     <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={selectedCompany}
                        onChange={(event, newValue) => {
                           setSelectedCompany(newValue);
                        }}
                        options={companies}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Company" />}
                     />
                     {errMsg ? <p className='errMsg'>Required ! Select a company</p>:''}
                     <Button variant="contained" sx={{ mt: 2 }} onClick={bookSlot} >Book Slot</Button>

                  </Box>
               </Modal>


            </Box>
            <hr className='HorizontalDivider' />
            <hr className='HorizontalDivider' />

            <div className='downslotMain'>
               <div className='downslots'>

                  <Box className='box'
                     sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                           m: 2,
                           width: 70,
                           height: 70,
                           fontSize: 13,
                           padding: 1,
                           color: '#586a87'
                        },
                     }}
                  >

                     {
                        slotsB.map((slot) => (

                           <Paper elevation={3} sx={{ backgroundColor: slot.booked ? 'rgba(0, 0, 0, 0.397)' : '#e1e4e8' }} className={!slot.booked ? 'availableSlot' : ''}
                              onClick={!slot.booked ? () => {
                                 setOpen(true)
                                 setSelectedtSlot(slot.slot)
                              }
                                 : ''} >{slot.slot}</Paper>

                        ))
                     }

                  </Box>
               </div>
               <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 4, backgroundColor: '#ced6de' }} />
               <div className='downslots'>

                  <Box className='box'
                     sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                           m: 2,
                           width: 70,
                           height: 70,
                           fontSize: 13,
                           padding: 1,
                           color: '#586a87'
                        },
                     }}
                  >


                     {
                        slotsC.map((slot) => (

                           <Paper sx={{ backgroundColor: slot.booked ? 'rgba(0, 0, 0, 0.397)' : '#e1e4e8' }} className={!slot.booked ? 'availableSlot' : ''}
                              onClick={!slot.booked ?
                                 () => {
                                    setOpen(true)
                                    setSelectedtSlot(slot.slot)
                                 }
                                 : ''} elevation={3} >{slot.slot}</Paper>

                        ))
                     }

                  </Box>
               </div>

               <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 4, backgroundColor: '#ced6de' }} />

               <div className='downslots'>

                  <Box className='box'
                     sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                           m: 2,
                           width: 70,
                           height: 70,
                           fontSize: 13,
                           padding: 1,
                           color: '#586a87'
                        },
                     }}
                  >


                     {
                        slotsD.map((slot) => (

                           <Paper elevation={3} sx={{ backgroundColor: slot.booked ? 'rgba(0, 0, 0, 0.397)' : '#e1e4e8' }} className={!slot.booked ? 'availableSlot' : ''}
                              onClick={!slot.booked ?
                                 () => {
                                    setOpen(true)
                                    setSelectedtSlot(slot.slot)
                                 }
                                 : ''}  >{slot.slot}</Paper>

                        ))
                     }

                  </Box>
               </div>

               <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 4, backgroundColor: '#ced6de' }} />


               <div className='downslots'>

                  <Box className='box'
                     sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                           m: 2,
                           width: 75,
                           height: 75,
                           fontSize: 13,
                           padding: 1,
                           color: '#586a87'
                        },
                     }}
                  >

                     {
                        slotsE.map((slot) => (

                           <Paper elevation={3} sx={{ backgroundColor: slot.booked ? 'rgba(0, 0, 0, 0.397)' : '#e1e4e8' }} className={!slot.booked ? 'availableSlot' : ''}
                              onClick={!slot.booked ?
                                 () => {
                                    setOpen(true)
                                    setSelectedtSlot(slot.slot)
                                 }
                                 : ''}  >{slot.slot}</Paper>

                        ))
                     }

                  </Box>
               </div>


            </div>
         </div>
      </div>
   )
}

export default BookingSlot
