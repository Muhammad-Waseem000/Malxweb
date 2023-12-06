import React, { useState } from 'react';
import './Forgot.css';
import { Link } from 'react-router-dom';

function Forgot() {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the error for the field when it is being updated
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform your form submission logic here
      console.log('Form is valid. Submitting...');
    } else {
      console.log('Form is invalid. Please correct the errors.');
    }
  };

  return (
    <div style={{ height: "calc(100vh-93px-304px)" }}>
      <div className='container' >
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4 signinheading'>
            <h1>Recover Your Account</h1>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label className='form-label'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className='text-danger'>{errors.email}</div>}
              </div>

              <div className='row' style={{ marginBottom: '20px' }}>
                <div className='col-md-12'>
                  <button type='submit' className='btn btn-dark'>
                    Back to Login
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  )
}

export default Forgot
