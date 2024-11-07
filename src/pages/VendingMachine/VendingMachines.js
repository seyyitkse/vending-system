import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './VendingMachines.css';

// Set default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const VendingMachines = () => {
  const [vendingMachines, setVendingMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Display 6 items per page

  // Fetch vending machines data from the API
  useEffect(() => {
    fetch('https://localhost:44395/api/Vend')
      .then(response => {
        if (!response.ok) {
          throw new Error('Otomatlar alınamadı');
        }
        return response.json();
      })
      .then(data => setVendingMachines(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Filter vending machines based on the search term
  const filteredMachines = vendingMachines.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination details
  const totalPages = Math.ceil(filteredMachines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMachines = filteredMachines.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="vending-machines-page">
      <h1>Otomatlar</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Otomatlarda Ara"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="vending-machines-container">
        {currentMachines.length > 0 ? (
          currentMachines.map(machine => (
            <div key={machine.id} className="vending-machine-card">
              <h2 className="machine-name">{machine.name}</h2>
              <div className="machine-stats">
                <p>Ürünler: {machine.productsCount}</p>
                <p>Bugünkü Satış: {machine.salesToday}</p>
              </div>
              <div className="map-container">
                <MapContainer center={[machine.latitude, machine.longitude]} zoom={13} style={{ height: '150px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[machine.latitude, machine.longitude]}>
                    <Popup>{machine.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
              <p className="machine-location">Konum: {machine.location}</p>
              <Link to={`/vending-machine-detail/${machine.id}`} className="details-button">
                Detayları Gör
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results-message">Otomatlar alınamadı.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Önceki
        </button>
        <span>Sayfa {currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || filteredMachines.length === 0}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default VendingMachines;
