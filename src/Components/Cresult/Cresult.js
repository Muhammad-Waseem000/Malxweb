// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Ctitle from '../Ctitle/Ctitle';

// function Cresult() {
//   const [selectedScan, setSelectedScan] = useState(null);

//   const scanHistory = JSON.parse(localStorage.getItem('scanHistory')) || [];

//   const handleRowClick = (index) => {
//     // Set the selected scan when a row is clicked
//     setSelectedScan(scanHistory[index]);
//     // Open the modal (you can implement this based on your needs)
//     setModalOpen(true);
//   };

//   const [isModalOpen, setModalOpen] = useState(false);

//   const closeModal = () => {
//     // Close the modal
//     setModalOpen(false);
//   };

//   return (
//     <>
//       <Ctitle title="Classification Result" />

//       <div className='container'>
//         <div className='row'>
//           <div className='col-md-12'>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Directory</th>
//                   <th scope="col">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {scanHistory.map((scan, index) => (
//                   <tr key={index} onClick={() => handleRowClick(index)}>
//                     <th scope="row">{index + 1}</th>
//                     <td>{scan.directoryPath}</td>
//                     <td>{scan.dateTime}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {isModalOpen && (
//           <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//             <div className="modal-dialog" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Scan Details</h5>
//                   <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   {selectedScan ? (
//                     <div>
//                       <p><strong>Directory:</strong> {selectedScan.directoryPath}</p>
//                       <p><strong>Date:</strong> {selectedScan.dateTime}</p>
//                       <p><strong>Total Files Scanned:</strong> {selectedScan.totalFilesScanned}</p>
//                       <p><strong>Total Time Taken:</strong> {selectedScan.totalTimeTaken}</p>
//                       <p>
//                         <strong>Threats Found:</strong>
//                         {selectedScan.threatsFound && selectedScan.threatsFound.length > 0
//                           ? selectedScan.threatsFound.join(', ')
//                           : 'No Threats Found'}
//                       </p>
//                       {/* Add this debugging statement to show the entire threatsFound array */}
//                       <p><strong>Threats Found Array:</strong> {JSON.stringify(selectedScan.threatsFound)}</p>
//                     </div>
//                   ) : (
//                     <p>No scan selected</p>
//                   )}
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className='row'>
//           <div className='col-md-6'></div>
//           <div className='col-md-6 mt-3 mb-3' style={{ textAlign: "right" }}>
//             <Link className='btn btn-dark' to="/dashboard">Back</Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cresult;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Ctitle from '../Ctitle/Ctitle';

function Cresult() {
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
    // Retrieve scan history from local storage
    const storedScanHistory = JSON.parse(localStorage.getItem('scanHistory')) || [];
    setScanHistory(storedScanHistory);
  }, []);

  const [selectedScan, setSelectedScan] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRowClick = (index) => {
    // Set the selected scan when a row is clicked
    setSelectedScan(scanHistory[index]);
    // Open the modal
    setModalOpen(true);
  };

  const closeModal = () => {
    // Close the modal
    setModalOpen(false);
  };

  return (
    <>
      <Ctitle title="Classification Result" />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Directory</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {scanHistory.map((scan, index) => (
                  <tr key={index} onClick={() => handleRowClick(index)}>
                    <th scope="row">{index + 1}</th>
                    <td>{scan.directoryPath}</td>
                    <td>{scan.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Scan Details</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {selectedScan && (
                    <div>
                      <p><strong>Directory:</strong> {selectedScan.directoryPath}</p>
                      <p><strong>Date:</strong> {selectedScan.dateTime}</p>
                      <p><strong>Total Files Scanned:</strong> {selectedScan.totalFilesScanned}</p>
                      <p><strong>Total Time Taken:</strong> {selectedScan.totalTimeTaken}</p>
                      <p>
                        <strong>Threats Found:</strong>{' '}
                        {selectedScan.threatsFound && selectedScan.threatsFound.length > 0
                          ? selectedScan.threatsFound.join(', ')
                          : 'No Threats Found'}
                      </p>

                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 mt-3 mb-3" style={{ textAlign: 'right' }}>
            <Link className="btn btn-dark" to="/dashboard">
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cresult;
