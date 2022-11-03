import React,{useState} from 'react'
import loginCss from './Login.module.css'
import {Link, useNavigate} from 'react-router-dom'

function Login() {
  const [credentials, setCredentials] = useState({email:"",password:""})
  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:3001/api/auth/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password })
    })
    const json = await response.json()
    console.log(json)
    // console.log(json.authToken)
    if(json.success){
      localStorage.setItem('token',json.authToken)
      alert("loged in");
      navigate('/')
    }
    else{
      alert("Wroung details")
    }
  }

const onChange = (e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}


  return (
    <>
    <form onSubmit={handleLogin}>
    <div className={loginCss.body}>
    <div className={loginCss.container}>
        <h1>Log In</h1>
        <div className={loginCss.box}>
            <input type="email" id="email" onChange={onChange} name="email" placeholder="Enter your email"/>
        </div>
        <div className={loginCss.box}>
            <input type="password" id="password"  onChange={onChange} name="password" placeholder="Enter your password"/>
        </div>
        <div>
            <span>Don't have an account ?<Link to='/signup'> Signup</Link></span>
        </div>
        <button className={loginCss.btn}>Sign In</button>
    </div>
  </div>
  </form>
  </>
  )
}

export default Login