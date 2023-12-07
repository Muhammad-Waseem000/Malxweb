import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Regular expression to validate the email format
    const emailPattern = /^[a-zA-Z0-9.,_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

    if (!emailPattern.test(email)) {
      setAlert({ type: 'danger', message: 'Invalid email format' });
      return;
    }

      // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,11}$/;
    if (!passwordRegex.test(password)) {
        setAlert({
          type: 'danger',
          message: 'Password should be 8 to 11 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one numeric character.',
        });
        return;
      }

    const api_url = 'https://abidali1999063.pythonanywhere.com/login_api';

    try {
      const response = await axios.post(api_url, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('userEmail', email);
        console.log('Login successful');
        setAlert({ type: 'success', message: 'Login successful' });
        navigate('/dashboard');
      } else {
        console.error('Authentication failed. Please check your credentials.');
        setAlert({
          type: 'danger',
          message: 'Authentication failed. Please check your credentials.',
        });
      }
    } catch (error) {
      console.error("Invalid Username or Password");
      setAlert({ type: 'danger', message: `Invalid Username or Password` });
    }
  };

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [alert, setAlert] = useState({});
  // const navigate = useNavigate();

  // const handleLogin = async () => {
  //   // Regular expression to validate the email format
  //   const emailPattern = /^[a-zA-Z0-9.,_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  //   if (!emailPattern.test(email)) {
  //     setAlert({ type: 'danger', message: 'Invalid email format' });
  //     return;
  //   }

    // // Password validation
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,11}$/;
    // if (!passwordRegex.test(password)) {
    //   setAlert({
    //     type: 'danger',
    //     message: 'Password should be 8 to 11 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one numeric character.',
    //   });
    //   return;
    // }

  //   const api_url = 'https://abidali1999063.pythonanywhere.com/login_api';

  //   try {
  //     const response = await axios.post(api_url, {
  //       email,
  //       password,
  //     });

  //     if (response.status === 200) {
  //       localStorage.setItem('userEmail', email);
  //       console.log('Login successful');
  //       setAlert({ type: 'success', message: 'Login successful' });
  //       navigate('/dashboard');
  //     } else {
  //       console.error('Authentication failed. Please check your credentials.');
  //       setAlert({
  //         type: 'danger',
  //         message: 'Authentication failed. Please check your credentials.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error.message);
  //     setAlert({ type: 'danger', message: `An error occurred: ${error.message}` });
  //   }
  // };


  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4 signinheading'>
            <h1>Login Your Account</h1>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}

                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${alert.message ? 'is-invalid' : ''}`}
                  id="exampleInputPassword1"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  name="rememberMe"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              {/* {error && <div className="alert alert-danger">{error}</div>} */}
              {alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              )}
              <div className="row" style={{ marginBottom: '20px' }}>
                <div className="col-md-6">
                  <Link type="submit" className="btn btn-dark" onClick={handleLogin}>
                    Login
                  </Link>
                  <br />
                  <Link to="/forgot">Forgot Password</Link>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                  <Link type="submit" className="btn btn-outline-dark" to="/signup">
                    Signup
                  </Link>
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

export default Signin
