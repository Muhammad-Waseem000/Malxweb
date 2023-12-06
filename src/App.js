import logo from './logo.svg';
// import React from 'react';

import './App.css';
import { Routes, Route } from "react-router-dom"
import Befornav from './Components/Befornav';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signin from './Components/Signin/Signin';
import Dashboard from './Components/Dashboard/Dashboard';
import Footer from './Components/Footer';
import Signup from './Components/Signup/Signup';
import Forgot from './Components/Forgotpassword/Forgot';
import Fileupload from './Components/Fileupload/Fileupload';
import Directoryscan from './Components/Directoryscan/Directoryscan';
import Help from './Components/Help/Help';
import Setting from './Components/Setting/Setting';
import Feedback from './Components/Feedback/Feedback';
import Cresult from './Components/Cresult/Cresult';
import Qthreats from './Components/Qthreats/Qthreats';
import Scanhistory from './Components/Scanhistory/Scanhistory';

function App() {

  const path=window.location.pathname;
//   const [userEmail, setUserEmail] = React.useState('');

  return (
   <>
<Befornav />
<Navbar />
   <Routes>
        <Route path="/" element={ <Home /> } />
        {/* <UserContext.Provider value={{ userEmail, setUserEmail }}> */}
        <Route path="/signin" element={ <Signin /> } />
        <Route path="/setting" element={ <Setting /> } />

        {/* </UserContext.Provider> */}

        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/forgot" element={ <Forgot /> } />
        <Route path="/fileupload" element={ <Fileupload /> } />
        <Route path="/directoryscan" element={ <Directoryscan /> } />
        <Route path="/openhelp" element={ <Help /> } />
        <Route path="/feedback" element={ <Feedback /> } />
        <Route path="/classfication" element={ <Cresult /> } />
        <Route path="/Qthreats" element={ <Qthreats /> } />
        <Route path="/scanhistory" element={ <Scanhistory /> } />
        
    </Routes>

<Footer />
   

   </>
  );
}

export default App;
