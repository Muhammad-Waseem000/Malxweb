import React from 'react';
import './Befornav.css';
import { Link } from 'react-router-dom';

function Befornav() {
  return (
  <>
    {/* <div className='container'>
        <div className='row'>
        <div className='col-md-9'></div>
        <div className='col-md-1' style={{textAlign:"right"}}>
           <Link to="/" className="link-style">Contact Us</Link>
        </div>
        <div className='col-md-1' style={{textAlign:"right"}}>
          <Link to="/" className="link-style">Company</Link>
        </div>
        <div className='col-md-1' style={{textAlign:"right"}}>
        <Link to="/signin" className="link-style">Sign In</Link>
        </div>
        </div>
    </div> */}

<div className="container">
        <div className="row">
            <div className="col">
              
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                    <Link to="/" className="link-style">Contact Us</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li className="nav-item">
                    <Link to="/" className="link-style">Company</Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    </li>
                    <li className="nav-item">
                    <Link to="/signin" className="link-style">Sign In for scanning</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  </>
  )
}

export default Befornav
