import React, { useState } from 'react';
import './Signup.css';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [alert, setAlert] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   if (name === 'email') {
  //     // Validate email format
  //     const emailRegex = /^[a-zA-Z1-9.,_-]+@[a-zA-Z1-9]+\.[a-zA-Z]{2,}$/;
  //     if (!emailRegex.test(value)) {
  //       setAlert({
  //         message: 'Invalid email format.',
  //         type: 'danger',
  //       });
  //       return;
  //     }
  //   }

  //   if (name === 'password' && (value.length < 8 || value.length > 11)) {
  //     setAlert({
  //       message: 'Password must be between 8 and 11 characters.',
  //       type: 'danger',
  //     });
  //   } else {
  //     // Validate password constraints
  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,11}$/;
  //     if (name === 'password' && !passwordRegex.test(value)) {
  //       setAlert({
  //         message:
  //           'Password must be 8-11 characters long, and include at least one uppercase letter, one lowercase letter, one special character, and one numeric character.',
  //         type: 'danger',
  //       });
  //     } else {
  //       setAlert(null);
  //       setFormData({ ...formData, [name]: value });
  //     }
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'firstName' || name === 'lastName') {
      // Validate only upper case and lowercase letters
      const nameRegex = /^[a-zA-Z]+$/;
      if (!nameRegex.test(value)) {
        setAlert({
          message: 'First and last names should only contain letters.',
          type: 'danger',
        });
        return;
      }
    } else if (name === 'email') {
      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{3,4}$/;
      if (!emailRegex.test(value)) {
        setAlert({
          message: 'Invalid email format.',
          type: 'danger',
        });
        return;
      }
    } else if (name === 'password') {
      // Validate password constraints
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,11}$/;
      if (!passwordRegex.test(value)) {
        setAlert({
          message:
            'Password must be 8-11 characters long, and include at least one uppercase letter, one lowercase letter, one special character, and one numeric character.',
          type: 'danger',
        });
        return;
      }
    } else if (name === 'phone') {
      // Validate phone number length
      if (value.length > 11) {
        setAlert({
          message: 'Phone number should not be more than 11 digits.',
          type: 'danger',
        });
        return;
      }
    }
  
    // Clear alert and update form data
    setAlert(null);
    setFormData({ ...formData, [name]: value });
  }



  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, phone } = formData;

    if (password !== confirmPassword) {
      showAlert("Password mismatch. Please check your passwords.", "danger");
      return;
    }

    // Perform password hashing using bcryptjs
    // const saltRounds = 10;
    // const passwordHash = await bcrypt.hash(password, saltRounds);

    const passwordHash = CryptoJS.SHA256(password).toString();

    // Construct data object
    const data = {
      name: `${firstName && lastName ? `${firstName} ${lastName}` : ''}`,
      email,
      password: passwordHash,
      phone,
    };

    console.log('Data to be sent:', data); // Add this line for debugging

    try {
      const apiURL = 'https://abidali1999063.pythonanywhere.com/signup_api_web';
      const response = await axios.post(apiURL, data);

      console.log(response.status);
      console.log(response.data);

      if (response.status === 201) {
        showAlert("Sign Up Successful. You have successfully signed up.", "success");
        // You can add navigation or other logic here
      } else {
        showAlert("Sign Up Error: " + response.data, "danger");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      showAlert("An error occurred during sign up.", "danger");
    }
  };


  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6 signinheading'>
            <h1>Create A New Account</h1>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <form>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label htmlFor='firstName' className='form-label'>
                      First Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                    />

                  </div>
                  <div className='col-md-6'>
                    <label htmlFor='lastName' className='form-label'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                    />


                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email"
                      className="form-control"
                      id='email'
                      name='email'
                      // value={formData.email}
                      onChange={handleChange}
                    />

                  </div>
                  <div className='col-md-6'>
                    <label for="exampleInputEmail1" className="form-label">Password</label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      name='password'
                      // value={formData.password}
                      onChange={handleChange}
                    />
                    {/* {alert && alert.type === 'danger' && (
                      <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                      </div>
                    )} */}

                  </div>
                </div>

                <div className='row'>
                  <div className='col-md-6'>
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="cpassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />



                  </div>
                  <div className='col-md-6'>
                    <label htmlFor="number" className="form-label">Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      id='number'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>


                {/* {alertMessage && (
                  <div className={`alert alert-${alertType} mt-3`} role="alert">
                    {alertMessage}
                  </div>
                )} */}
                {alert && (
                  <div className={`alert alert-${alert.type} mt-3`} role="alert">
                    {alert.message}
                    <button type="button" className="close" aria-label="Close" onClick={clearAlert}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                <div className='row' style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <div className='col-md-6' style={{ textAlign: 'right' }}>
                    <button type='button' className='btn btn-dark' onClick={handleSubmit}>
                      Create An Account
                    </button>
                  </div>
                  <div className='col-md-6'>
                    <Link className='btn btn-outline-dark' to='/signin'>
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Signup
