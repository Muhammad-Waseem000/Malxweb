import React, { useState, useRef } from 'react';
import './Dragdrop.css';

function Dragdrop() {
  const [files, setFiles] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [result, setResult] = useState(null);  // Add this line
  const inputRef = useRef();
  const [errorAlert, setErrorAlert] = useState(false);


  // ... (other functions)

  const handledragover = (event) => {
    event.preventDefault();
  };

  const handledrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    
  };

  const handleUpload = async () => {
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]); // Assuming you want to process the first file
      if (files[0].name.endsWith('.dll')||files[0].name.endsWith('.exe')||files[0].name.endsWith('.pdf')||files[0].name.endsWith('.html')){

      
      try {
        const response = await fetch('https://abidali1999063.pythonanywhere.com/predict', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          const result = jsonResponse.predicted_class;
          setShowSuccessAlert(true);
          setResult(result);  // Add this line
          setFiles(null);
        } else {
          // alert('Prediction failed. Please try again.');
          setErrorAlert(true);
        }
      } catch (error) {
        console.error('API request failed:', error);
        alert('Prediction request failed. Please try again.');
      }
    }
    else{
      alert('File Format not supported');
    }
    } else {
      alert('No file selected for prediction.');
    }
  };

  return (
    <>
      {showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          Predicted class: <strong>{result}</strong>
        </div>
      )}
      {errorAlert && (
        <div className="alert alert-danger" role="alert">
          Prediction failed. Please try again.
        </div>
      )}
      {!files && (
        <div className="dropzone" onDragOver={handledragover} onDrop={handledrop}>
          <h3>Drag & Drop files to upload</h3>
          <h3>Or</h3>
          <input
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            ref={inputRef}
          />
          <button className="btn btn-dark" onClick={() => inputRef.current.click()}>
            Select Files
          </button>
        </div>
      )}
      {files && (
        <div className="uploads">
          <ul>
            {Array.from(files).map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
          <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dragdrop;

