import React, { useEffect, useState } from 'react'
import './SlotAllocated.css'


function SlotAllocated() {

    const [slot , setSlot] = useState(null)

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        setSlot(user.slot)
    },[])
  return (
    <div className='maindiv'>
        <img src="https://cdn1.iconfinder.com/data/icons/business-and-finance-flat-2/128/69-512.png" alt="" className='img' />
      <h1>Confirmation</h1>
      <h3 className='smallhdg'>{slot} slot is allocated for you</h3>
    </div>
  )
}

export default SlotAllocated
