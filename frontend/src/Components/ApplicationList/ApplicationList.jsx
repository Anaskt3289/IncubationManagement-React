import React, { useEffect, useState,useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ApplicationList.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerURL } from '../../Constants/Constants'

import {companyContext} from '../../Context/companyDetailsContext'




function ApplicationList() {


  const [NEW, setNew] = useState([])
  const [PENDING, setPending] = useState([])
  const [refresh ,setRefresh] =useState(false)

  const {setCompanydetails} = useContext(companyContext)
  
  const navigate = useNavigate()

  useEffect(() => {
    let admin = localStorage.getItem("admin")
    if (!admin) {
      navigate('/admin')
    } else {

      axios.get(`${ServerURL}/admin/getApplications`).then((resp) => {
        setNew(resp.data.NEW)
        setPending(resp.data.PENDING)

      }).catch((err) => {
        console.log(err);
      })
    }
  }, [refresh])

  const changeStatus = (applicationId,status)=>{
    console.log(applicationId);
    console.log(status);
    axios.get(`${ServerURL}/admin/changeStatus/${applicationId}/${status}`).then(()=>{

      setRefresh(!refresh)


    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <TableContainer component={Paper} className='tableContainer' >

      <h3 className='tableheading'>New Applicant List</h3>
      <Table sx={{ minWidth: 650, mb: 6 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SI No</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Company Details</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { NEW.length!==0 ? NEW.map((data, index) => (
            <TableRow
              key={data._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{parseInt(index) + 1}</TableCell>
              <TableCell>{data.companyName}</TableCell>
              <TableCell >{data.address} , {data.city}, {data.state}</TableCell>
              <TableCell><Button variant="text" onClick={()=>{
                setCompanydetails(data)
                navigate('/admin/viewCompanyDetails')
                }}>Open</Button></TableCell>
              <TableCell><Button variant="outlined" sx={{ color: 'black' }} onClick={()=>changeStatus(data._id , 'pending')}>Add to Pending</Button></TableCell>
            </TableRow>
          )) :

          <TableRow
          sx={{ '&:last-child td, &:last-child th': { border: 0 ,paddingTop:5 } }}
        >
          <TableCell colSpan={4}  align='center'>NO NEW APPLICATIONS</TableCell>

        </TableRow>

          }
        </TableBody>
      </Table>



      <h3 className='tableheading'>Pending Applicant List</h3>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SI No</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Company Details</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {PENDING.length !== 0 ?
            PENDING.map((data, index) => (
              <TableRow
                key={data._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{parseInt(index) + 1}</TableCell>
                <TableCell>{data.companyName}</TableCell>
                <TableCell >{data.address} , {data.city}, {data.state}</TableCell>
                <TableCell><Button variant="text">Open</Button></TableCell>
                <TableCell><Button variant="outlined" sx={{ color: 'black' }} onClick={()=>changeStatus(data._id , 'active')}>Accept</Button></TableCell>
                <TableCell><Button variant="outlined" sx={{ color: 'black' }} onClick={()=>changeStatus(data._id , 'rejected')}>Reject</Button></TableCell>
              </TableRow>
            )) :
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 ,paddingTop:5 } }}
            >
              <TableCell colSpan={5}  align='center'>NO PENDING APPLICATIONS</TableCell>

            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>




  )
}

export default ApplicationList
