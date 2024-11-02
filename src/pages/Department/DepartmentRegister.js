import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './DepartmentRegistration.css'; // Import the CSS file

function DepartmentRegistration() {
    const [departmentName, setDepartmentName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:44395/api/Departments', {
                name: departmentName,
            });

            if (response.status === 201) {
                toast.success(`'${departmentName}' isimli departman başarıyla oluşturuldu!`);
                setTimeout(() => {
                    navigate('/departments/list'); // Redirect to the department listing page
                }, 2000); // Delay for 2 seconds to allow the notification to be visible
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || 'Departman oluşturulurken hata oluştu.');
            } else {
                toast.error('Hata oluştu. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <div className="registration-container">
            <h2>Yeni Departman Kaydı</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="departmentName">Departman Adı</label>
                    <input
                        type="text"
                        id="departmentName"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Departmanı Kaydet</button>
            </form>
            
            {/* ToastContainer to show notifications */}
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
        </div>
    );
}

export default DepartmentRegistration;
