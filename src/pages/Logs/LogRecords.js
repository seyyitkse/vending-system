import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'; // For date formatting
import DataTable from 'react-data-table-component'; // Import DataTable component
import './LogRecords.css';

const LogRecords = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredLogs, setFilteredLogs] = useState([]); // Filtered logs based on search
  const [selectedLevel, setSelectedLevel] = useState(''); // State for selected log level
  const logLevels = ['LOGIN','LOGOUT','FAIL','INF', 'REGISTER','TOKEN','ERR']; // Example log levels

  // Function to fetch logs from the API
// Function to fetch logs from the API
const fetchLogs = () => {
  fetch('https://localhost:44395/api/Logs/get-logs')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Loglar getirilirken hata oluştu. Sayfayı yenileyiniz ya da yönetici ile iletişime geçiniz.');
      }
      return response.json();
    })
    .then((data) => {
      const sortedLogs = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp descending
      setLogs(sortedLogs);
      setFilteredLogs(sortedLogs); // Initially show all logs in sorted order
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
};

  // useEffect to fetch logs initially and refresh every 15 seconds
  useEffect(() => {
    fetchLogs();
    const interval = setInterval(() => {
      fetchLogs(); // Refresh logs every 15 seconds
    }, 60000);

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterLogs(value, selectedLevel);
  };

  // Handle log level selection change
  const handleLogLevelChange = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);
    filterLogs(searchTerm, level);
  };

  // Filter logs based on search term and selected log level
  const filterLogs = (searchTerm, level) => {
    const filtered = logs.filter((log) => {
      const matchesSearch = log.message.toLowerCase().includes(searchTerm) ||
        log.level.toLowerCase().includes(searchTerm) ||
        format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss').includes(searchTerm);
      const matchesLevel = level ? log.level.includes(level) : true;
      return matchesSearch && matchesLevel;
    });
    setFilteredLogs(filtered);
  };

  // Define columns for the DataTable
  const columns = [
    {
      name: 'Zaman - Log Tipi',
      selector: (row) => `${format(new Date(row.timestamp), 'dd/MM/yyyy HH:mm:ss')} - ${row.level}`, // Format the date and log level
      sortable: true, // Enable sorting for this column
    },
    {
      name: 'Mesaj',
      selector: (row) => row.message,
    },
  ];

  if (loading) {
    return <p>Loglar Yükleniyor...</p>;
  }

  if (error) {
    return <p>Hata: {error}</p>;
  }

  return (
    <div className="log-records-page">
      <h1>Log Kayıtları</h1>

      {/* Log Level Selection */}
      <select value={selectedLevel} onChange={handleLogLevelChange} className="log-level-selector">
        <option value="">Tüm Log Tipleri</option>
        {logLevels.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Log kaydında ara..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredLogs}
        pagination // Enable pagination
        highlightOnHover // Add hover effect
        striped // Add striped rows
        progressPending={loading} // Show loading indicator while loading
        paginationPerPage={10} // Set default rows per page
        paginationRowsPerPageOptions={[10, 25, 50]} // Rows per page options
        noDataComponent={<p>Log kaydı bulunamadı.</p>} // Show a message if no data is available
      />
    </div>
  );
};

export default LogRecords;
