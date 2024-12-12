import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
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
  const [locationDescription, setLocationDescription] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const position = [39.919983401735344, 32.85384178161622]; // Default position set to Ankara
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPosition) {
      toast.error('Lütfen haritadan bir konum seçiniz.');
      return;
    }

    if (!machineName || !locationDescription) {
      toast.error('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const vend = {
      id: 0,
      name: machineName,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
      locationDescription: locationDescription,
    };

    try {
      const response = await fetch('https://localhost:44395/api/Vend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vend),
      });

      if (!response.ok) {
        throw new Error('Otomat kaydedilemedi');
      }

      toast.success('Otomat başarıyla kaydedildi');
      // Redirect to the vending machine list page after a short delay
      setTimeout(() => {
        navigate('/vending-machine');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Otomat kaydedilemedi');
    }
  };

  const clearCoordinates = () => {
    setSelectedPosition(null);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="new-vending-machine-page">
      <ToastContainer />
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
          <div className="form-group">
            <label htmlFor="locationDescription">Konum Açıklaması:</label>
            <input
              type="text"
              id="locationDescription"
              value={locationDescription}
              onChange={(e) => setLocationDescription(e.target.value)}
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