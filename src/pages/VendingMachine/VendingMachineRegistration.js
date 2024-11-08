import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './VendingMachineRegistration.css';

// Set up the default icon for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const VendingMachineRegistration = () => {
  const [machineName, setMachineName] = useState('');
  const [position] = useState([39.919983401735344, 32.85384178161622]); // Default coordinates, no setter
  const [selectedPosition, setSelectedPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Vending Machine Name:', machineName);
    console.log('Coordinates:', selectedPosition);
  };

  // Koordinatları temizleme fonksiyonu
  const clearCoordinates = () => {
    setSelectedPosition(null);
  };

  return (
    <div className="new-vending-machine-page">
      <h1>Yeni Otomat Kayıt Sayfası</h1>
      <div className="registration-card1">
        <form onSubmit={handleSubmit} style={{ display: 'block' }}>
          <div className="form-group">
            <label htmlFor="machineName">Otomat Adı:</label>
            <input
              type="text"
              id="machineName"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              required
            />
          </div>
          <div>
            <h2>Otomatın Konumunu Haritadan Seçiniz</h2>
            <div className="map-container1">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: '500px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapClickHandler />
                {selectedPosition && <Marker position={selectedPosition}></Marker>}
              </MapContainer>
            </div>
          </div>

          {selectedPosition && (
            <div className="coordinates-display">
              <h3>Seçtiğiniz Koordinatlar:</h3>
              <p>Latitude: {selectedPosition[0]}</p>
              <p>Longitude: {selectedPosition[1]}</p>
              <button type="button" onClick={clearCoordinates} className="clear-button">
                Seçimi Temizle
              </button>
            </div>
          )}

          <button type="submit" className="submit-button">
            Yeni Otomatı Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendingMachineRegistration;
