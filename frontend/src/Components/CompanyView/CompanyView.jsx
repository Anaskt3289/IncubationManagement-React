import React, { useState, useEffect, useContext } from 'react'
import { Grid } from '@mui/material'
import './Companyview.css'
import axios from 'axios'
import { ServerURL } from '../../Constants/Constants'
import { companyContext } from '../../Context/companyDetailsContext'

function CompanyView() {

    const { companyDetails } = useContext(companyContext)
    const [data , setData] = useState(null)

    useEffect(() => {
      localStorage.setItem('companyDetails',companyDetails)

      return{
    // localStorage.removeItem("admin")
      }
    }, [])
    return (
        <div className='outbox'>


            <Grid container spacing={4} >


                <Grid item xs={3}>
                    <h4>Name:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.name}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>Address:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.address}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>City:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.city}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>State:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.state}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>Email:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.email}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>Phone:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.phone}</h4>
                </Grid>

                <Grid item xs={3}>
                    <h4>Company Name:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{companyDetails.companyName}</h4>
                </Grid>


            </Grid>

        </div>
    )
}

export default CompanyView
