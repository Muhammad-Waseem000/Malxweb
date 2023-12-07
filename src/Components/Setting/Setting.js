// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';
// import Ctitle from '../Ctitle/Ctitle';
// import { Link } from 'react-router-dom';
// import { UserContext, UserInfo } from '../Signin/Signin';

// const Setting = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [alerts, setAlerts] = useState([]);

//   const passwordHash = CryptoJS.SHA256(password).toString();



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const storedUserEmail = localStorage.getItem("userEmail");

//     const data = {
//       old_email: storedUserEmail,
//       email,
//       name,
//       password: passwordHash,
//       phone,
//     };

//     try {
//       const response = await axios.post('https://abidali1999063.pythonanywhere.com/update_account', data);
//       console.log(response.data);
//       console.log(response.status);
//       localStorage.setItem("userEmail", email);

//       // Display success message
//       setAlerts([{ variant: 'success', message: 'Account updated successfully!' }]);
//     } catch (error) {
//       console.error('Error updating account:', error);

//       // Display error message
//       setAlerts([{ variant: 'danger', message: 'Error updating account. Please try again.' }]);
//     }
//   };

import React, { useState, useContext } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Ctitle from '../Ctitle/Ctitle';
import './Setting.css';
import { Link } from 'react-router-dom';
import { UserContext, UserInfo } from '../Signin/Signin';

const Setting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [alerts, setAlerts] = useState([]);

  const validateName = (input) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(input);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input) => {
    // Password should have at least 8 characters, including one uppercase, one lowercase, one special character, and one numeric character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,11}$/;
    return passwordRegex.test(input);
  };

  const validatePhone = (input) => {
    // Phone number should not be more than 11 digits.
    const phoneRegex = /^\d{1,11}$/;
    return phoneRegex.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUserEmail = localStorage.getItem("userEmail");

    // Validate inputs
    if (!validateName(name)) {
      setAlerts([{ variant: 'danger', message: 'Invalid name. Name should only contain letters.' }]);
      return;
    }

    if (!validateEmail(email)) {
      setAlerts([{ variant: 'danger', message: 'Invalid email format.' }]);
      return;
    }

    if (!validatePassword(password)) {
      setAlerts([{ variant: 'danger', message: 'Invalid password. Check password requirements.' }]);
      return;
    }

    if (!validatePhone(phone)) {
      setAlerts([{ variant: 'danger', message: 'Invalid phone number. Phone number should not be more than 11 digits.' }]);
      return;
    }

    const passwordHash = CryptoJS.SHA256(password).toString();

    const data = {
      old_email: storedUserEmail,
      email,
      name,
      password: passwordHash,
      phone,
    };

    try {
      const response = await axios.post('https://abidali1999063.pythonanywhere.com/update_account', data);
      console.log(response.data);
      console.log(response.status);
      localStorage.setItem("userEmail", email);

      // Display success message
      setAlerts([{ variant: 'success', message: 'Account updated successfully!' }]);
    } catch (error) {
      console.error('Error updating account:', error);

      // Display error message
      setAlerts([{ variant: 'danger', message: 'Error updating account. Please try again.' }]);
    }
  };
  return (
    <>

      <Ctitle title="Setting" />
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <div className='updateaccount'>
              <form onSubmit={handleSubmit}>
                <center>
                  <h3 className='mt-5 updatetitle'>Update Your Account Info</h3>
                </center>
                <input type='text' className='form-control' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='email' className='form-control mt-3' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' className='form-control mt-3' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='number' className='form-control mt-3' placeholder='Enter phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type='submit' className='btn btn-dark mt-3 mb-3' value="Update" />
              </form>
              {/* {alert &&  <div className="alert alert-success" role="alert">{alert.message}</div>} */}
              {alerts.map((alert, index) => (
                <div key={index} className={`alert alert-${alert.variant}`}>
                  {alert.message}
                </div>
              ))}

            </div>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>

    </>
  )
}

export default Setting
