import React, { useState, useRef, useEffect } from 'react';
import './Directoryscan.css';
import searchfile from '../../assets/icons/search-file.png';
import { Link } from 'react-router-dom';
import Ctitle from '../Ctitle/Ctitle';

function Directoryscan() {
  const fileInputRef = useRef(null);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [predictionResults, setPredictionResults] = useState({});
  const [validFilePaths, setValidFilePaths] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErorAlert] = useState(false);

  const opendirectory = () => {
    fileInputRef.current.click();
  };

  const handleDirectoryChange = (event) => {
    const files = event.target.files;
    console.log("total files: ", files.length)
    if (files.length > 0) {
      const directoryPath = files[0].webkitRelativePath;
      setSelectedDirectory(directoryPath);

      // Get the list of valid file paths
      const fileList = Array.from(files);
      const maxFileSize = 3 * 1024 * 1024;

      const validFiles = fileList.filter(
        (file) =>
          (file.name.endsWith('.dll') || file.name.endsWith('.exe')) &&
          file.size <= maxFileSize
      );

      const validPaths = validFiles.map((file) => URL.createObjectURL(file));
      setValidFilePaths(validPaths);
    }
    // console.log("valid paths: ",validFilePaths.length)

  };
  useEffect(() => {
    // This code will run after the component re-renders
    console.log("valid paths: ", validFilePaths.length);
  }, [validFilePaths]);
  const handleClick = async () => {
    if (selectedDirectory && validFilePaths.length > 0) {
      setIsLoading(true);
      setProgress(0);
      setPredictionResults({});
      const suspiciousFiles = [];

      const promises = validFilePaths.map(async (filePath, index) => {
        const response = await fetch(filePath);
        const blob = await response.blob();
        const file = new File([blob], blob.name || `unknownFileName_${index}`);
        await createAndSendByteplot(file, index);

        if (
          predictionResults[file.name] &&
          predictionResults[file.name] !== 'benign'
        ) {
          suspiciousFiles.push(filePath);
        }
      });

      try {
        // Wait for all predictions to complete
        await Promise.all(promises);
      } catch (error) {
        console.error('An error occurred during predictions:', error);
      } finally {
        setIsLoading(false);
        setProgress(100);

        // Display results
        // if (suspiciousFiles.length === 0) {
        //   console.log('Scan complete, no suspicious files found');
        // } else {
        //   console.log('Suspicious files found:', suspiciousFiles);
        // }
        if (suspiciousFiles.length === 0) {
          // No suspicious files found
          // const successAlert = document.createElement('div');
          // successAlert.className = 'alert alert-success';
          // successAlert.setAttribute('role', 'alert');
          // successAlert.innerText = 'Scan complete, no suspicious files found';

          // // Append the alert to the document, or insert it into a specific element
          // document.body.appendChild(successAlert);
          setShowSuccessAlert(true);
        } else {
          // Suspicious files found
          console.log('Suspicious files found:', suspiciousFiles);
          setShowErorAlert(true);
        }

      }
    }
  };

  const createAndSendByteplot = async (file, index) => {
    if (!file.name) {
      console.error('File name is undefined:', file);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(
        'https://abidali1999063.pythonanywhere.com/predict',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPredictionResults((prevResults) => ({
          ...prevResults,
          [file.name]: data.predicted_class,
        }));
      } else {
        console.error('Prediction request failed for file:', file.name);
      }
    } catch (error) {
      console.error('An error occurred during prediction:', error);
    }

    // Update the progress
    // console.log("prev progress: ",prevProgress)
    setProgress((prevProgress) => (prevProgress + 1) * (100 / validFilePaths.length));
  };

   const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Ctitle title="Directory Scan" />
      {showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          Scan complete, no suspicious files found
        </div>
      )}
      {showErrorAlert && (
        <div className="alert alert-danger" role="alert">
          'Suspicious files found:',
        </div>
      )}
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-4' style={{ textAlign: 'center' }}>
            <img src={searchfile} style={{ width: '50%' }} />
            <br />
            <label htmlFor='directoryUpload'>Select Directory</label>
            {/* <input
              type='file'
              id='directoryUpload'
              webkitdirectory='true'
              directory='true'
              ref={fileInputRef}
              onChange={handleDirectoryChange}
            /> */}

            <input
              type="file"
              id='directoryUpload'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleDirectoryChange}
              directory="true"
              webkitdirectory="true"
            />

            <button onClick={handleButtonClick}>Choose Directory</button>

            {selectedDirectory && (
              <div>
                <p>Selected Directory:</p>
                <p>{selectedDirectory}</p>
              </div>
            )}
            {/* <button
              className='btn btn-dark mt-2'
              onClick={handleClick}
              disabled={isLoading}
            >
              Scan
            </button> */}
            {isLoading && (
              <div className='progress' style={{ marginTop: '20px' }}>
                <div
                  className='progress-bar progress-bar-striped progress-bar-animated'
                  role='progressbar'
                  style={{ width: `${progress}%` }}
                  aria-valuenow={progress}
                  aria-valuemin='0'
                  aria-valuemax='100'
                >
                  {Math.round(progress)}%
                </div>
              </div>
            )}
          </div>
          <div className='col-md-4'></div>
        </div>

        <div className='row' style={{ marginTop: '50px', marginBottom: '20px' }}>
          <div className='col-md-6' style={{ textAlign: 'center' }}>
            <button
              className='btn btn-dark'
              style={{ width: '40%' }}
              onClick={handleClick}
              disabled={isLoading}
            >
              Scan
            </button>
          </div>
          <div className='col-md-6' style={{ textAlign: 'center' }}>
            <Link
              className='btn btn-outline-dark'
              style={{ width: '40%' }}
              to='/dashboard'
            >
              BACK
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Directoryscan;




