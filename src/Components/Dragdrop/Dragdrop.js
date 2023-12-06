// import React, { useState, useRef } from 'react';
// import './Dragdrop.css';

// function Dragdrop() {

//   const [files, setFiles] = useState(null);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const inputRef = useRef();

//   const handledragover = (event) => {
//     event.preventDefault();
//   };

//   const handledrop = (event) => {
//     event.preventDefault();
//     setFiles(event.dataTransfer.files);
//   };

//     // const handleUpload = () => {
//     //     const formData = new FormData();
//     //     formData.append("Files", files);
//     //     console.log(formData.getAll())
//     //     // fetch(
//     //     //   "link", {
//     //     //     method: "POST",
//     //     //     body: formData
//     //     //   }  
//     //     // )
//     //   };
//     const handleUpload = async () => {
//       if (files && files.length > 0) {
//         const formData = new FormData();
//         formData.append('file', files[0]); // Assuming you want to process the first file
    
//         try {
//           // Send the file to your API for prediction
//           const response = await fetch('https://abidali1999063.pythonanywhere.com/predict', {
//             method: 'POST',
//             body: formData,
//           });
//           console.log(response.status)
//           console.log(response.statusText)
//           console.log(response.text)
    
//           // if (response.ok) {
//           //   // Successfully received a response from the API
//           //   const jsonResponse = await response.json();
//           //   const result = jsonResponse.predicted_class;
//           //   alert(`Predicted class: ${result}`);
//           //   setFiles(null); // Clear the selected file(s) state
//           // } else {
//           //   // Handle API response error
//           //   alert('Prediction failed. Please try again.');
//           // }
//           if (response.ok) {
//             // Successfully received a response from the API
//             const jsonResponse = await response.json();
//             const result = jsonResponse.predicted_class;
          
//             // Create a div element for the success alert
//             const successAlert = document.createElement('div');
//             successAlert.classList.add('alert', 'alert-success');
//             successAlert.setAttribute('role', 'alert');
//             successAlert.innerHTML = `Predicted class: <strong>${result}</strong>`;
            
//             // Append the success alert to the body or any other container element
//             document.body.appendChild(successAlert);
          
//             setFiles(null); // Clear the selected file(s) state
//           } else {
//             // Handle API response error
//             alert('Prediction failed. Please try again.');
//           }
          
//         } catch (error) {
//           // Handle any network or API request errors
//           console.error('API request failed:', error);
//           alert('Prediction request failed. Please try again.');
//         }
//       } else {
//         // No file selected, handle accordingly
//         alert('No file selected for prediction.');
//       }
//     };
    

//     if (files) return(
//         <div className='uploads'>
//             <ul>
//                 {Array.from(files).map((files, idx)=> <li key={idx}>{files.name}</li>)}
//             </ul>
//             <div className="actions">
//             <button onClick={() => setFiles(null)}>Cancel</button>
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//         </div>
//     )
//   return (
//     <>
//       {
//         !files && 
//         <div className='dropzone' onDragOver={handledragover} onDrop={handledrop}>
//             <h3>Drag & Drop files to upload</h3>
//             <h3>Or</h3>
//             <input type='file' multiple onChange={(event)=>setFiles(event.target.files)} hidden 
//             ref={inputRef}/> 
//             <button className='btn btn-dark' onClick={()=>inputRef.current.click()}>Select Files</button>
//         </div>
//       }
//     </>
//   )
// }

// export default Dragdrop


// ... (other imports and code)

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

