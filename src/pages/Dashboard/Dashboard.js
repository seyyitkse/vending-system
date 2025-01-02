import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudRain, faSnowflake, faDollarSign, faShoppingCart, faClipboardList, faCalendarAlt, faClock, faChartBar ,faBell} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState({
    location: '',
    temperature: '',
    condition: '',
    icon: faSun,
  });
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [logs, setLogs] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
        const apiKey = 'bcd9fc51f2895f4c938ab6b8cc7c115f'; // OpenWeatherMap API key
        const city = 'Ankara';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=tr`; // Added lang=tr
      
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
          const capitalizeFirstLetter = (str) => {
            return str
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          };
          setWeatherData({
            location: data.name,
            temperature: `${data.main.temp}°C`,
            condition: capitalizeFirstLetter(data.weather[0].description), // Capitalize description
            icon: weatherIcon,
          });
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

    const fetchLogData = async () => {
        const logApiUrl = 'https://localhost:44395/api/Logs/get-logs';
        
        try {
          const response = await fetch(logApiUrl);
          const data = await response.json();
          
          // Get the last 5 log entries and remove milliseconds
          const recentLogs = data.slice(-9).map(log => {
            const [date, time] = log.timestamp.split(' ');
            return {
              timestamp: `${date} ${time.slice(0, 8)}`, // Remove milliseconds
              message: log.message,
            };
          }).reverse(); // Reverse to show the latest entries on top
  
          setLogs(recentLogs);
        } catch (error) {
          console.error('Error fetching log data:', error);
        }
      };
  

    const fetchTodos = async () => {
      const todoApiUrl = 'https://localhost:44395/api/TodoItem';
      try {
        const response = await fetch(todoApiUrl);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching to-do data:', error);
      }
    };

    fetchWeatherData();
    fetchLogData();
    fetchTodos();

    const timer = setInterval(() => {
      const now = new Date();
      const options = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
      const date = now.toLocaleDateString('tr-TR', options);
      const time = now.toLocaleTimeString('tr-TR');
      setCurrentTime(`${date}, ${time}`);
      fetchLogData(); 
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo) return;

    const todoApiUrl = 'https://localhost:44395/api/TodoItem';
    const newTodoItem = { title: newTodo, completed: false };

    try {
      const response = await fetch(todoApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodoItem),
      });

      if (response.ok) {
        const addedTodo = await response.json();
        setTodos([...todos, addedTodo]);
        setNewTodo(''); // Clear the input
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    const todoApiUrl = `https://localhost:44395/api/TodoItem/${id}`;

    try {
      const response = await fetch(todoApiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
        const response = await fetch(`https://localhost:44395/api/TodoItem/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update your local state to reflect the change
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    } catch (error) {
        console.error('Error toggling todo:', error);
    }
};

  return (
    <div className="dashboard-container">
      <h1>Ana Sayfaya Hoş Geldiniz</h1>
      <div className="cards-container">
 <div className="card weather-clock-card">
    <h2>Hava Durumu ve Saat</h2>
    <div className="weather-info">
    <p>{weatherData.location}</p>
       <FontAwesomeIcon icon={weatherData.icon} size="3x" />
       <p>{weatherData.temperature}</p>
       <p>{weatherData.condition}</p>
      </div>
       <div className="clock-info">
         <FontAwesomeIcon icon={faClock} size='3x' />
         <h2>{currentTime}</h2>
        </div>
       </div>

        <div className="card stats-card">
          <h2>İstatistikler</h2>
          <FontAwesomeIcon icon={faChartBar} size='3x'/>
          <p>Ürünler: 120</p>
          <p>Otomatlar: 3</p>
          <p>Bugünün Geliri: $250</p>
        </div>
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
        <div className="card notes-card">

  <h2>Yapılacaklar</h2>
  <input
    type="text"
    value={newTodo}
    onChange={(e) => setNewTodo(e.target.value)}
    placeholder="Yeni görev ekle"
    maxLength={100}
  />
  <button onClick={handleAddTodo}>Ekle</button>

  {todos.length === 0 ? (
    <p>Yapılacak görev yok.</p>
  ) : (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
            className="todo-checkbox"
          />
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
          <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">
            Sil
          </button>
        </li>
      ))}
    </ul>
  )}
       </div>

<div className="card history-card">
          <h2>Son Aktiviteler</h2>
          <FontAwesomeIcon icon={faBell} size='3x' />          
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log.message} - {log.timestamp}</li>
            ))}
          </ul>
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
          <p>Bugün: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;