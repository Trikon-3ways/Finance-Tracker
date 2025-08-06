import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseChart = ({ records }) => {
  // Calculate total expenditure
  const totalExpenditure = records.reduce((sum, record) => sum + record.amount, 0);
  
  // Calculate expenditure by category
  const categoryData = records.reduce((acc, record) => {
    acc[record.category] = (acc[record.category] || 0) + record.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#f5576c',
          '#4facfe',
          '#00f2fe'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#000000',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Expenditure by Category',
        color: '#000000',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div className="expense-chart-container">
      <div className="total-expenditure">
        <h3>Total Expenditure</h3>
        <div className="total-amount">${totalExpenditure.toFixed(2)}</div>
      </div>
      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart; 