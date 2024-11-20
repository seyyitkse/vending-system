import React from 'react';
import { Bar, Pie, Line, Radar, Doughnut, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import './Statistics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, RadialLinearScale, Title, Tooltip, Legend);

// Bar chart data (Aylık Satışlar)
const barData = {
  labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
  datasets: [
    {
      label: 'Satışlar',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
};

// Pie chart data (Ürün Dağılımı)
const pieData = {
  labels: ['Ürün A', 'Ürün B', 'Ürün C'],
  datasets: [
    {
      label: 'Ürün Dağılımı',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      data: [300, 50, 100],
    },
  ],
};

// Line chart data (Günlük Ziyaretçi Sayısı)
const lineData = {
  labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
  datasets: [
    {
      label: 'Günlük Ziyaretçi Sayısı',
      fill: false,
      borderColor: '#742774',
      data: [65, 59, 80, 81, 56],
    },
  ],
};

// Radar chart data (Bölgesel Performans)
const radarData = {
  labels: ['Bölge 1', 'Bölge 2', 'Bölge 3', 'Bölge 4', 'Bölge 5'],
  datasets: [
    {
      label: 'Satış Performansı',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      data: [65, 59, 90, 81, 56],
    },
  ],
};

// Doughnut chart data (Kategori Dağılımı)
const doughnutData = {
  labels: ['Gıda', 'İçecek', 'Atıştırmalık'],
  datasets: [
    {
      label: 'Kategori Dağılımı',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      data: [200, 150, 100],
    },
  ],
};

// Polar Area chart data (Aylık Müşteri Memnuniyeti)
const polarData = {
  labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
  datasets: [
    {
      label: 'Müşteri Memnuniyeti',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      data: [65, 70, 80, 81, 56],
    },
  ],
};

const Statistics = () => {
  return (
    <div className="statistics-page">
      {/* Bar Chart */}
      <div className="stat-card">
        <h2 className="chart-title">Aylık Satışlar</h2>
        <div className="chart-container">
          <Bar data={barData} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="stat-card">
        <h2 className="chart-title">Ürün Dağılımı</h2>
        <div className="chart-container">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="stat-card">
        <h2 className="chart-title">Günlük Ziyaretçi Sayısı</h2>
        <div className="chart-container">
          <Line data={lineData} />
        </div>
      </div>

      {/* Radar Chart */}
      <div className="stat-card">
        <h2 className="chart-title">Bölgesel Performans</h2>
        <div className="chart-container">
          <Radar data={radarData} />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="stat-card">
        <h2 className="chart-title">Kategori Dağılımı</h2>
        <div className="chart-container">
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Polar Area Chart */}
      <div className="stat-card">
        <h2 className="chart-title">Aylık Müşteri Memnuniyeti</h2>
        <div className="chart-container">
          <PolarArea data={polarData} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
