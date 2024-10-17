import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faDollarSign, faShoppingCart, faClipboardList, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState({
    location: '',
    temperature: '',
    condition: '',
    icon: faSun,
  });
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = 'bcd9fc51f2895f4c938ab6b8cc7c115f'; // OpenWeatherMap API anahtarınızı buraya ekleyin
      const city = 'Ankara'; // İstenilen şehir
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        let weatherIcon;
        if (data.weather[0].main === 'Clear') {
          weatherIcon = faSun;
        } else if (data.weather[0].main === 'Clouds') {
          weatherIcon = faCloud;
        } else if (data.weather[0].main === 'Rain') {
          weatherIcon = faCloudRain;
        } else if (data.weather[0].main === 'Snow') {
          weatherIcon = faSnowflake;
        }

        setWeatherData({
          location: data.name,
          temperature: `${data.main.temp}°C`,
          condition: data.weather[0].main,
          icon: weatherIcon,
        });
      } catch (error) {
        console.error('Hava durumu verilerini çekerken hata:', error);
      }
    };

    fetchWeatherData();

    const timer = setInterval(() => {
      const now = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      const date = now.toLocaleDateString('tr-TR', options);
      const time = now.toLocaleTimeString('tr-TR');
      setCurrentTime(`${date}, ${time}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Ana Sayfaya Hoş Geldiniz</h1>
      <div className="cards-container">
        <div className="card weather-card">
          <h2>Hava Durumu</h2>
          <p>{weatherData.location}</p>
          <FontAwesomeIcon icon={weatherData.icon} size="3x" />
          <p>{weatherData.temperature}</p>
          <p>{weatherData.condition}</p>
        </div>

        <div className="card clock-card">
          <h2>Saat</h2>
          <h1>{currentTime}</h1>
        </div>

        <div className="card stats-card">
          <h2>İstatistikler</h2>
          <p>Ürünler: 120</p>
          <p>Otomatlar: 3</p>
          <p>Bugünün Geliri: $250</p>
        </div>

        <div className="card notes-card">
          <h2>Yapılacaklar</h2>
          <p>A otomatını yeniden doldurmayı unutmayın.</p>
          <p>Geçen haftanın satış raporunu kontrol edin.</p>
        </div>

        <div className="card history-card">
          <h2>Son Aktiviteler</h2>
          <ul>
            <li>Otomat 1 dolduruldu - 10:00 AM</li>
            <li>Otomat 2'den $50 satış - 11:30 AM</li>
            <li>Ürünler stoklandı - 02:00 PM</li>
            <li>Haftalık rapor hazırlandı - 03:45 PM</li>
          </ul>
        </div>

        {/* Yeni Kartlar */}
        <div className="card income-card">
          <h2>Günlük Gelir</h2>
          <FontAwesomeIcon icon={faDollarSign} size="3x" />
          <p>$250</p>
        </div>

        <div className="card best-sellers-card">
          <h2>En Çok Satan Ürünler</h2>
          <FontAwesomeIcon icon={faShoppingCart} size="3x" />
          <p>Su</p>
          <p>Cips</p>
          <p>Çikolata</p>
        </div>

        <div className="card stock-status-card">
          <h2>Stok Durumu</h2>
          <FontAwesomeIcon icon={faClipboardList} size="3x" />
          <p>Su: 30</p>
          <p>Cips: 15</p>
          <p>Çikolata: 5</p>
        </div>

        <div className="card calendar-card">
          <h2>Takvim</h2>
          <FontAwesomeIcon icon={faCalendarAlt} size="3x" />
          <p>Bugün: 14 Ekim 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
