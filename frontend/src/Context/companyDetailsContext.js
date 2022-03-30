import React, {createContext,useState} from 'react'

export const companyContext = createContext(null)

export default function Context({children}){

    const [companyDetails,setCompanydetails] = useState('');

    return(
    <companyContext.Provider value={{companyDetails,setCompanydetails}}>

        {children}

    </companyContext.Provider>
    )
}
