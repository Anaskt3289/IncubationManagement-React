import React , {useState , useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {ServerURL} from '../../Constants/Constants'

function RecordTrack() {

  const navigate = useNavigate()
  const [applications ,setApplications] = useState([])

  useEffect(() => {
    let admin = localStorage.getItem("admin")
    if (!admin) {
      navigate('/admin')
    } else {

      axios.get(`${ServerURL}/admin/getApplications`).then((resp) => {
      
        setApplications(resp.data.ALL)

      }).catch((err) => {
        console.log(err);
      })
    }
  }, [])

  return (
    <TableContainer component={Paper} className='tableContainer' >

    <h3 className='tableheading'>Record Track</h3>
  <Table sx={{ minWidth: 650,mb:6 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>SI No</TableCell>
        <TableCell>Company Name</TableCell>
        <TableCell>Company Details</TableCell>
        <TableCell>Registration Approved</TableCell>
        <TableCell>Under Process</TableCell>
        <TableCell>Approved</TableCell>
        
      </TableRow>
    </TableHead>
    <TableBody>
      {applications.map((data,index) => (
        <TableRow
          key={data._id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">{parseInt(index) + 1} </TableCell>
          <TableCell>{data.companyName}</TableCell>
          <TableCell >{data.address} , {data.city}, {data.state}</TableCell>
          <TableCell colSpan={3}>
          <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={data.status==='new' ? 15 :
           data.status === 'pending' ? 60 : 100
           } />
    </Box>
    </TableCell>
          
        </TableRow>
       ))} 
    </TableBody>
  </Table>

  </TableContainer>
  )
}

export default RecordTrack
