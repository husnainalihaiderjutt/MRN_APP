import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const {login} = useContext(AppContext)
  const navigate =useNavigate()
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const onChangeHandler =(e)=>
  {
   const {name,value} = e.target
   setFormData({...formData,[name]:value})
  }
  const {email,password} = formData
  const submitHandler =async (e)=>
  {
    e.preventDefault()
    const result = await login({email,password})
    if (result.success) {
      navigate('/');
      
    } 
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary">User Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              value={formData.email}
              onChange={onChangeHandler}
            name='email'
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={formData.password}
              onChange={onChangeHandler}
            name='password'
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
