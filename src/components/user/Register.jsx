import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import {useNavigate} from 'react-router-dom'
const Register = () => {
  const {register} = useContext(AppContext)
  const navigate =useNavigate()
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler =(e)=>
  {
   const {name,value} = e.target
   setFormData({...formData,[name]:value})
  }
  const {name,email,password} = formData
  const submitHandler =async (e)=>
  {
    e.preventDefault()
    const result = await register({name,email,password})
    if (result.success) {
      navigate('/login');
    }
    
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center mb-4 text-primary">User Register</h2>
        <form onSubmit={submitHandler}>
        <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Name
            </label>
            <input
            value={formData.name}
            onChange={onChangeHandler}
            name='name'
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your email"
            />
          </div>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
