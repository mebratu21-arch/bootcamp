import React, { useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        gender: '',
        islike: false,
        education: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log(formData);
    }
    
    const handleChange = (e) => {
        if(e.target.type === 'checkbox'){
            setFormData({
                ...formData,
                islike: e.target.checked
            });
            
            if(e.target.checked){
                alert('checked');
            } else {
                alert('not checked');
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                [e.target.age]: e.target.value,
                [e.target.address]: e.target.value,
                [e.target.gender]: e.target.value,
                [e.target.education]: e.target.value,
                [e.target.message]:e.target.value
            });
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="text"
                    name="age"
                    placeholder="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="text"
                    name="address"
                    placeholder="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <br/>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <br/>
                
                {/* Radio buttons for education level */}
                <label>Education Level:</label>
                <br/>
                <label>
                    <input
                        type="radio"
                        name="education"
                        value="highschool"
                        checked={formData.education === 'highschool'}
                        onChange={handleChange}
                    />
                    High School
                </label>
                <br/>
                <label>
                    <input
                        type="radio"
                        name="education"
                        value="bachelor"
                        checked={formData.education === 'bachelor'}
                        onChange={handleChange}
                    />
                    Bachelor's Degree
                </label>
                <br/>
                <label>
                    <input
                        type="radio"
                        name="education"
                        value="master"
                        checked={formData.education === 'master'}
                        onChange={handleChange}
                    />
                    Master's Degree
                </label>
                <br/>
                
                <label>
                    <input
                        type="checkbox"
                        checked={formData.islike}
                        onChange={handleChange}
                    />
                    I like this
                </label>
                <br />
                <textarea name="message" id="" cols="30" rows="10" value={formData.message} onChange={handleChange}>hy mebre what do you think about this form  </textarea>
                <button type="submit" style={{color: 'red', backgroundColor: 'green', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '20px', fontWeight: 'bold', marginTop: '20px'}}>Submit</button>
            </form>

            {/* Display output when submitted */}
            {submitted && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h3>Form Output:</h3>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Age:</strong> {formData.age}</p>
                    <p><strong>Address:</strong> {formData.address}</p>
                    <p><strong>Gender:</strong> {formData.gender}</p>
                    <p><strong>Education:</strong> {formData.education}</p>
                    <p><strong>Liked:</strong> {formData.islike ? 'Yes' : 'No'}</p>
                    <p><strong>Message:</strong> {formData.message}</p>
                </div>
            )}
        </div>
    );
};

export default Form;