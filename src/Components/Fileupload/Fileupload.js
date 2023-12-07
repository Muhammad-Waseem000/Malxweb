import React from 'react';
import './FIleupload.css';
import scanner from '../../assets/icons/scanner.png';
import Dragdrop from '../Dragdrop/Dragdrop';
import Ctitle from '../Ctitle/Ctitle';

function Fileupload() {
  return (
    <div>
      <Ctitle title="File Upload"/>
      <div className='container'>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6' style={{textAlign:"center"}}>
                <h1>Virus Scanner</h1>
                <p>Drag and drop suspicious files to detect malware and other breaches for free.Scan any document, image, pdf, or other file types. Make sure your files are safe and free from viruses before you open them with Internxt's zero-knowledge Virus Scanner.</p>
            </div>
            <div className='col-md-3'></div>
        </div>

        <div className='row' style={{marginBottom:"20px"}}>
            <div className='col-md-2'></div>
            <div className='col-md-4'>
                <div className='maxfilesize'>
                  <img src={scanner}/>
                  <p>MAX FILE SIZE OF 4 MB</p>
                </div>
            </div>
            <div className='col-md-4'><Dragdrop /></div>
            <div className='col-md-2'></div>
        </div>
      </div>
    </div>
  )
}

export default Fileupload
