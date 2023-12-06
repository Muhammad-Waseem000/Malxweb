import React from 'react'
import './Dashboard.css'
import verified from '../../assets/icons/verified.png';
import fileupload from '../../assets/icons/file.png';
import directoryscan from '../../assets/icons/qr-code-scan.png';
import progress from '../../assets/icons/progress.png';
import classification from '../../assets/icons/data-visualization.png';
import setting from '../../assets/icons/settings.png';
import Help from '../../assets/icons/question.png';
import Feedback from '../../assets/icons/feedback.png';
import protection from '../../assets/icons/protection.png'
import { Link ,Navigate,useNavigate } from 'react-router-dom';


function Dashboard() {

    const userEmail = localStorage.getItem("userEmail");

     // Create a history object to navigate
     const navigate = useNavigate();

     // Function to handle logout
     const handleLogout = () => {
         // Clear user email from localStorage
         localStorage.removeItem("userEmail");
 
         // Redirect to the login page
         navigate('/signin'); // Replace '/login' with the actual path of your login page
     };
    return (
        <div>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-4' style={{ textAlign: "right" }}>
                                <img src={verified} style={{ width: "20%" }} />
                            </div>
                            <div className='col-md-8'>
                            <h3 style={{ fontWeight: "bold" }}>Welcome, {userEmail}!</h3>
                                <h3 style={{ fontWeight: "bold" }}>YOUR DEVICE IS PROTECTED <br></br>SOME SYSTEM ISSUES REQUIRE YOUR ATTENTION</h3>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 iconsbox'>
                        <Link to="/fileupload">
                            <div className='ibox'>
                                <img src={fileupload} />
                                <p>File Upload</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-4 iconsbox'>
                        <Link to="/directoryscan">
                            <div className='ibox'>
                                <img src={directoryscan} />
                                <p>Directory Scan</p>
                            </div>
                        </Link>
                    </div>

                    <div className='col-md-4 iconsbox'>
                        {/* <Link>
                    <div className='ibox'>
                        <img src={progress}/>
                        <p>Progress Monitoring</p>
                    </div>
                    </Link> */}
                        <Link to="/classfication">
                            <div className='ibox'>
                                <img src={classification} />
                                <p>Classification Result</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='row' style={{ marginBottom: "50px" }}>
                    <div className='col-md-4 iconsbox'>
                        {/* <Link to="/Qthreats">
                            <div className='ibox'>
                                <img src={protection} alt='protection' />
                                <p>Quarantined Threats</p>
                            </div>
                        </Link> */}
                        <Link to="/setting">
                            <div className='ibox'>
                                <img src={setting} />
                                <p>Setting</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-4 iconsbox'>
                    <Link to="/openhelp">
                            <div className='ibox'>
                                <img src={Help} />
                                <p>Help</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col-md-4 iconsbox'>
                    <Link to="/feedback">
                                <div className='ibox'>
                                    <img src={Feedback} />
                                    <p>Feedback</p>
                                </div>
                            </Link>
                    </div>
                </div>

                {/* <div className='container'>
                    <div className='row'>
                        <div className='col-md-4'></div>
                        <div className="col-md-4 iconsbox" style={{marginTop:'-50px',marginBottom:'30px'}}>
                            

                        </div>
                        <div className='col-md-4'></div>
                    </div>
                </div> */}

                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12' style={{textAlign:"right"}}>
                        <button className='btn btn-dark mt-2 mb-2' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
