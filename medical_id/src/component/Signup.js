import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
// import { json } from 'react-router-dom'
import signupCss from './Signup.module.css'
function Signup() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "",blood_group:"",phone:"" })
  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password,blood_group,phone } = credentials
    const response = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, blood_group,phone})
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      alert("Account created");
    }
    else {
      alert("Invalid Credential")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSignup}>
        <div className={signupCss.body}>
          <div className={signupCss.container}>
            <h1>Sign Up</h1>
            <div className={signupCss.box}>
              <input type="text" id="name" onChange={onChange} name="name" placeholder="Enter your name" />
            </div>
            <div className={signupCss.box}>
              <input type="email" id="email" onChange={onChange} name="email" placeholder="Enter your email" />
            </div>
            <div className={signupCss.box}>
              <input type="text" id="phone" onChange={onChange} name="phone" placeholder="Enter your Phone no." />
            </div>
            <div className={signupCss.box}>
              <input type="text" id="blood_group" onChange={onChange} name="blood_group" placeholder="Blood group" />
            </div>
            <div className={signupCss.box}>
              <input type="password" id="password" onChange={onChange} name="password" placeholder="Password" />
            </div>
            <div className={signupCss.box}>
              <input type="password" id="cpassword" onChange={onChange} name="cpassword" placeholder="Confirm Password" />
            </div>
            <div>
              <div>
                <span>Already have an account ?<Link to='/login'> Login</Link></span>
              </div>
            </div>
            <button className={signupCss.btn}>Sign In</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Signup