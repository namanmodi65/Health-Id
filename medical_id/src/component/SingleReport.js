import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function SingleReport() {
    const location = useLocation()
    // const path = location.pathname.split("http://localhost:3000/myreport/")[2]
    console.log(location.pathname.split("/myreport/")[2])

    useEffect(()=>{

    },[])
  return (
    <div>

    </div>
  )
}

export default SingleReport