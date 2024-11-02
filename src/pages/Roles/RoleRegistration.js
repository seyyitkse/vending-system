import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Use useNavigate

const RoleRegistration = () => {
    const [roleName, setRoleName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRoleNameChange = (e) => {
        setRoleName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await axios.post("https://localhost:44395/api/Role", { roleName });

            if (response.status === 200) {
                // Show success toast notification
                toast.success(`'${roleName}' isimli rol başarıyla oluşturuldu.`);
                setRoleName("");

                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate("/roles"); // Use navigate for redirection
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors;
                setErrorMessage(errors.RoleName || "Rol oluşturma hatası! Lütfen tekrar deneyiniz.");
            } else {
                setErrorMessage("Bilinmeyen bir hata oluştu.");
            }
        }
    };

    return (
        <div className="role-registration-page">
            <h2>Yeni Rol Kaydı</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="roleName">Rol İsmi:</label>
                    <input
                        type="text"
                        id="roleName"
                        value={roleName}
                        onChange={handleRoleNameChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="register-button">Rol Kaydet</button>
            </form>
            <ToastContainer /> {/* Toast notification container */}
        </div>
    );
};

export default RoleRegistration;