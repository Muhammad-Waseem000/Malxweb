import React, { useState } from 'react';
import './Feedback.css';
import Ctitle from '../Ctitle/Ctitle';

function Feedback() {
  const [formData, setFormData] = useState({
    email: '',
    comment: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Validate date (you can add more specific validation if needed)
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    // Validate comment
    if (!formData.comment) {
      newErrors.comment = 'Feedback is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('https://abidali1999063.pythonanywhere.com/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(data); // You can use the response data as needed
        console.log(response.status); // Status code

        // Set isSubmitted to true when feedback is successfully submitted
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };



  return (
    <>
      <Ctitle title="Feedback" />

      <div className='container'>
        <div className='row'>
          <div className='col-md-12' style={{ textAlign: "center" }}>
            <h3 style={{ marginTop: "20px", fontWeight: "bold" }}>Please Provide Your Feedback <br /> Your Feedback is Important for us</h3>
          </div>

          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
              {isSubmitted ? (

                <div className="alert alert-success" role="alert">
                  <p>Feedback is submitted</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="useremail" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="useremail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Feedback</label>
                    <textarea
                      className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                      id="exampleFormControlTextarea1"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      rows="10"
                    ></textarea>
                    {errors.comment && <div className="invalid-feedback">{errors.comment}</div>}
                    <button className='btn btn-dark mt-3'>Submit</button>
                  </div>
                </form>
              )}
            </div>
            <div className='col-md-3'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
