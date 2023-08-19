import React, { useState } from 'react';
import "./AppicationForm.css";
import ReCAPTCHA from "react-google-recaptcha";

const Form = () => {

  const [image, setImage] = useState(null);

  const [fileName, setFilename] = useState("No selected file");


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    course: '',
    dob: '',
    gender:'',
    education: [],
    email: '',
    phoneNumber: '',
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    fileName: null,
    // documents: null,
    captcha: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked, files} = event.target;

    if (type === 'checkbox') {
      const updatedEducation = formData.education.includes(value)
        ? formData.education.filter(edu => edu !== value)
        : [...formData.education, value];

      setFormData({
        ...formData,
        education: updatedEducation,
      });


    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });


      files[0] && setFilename(files[0].name);
      if (files) {
        setImage(URL.createObjectURL(files[0]));
      }

    }   
    else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
      <h1>Application Form</h1>
        {/* Candidate Name */}
        <div className="name-div">
        <lable htmlFor="username" className="name-label">
            Candidate Name
          </lable>
          <div className="name">

        <input  className="firstname" placeholder="FistName" type="text" name="firstName" onChange={handleInputChange} value={formData.firstName} required />
        
        <input className="firstname" placeholder="LastName" type="text" name="lastName" onChange={handleInputChange} value={formData.lastName} required />
          </div>
        </div>
        
        {/* Course Applying For */}
        <div className="course-div">
        
        <label className="usercourse">Which Course Are You Applying For:</label>
        <div className="course-option">

        <div className="course">
        <input type="radio" name="course" value="web" onChange={handleInputChange} required />
        <label className="course-span">Web Development</label>
        </div>
        
        <div className="course">
        <input type="radio" name="course" value="mobile" onChange={handleInputChange} />
        <label className="course-span">Mobile App Development</label>
        </div>

        <div className="course">
        <input type="radio" name="course" value="data" onChange={handleInputChange} />
        <label className="course-span">Data Science</label>
        </div>
        </div>
        </div>

        {/* Date of Birth */}
        <div className="course-div">
        <label className="usercourse" >Date of Birth:</label>
        <input    style={{
              color: "#7a9449",
              fontSize: "medium",
              fontFamily: "sans-serif",
              width: "200px",
              height: "3vh",
              outline:"none",
              borderRadius: "4px",
              border: "1px solid #dee2e6",
            }} className="dob" type="date" name="dob" onChange={handleInputChange} value={formData.dob} required />
        </div>

         {/* gender */}
         <div className="course-div">
        
        <label className="usercourse">Gender</label>
        <div className="course-option">

        <div className="course">
        <input type="radio" name="gender" value="male" onChange={handleInputChange} required />
        <label className="course-span">Male</label>
        </div>
        
        <div className="course">
        <input  type="radio" name="gender" value="female" onChange={handleInputChange} />
        <label className="course-span">Female</label>
        </div>

        <div className="course">
        <input type="radio" name="gender" value="other" onChange={handleInputChange} />
        <label className="course-span">Others</label>
        </div>
        </div>
        </div>


        {/* Education */}
        <div className="course-div">
        <label className="usercourse">Education:</label>
        <div className="education">
          
          <div>
        <input type="checkbox" name="education" value="school" onChange={handleInputChange} checked={formData.education.includes('school')} />
        <label style={{ marginLeft: "5px" }}>School</label>
          </div>
        
        <div>
        <input type="checkbox" name="education" value="college" onChange={handleInputChange} checked={formData.education.includes('college')} />
        <label style={{ marginLeft: "5px" }}>College</label>
        </div>
        
        <div>
        <input type="checkbox" name="education" value="university" onChange={handleInputChange} checked={formData.education.includes('university')} />
        <label style={{ marginLeft: "5px" }}>University</label>
        </div>
        </div>
        </div>
        
        {/* Email */}
        
        <div className="course-div">   
        <label className="usercourse">Email:</label>
        <input style={{
              color: "#7a9449",
              fontSize: "medium",
              fontFamily: "sans-serif",
              outline:"none"
            }} placeholder="abc@example.com" className="mail-input" type="email" name="email" onChange={handleInputChange} value={formData.email} required />
        </div>
        
        {/* Phone Number */}
        <div className="course-div">
        <label className="usercourse">Phone Number:</label>
        <input className="mail-input"
            style={{
              color: "#7a9449",
              fontSize: "medium",
              fontFamily: "sans-serif",
              outline:"none",
            }} type="tel" name="phoneNumber" onChange={handleInputChange} value={formData.phoneNumber} required />
        </div>
        
        {/* Address */}
        <div>
        <div className="mb-3">
        <label className=" usercourse">Address:</label>
        <input   placeholder="Street Address" className="form-control" type="text" name="streetAddress" onChange={handleInputChange} value={formData.streetAddress} required />
        </div>

        <div className="mb-3">
        <input className="form-control" type="text" placeholder="Street Address Line 2" name="addressLine2" onChange={handleInputChange} value={formData.addressLine2} />
        </div>

        <div className="mb-3 d-flex ">
        <input className="form-control"  placeholder="City" type="text" name="city" onChange={handleInputChange} value={formData.city} required />
        <input placeholder="State / Province" className="form-control" type="text" name="state" onChange={handleInputChange} value={formData.state} required />
        </div>

        <div className="mb-3">
        <input  placeholder="Postal / Zip Code" className="form-control" type="text" name="pincode" onChange={handleInputChange} value={formData.pincode} required />
        </div>
        
        </div>



        {/* File Uploads */}
        <div>
          <label className="usercourse">File Upload*</label>
          <div
            className="image-load"
            onClick={() => document.querySelector(".input-field").click()}
          >
           
             <input hidden className="input-field" type="file" name="fileName" accept="image/*" onChange={handleInputChange} />
        
            {image ? (
              <img src={image} width={150} height={150} alt={fileName} />
            ) : (
              <>
                <i
                  className="fa-solid fa-cloud-arrow-up"
                  style={{ color: "#7a9449", fontSize: "xxx-large" }}
                ></i>
                <p>Browse File to Upload</p>
              </>
            )}
          </div>
        </div>


     
        <div className='Captcha'>
          <label className="usercourse">Please verify that you are human</label>
          <ReCAPTCHA
          className='inr-captcha'
          name="captcha"
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            value={formData.captcha}
            onChange={handleInputChange}
            required
          />
        </div>



        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
