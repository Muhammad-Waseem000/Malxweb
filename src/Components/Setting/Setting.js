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

      <div className='container' style={{ marginTop: "20px", marginBottom: "20px" }}>
        <div className='row'>
          <div className='col-md-12'>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general" type="button" role="tab" aria-controls="general" aria-selected="true">General</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="notification-tab" data-bs-toggle="tab" data-bs-target="#notification" type="button" role="tab" aria-controls="notification" aria-selected="false">Notification</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Security</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" type="button" role="tab" aria-controls="account" aria-selected="false">Account</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="about-tab" data-bs-toggle="tab" data-bs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false">About</button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="general-tab">
                {/* genral tab content */}
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "20px", fontWeight: "bold", fontSize: "16px" }}>Application Update</h4>
                      <p>Automatically download and start Updates</p>
                      <button type="button" class="btn btn-outline-dark">Check for Updates</button>
                    </div>
                    <div className='col-md-4' style={{ marginTop: "30px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "20px", fontWeight: "bold", fontSize: "16px" }}>Windows Exproler Setting</h4>
                      <p>Add Malx Options to Window Explroler</p>
                    </div>
                    <div className='col-md-4' style={{ marginTop: "30px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "20px", fontWeight: "bold", fontSize: "16px" }}>Usage and Threat Statistics</h4>
                      <p>Help fight malware by providing usage and threat statistics</p>
                      <Link><b>View Privacy Policy</b></Link>
                    </div>
                    <div className='col-md-4' style={{ marginTop: "30px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <hr />

                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "20px", fontWeight: "bold", fontSize: "16px" }}>Proxy Server</h4>
                      <p>Configure Malx to connect to the internet using a proxy server</p>
                      <hr />
                      <Link className='btn btn-outline-dark'>Restore default settings</Link>
                    </div>
                    <div className='col-md-4' style={{ marginTop: "30px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                </div>
                {/* End General tab content */}
              </div>
              <div class="tab-pane fade" id="notification" role="tabpanel" aria-labelledby="notification-tab">
                {/* Notification tab content */}
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "15px", fontSize: "18px", fontWeight: "bold" }}>Notifications</h4>
                      <p>Show a mothly security summary</p>
                    </div>
                    <div className='col-md-4' style={{ marginTop: "35px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-8'>
                      <p style={{ marginTop: "10px" }}>Show all notification is Windows notification area</p>
                    </div>
                    <div className='col-md-4' style={{ marginTop: "0px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-8'>
                      <p style={{ marginTop: "10px" }}>Close non critical notifications after</p>

                    </div>
                    <div className='col-md-4' style={{ marginTop: "0px", textAlign: "right" }}>
                      <select class="form-select" aria-label="Default select example">
                        <option selected>5 seconds</option>
                        <option value="1">6 seconds</option>
                        <option value="2">7 seconds</option>
                        <option value="3">8 seconds</option>
                        <option value="3">9 seconds</option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "15px", fontSize: "18px", fontWeight: "bold" }}>Marketing Prefrences</h4>
                      <p style={{ marginTop: "10px" }}>Show Promotional Notifications from Malx</p>

                    </div>
                    <div className='col-md-4' style={{ marginTop: "35px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-md-8'>
                      <h4 style={{ marginTop: "15px", fontSize: "18px", fontWeight: "bold" }}>Scan reminder</h4>
                      <p style={{ marginTop: "10px" }}>Get reminded to run a scan when new files or program are downloaded</p>

                    </div>
                    <div className='col-md-4' style={{ marginTop: "35px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-8'>
                      <p style={{ marginTop: "10px" }}>Notify me</p>

                    </div>
                    <div className='col-md-4' style={{ marginTop: "0px", textAlign: "right" }}>
                      <select class="form-select" aria-label="Default select example">
                        <option selected>Weekly recommended</option>
                        <option value="1">Hourly</option>
                        <option value="2">Weekly</option>
                        <option value="3">Every 2 weeks</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-8'>
                      <p style={{ marginTop: "10px" }}>Get notified when a scan hasn't been run after a specified number of days</p>

                    </div>
                    <div className='col-md-4' style={{ marginTop: "0px", textAlign: "right" }}>
                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-8'>
                      <p style={{ marginTop: "10px" }}>Notify me after</p>

                    </div>
                    <div className='col-md-4' style={{ marginTop: "0px", textAlign: "right" }}>
                      <select class="form-select" aria-label="Default select example">
                        <option selected>1 day</option>
                        <option value="1">3 days</option>
                        <option value="2">14 days</option>
                        <option value="3">30 days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
              <div class="tab-pane fade" id="account" role="tabpanel" aria-labelledby="account-tab">
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
                          <input type='submit' className='btn btn-dark mt-3' value="Update" />
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
              </div>

              <div class="tab-pane fade" id="about" role="tabpanel" aria-labelledby="about-tab">
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <h3 className="mt-3" style={{ fontSize: "18px", fontWeight: "bold" }}>Version Information</h3>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-4 mt-70'>
                      <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>Malx Version</h5>
                      <p style={{ marginTop: "20px" }}>4.6.4.286</p>
                      <p><b>Check for updates</b></p>
                      <p><small>Last Updated:10/17/2023         7:53pm</small></p>

                    </div>
                    <div className='col-md-4 mt-70'>
                      <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>Updated Package Version</h5>
                      <p style={{ marginTop: "20px" }}>1.0.76295</p>

                    </div>
                    <div className='col-md-4 mt-70'>
                      <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>COMPONENT PACKAGE VERSION</h5>
                      <p style={{ marginTop: "20px" }}>1.0.2613</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Setting
