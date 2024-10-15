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
        setLogs(data);
        setFilteredLogs(data); // Initially show all logs
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
    }, 15000);

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter logs based on search term
    const filtered = logs.filter((log) =>
      log.message.toLowerCase().includes(value) ||
      log.level.toLowerCase().includes(value) ||
      format(new Date(log.timestamp), 'dd/MM/yyyy HH:mm:ss').includes(value)
    );
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
