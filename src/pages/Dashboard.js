import React from 'react';
import './Dashboard.css'; // Import CSS for styling

const Dashboard = () => {
  const currentTime = new Date().toLocaleTimeString();

  // Dummy weather data
  const weatherData = {
    location: 'New York',
    temperature: '22°C',
    condition: 'Sunny',
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="cards-container">
        <div className="card weather-card">
          <h2>Weather</h2>
          <p>{weatherData.location}</p>
          <p>{weatherData.temperature}</p>
          <p>{weatherData.condition}</p>
        </div>

        <div className="card clock-card">
          <h2>Current Time</h2>
          <p>{currentTime}</p>
        </div>

        <div className="card stats-card">
          <h2>Statistics</h2>
          <p>Products: 120</p>
          <p>Vending Machines: 5</p>
          <p>Sales Today: $250</p>
        </div>

        <div className="card notes-card">
          <h2>Notes</h2>
          <p>Remember to restock vending machine A.</p>
          <p>Check the sales report for last week.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
