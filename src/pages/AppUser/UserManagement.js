import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import RoleEditModal from './RoleEditModal';
import './UserManagement.css';
import { FaEdit } from 'react-icons/fa';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get('https://localhost:44395/api/AppUser/getUserRoles');
                setUsers(userRes.data);

                const rolesRes = await axios.get('https://localhost:44395/api/Role');
                setAvailableRoles(rolesRes.data);
            } catch (err) {
                console.error(err);
                setError('Data not received');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRoleUpdate = (userId, updatedRoles) => {
        axios.post(`https://localhost:44395/api/AppUser/getUserRoles/${userId}/roles`, { roles: updatedRoles })
            .then(res => {
                const updatedUsers = users.map(user => 
                    user.userId === userId ? { ...user, roles: updatedRoles } : user
                );
                setUsers(updatedUsers);
            })
            .catch(err => console.error(err));
    };

    // Handle search filter
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1, // Add index + 1 for numbering
            sortable: false,
            width: '50px', // Optional: Adjust width if needed
        },
        {
            name: 'Kullanıcı Adı',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Mail',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Roller',
            selector: row => row.roles.join(', '),
        },
        {
            name: 'İşlemler',
            cell: row => (
                <div className="button-group">
                    <button onClick={() => setSelectedUser(row)} className="btn btn-edit">
                        <FaEdit /> Rolleri Düzenle
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="staff-management-container">
            <h1>Kullanıcı Rol Yönetimi</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Kullanıcı adı veya mail ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredUsers}
                pagination
                highlightOnHover
                responsive
                noDataComponent="Kullanıcı Bulunamadı..."
                style={{ maxWidth: '1200px', margin: '0 auto' }} // Set max width and center
            />
            {selectedUser && (
                <RoleEditModal
                    user={selectedUser}
                    availableRoles={availableRoles}
                    onSave={(updatedRoles) => handleRoleUpdate(selectedUser.userId, updatedRoles)}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default UserManagement;
