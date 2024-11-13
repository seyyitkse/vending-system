import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './VendingMachineDetail.css';

// Set up Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const VendingMachineDetail = () => {
  const { id } = useParams();
  const [vendingMachine, setVendingMachine] = useState(null);

  useEffect(() => {
    const fetchVendingMachine = async () => {
      try {
        const response = await axios.get(`https://localhost:44395/api/Vend/${id}`);
        setVendingMachine(response.data);
      } catch (error) {
        console.error("Error fetching vending machine data:", error);
      }
    };

    fetchVendingMachine();
  }, [id]);

  if (!vendingMachine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vending-machine-detail">
      <h1>{vendingMachine.name}</h1>
      <p>Location: {vendingMachine.location}</p>
      <p>Products Count: {vendingMachine.productsCount}</p>
      <p>Sales Today: {vendingMachine.salesToday}</p>
      
      <div className="map-container">
        <MapContainer center={vendingMachine.position} zoom={13} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={vendingMachine.position}>
            <Popup>{vendingMachine.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <Link to="/vending-machines" className="back-button">Back to Vending Machines</Link>
    </div>
  );
};

export default VendingMachineDetail;
