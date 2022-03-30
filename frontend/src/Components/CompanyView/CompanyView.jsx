import React, { useEffect, useContext, useState } from 'react'
import { Grid } from '@mui/material'
import './Companyview.css'
import { companyContext } from '../../Context/companyDetailsContext'

function CompanyView() {

    const { companyDetails } = useContext(companyContext)
    const [data, setData] = useState(null)


    useEffect(() => {
      localStorage.setItem('companyDetails',companyDetails)

      const details = localStorage.getItem('companyDetails')
      setData(details)
      return ()=>{
       localStorage.removeItem("companyDetails")
      }
    }, [])
    return (
        <div className='outbox'>


            <Grid container spacing={4} >


                <Grid item xs={3}>
                    <h4>Name:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.name}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>Address:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.address}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>City:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.city}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>State:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.state}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>Email:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.email}</h4>
                </Grid>
                <Grid item xs={3}>
                    <h4>Phone:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.phone}</h4>
                </Grid>

                <Grid item xs={3}>
                    <h4>Company Name:</h4>
                </Grid>
                <Grid item xs={9}>
                    <h4>{data.companyName}</h4>
                </Grid>


            </Grid>

        </div>
    )
}

export default CompanyView
