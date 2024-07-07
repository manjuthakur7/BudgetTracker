import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Expenses',
      data: [300, 500, 100, 400],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const ExpenseChart = () => {
  return <Bar data={data} options={options} />;
};

export default ExpenseChart;
