import React, { useState } from 'react';
import './RoleEditModal.css'; // Import the CSS file

const RoleEditModal = ({ user, onSave, onClose, availableRoles }) => {
    const [newRoles, setNewRoles] = useState(user.roles || []);
    const [selectedRole, setSelectedRole] = useState('');

    const handleSave = () => {
        onSave(newRoles);
        onClose();
    };

    const handleAddRole = () => {
        if (selectedRole && !newRoles.includes(selectedRole)) {
            setNewRoles([...newRoles, selectedRole]);
        }
        setSelectedRole('');  // Clear the selection after adding
    };

    const handleRemoveRole = (roleToRemove) => {
        setNewRoles(newRoles.filter(role => role !== roleToRemove));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{user.username} kullanıcısının rolleri</h3>

                <ul className="role-list">
                    {newRoles.map(role => (
                        <li key={role} className="role-item">
                            {role}
                            <button className="remove-role" onClick={() => handleRemoveRole(role)}>Rolü Sil</button>
                        </li>
                    ))}
                </ul>

                <div className="add-role-container">
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="role-select">
                        <option value="" disabled>Eklemek için rolü seçiniz</option>
                        {availableRoles.map(role => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                    <button className="add-role" onClick={handleAddRole}>Rol Ekle</button>
                </div>

                <div className="modal-buttons">
                    <button className="save-button" onClick={handleSave}>Kaydet</button>
                    <button className="cancel-button" onClick={onClose}>Geri Çık</button>
                </div>
            </div>
        </div>
    );
};

export default RoleEditModal;
