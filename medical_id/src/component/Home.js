import React, { useEffect } from 'react'
import Form from './Form'
import homeCss from './Home.module.css'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log("you are loged in")
    }
    else {
      navigate('/login')
    }
  }, [])


  return (
    <>
      <div className={homeCss.container}>
        <div className={homeCss.title}>
          <h1><i class="fa fa-plus"></i>Health Id</h1>
          <h4 className={homeCss.tag}>The first wealth is health</h4>
        </div>
        <Form />
      </div>
    </>
  )
}

export default Home