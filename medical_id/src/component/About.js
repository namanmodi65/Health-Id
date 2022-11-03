import React, { useState, useEffect } from 'react'
import about from './About.module.css'
import { useNavigate } from 'react-router-dom'
import home from './user.jpg'


function About() {

  const [information, setInformation] = useState([])


  const host = 'http://localhost:3001'
  const navigate = useNavigate()
  //-----------------------------------------------------------------------
  const getInfo = async () => {
    let response = await fetch(`${host}/api/auth/getinfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    let parsedData = await response.json()
    setInformation(parsedData)
    // console.log(parsedData)

  }
  //-----------------------------------------------------------------------


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getInfo()
    }
    else {
      navigate('/login')
    }

  }, [])

  return (
    <div className={about.container}>
      <div className={about.about}>

        <div className={about.photo}>
          <img src={home} alt="" width={200} />
        </div>


        <div className={about.name}>
          <h1>{information.name}</h1>
        </div>
        <div className={about.detail}>
          <h4><i className="fa fa-envelope"></i> Email id :- {information.email}</h4>
          <h4><i className="fa fa-phone"></i> Phone no :- +91 {information.phone}</h4>
          <h4><i className="fa fa-person"></i> Blood group :- {information.blood_group}</h4>
        </div>
      </div>
    </div>
  )
}

export default About
