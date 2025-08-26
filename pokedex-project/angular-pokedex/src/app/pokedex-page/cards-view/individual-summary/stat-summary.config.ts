import { ChartConfiguration } from 'chart.js';

export const statChartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: [
          'HP',
          'Attack',
          'Defense',
          'Sp. Attack',
          'Sp. Defense',
          'Speed',
        ],
        datasets: [
          {
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(255, 205, 86, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(75, 192, 92, 0.8)',
              // '#ffbde0'
              'rgba(153, 102, 255, 0.8)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
            maxBarThickness: 20,
          },
        ],
      },
      options: {
        color: '#cfcfcf',
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            min: 0,
            max: 255,
            grid: {
              borderColor: '#cfcfcf',
              color: '#cfcfcf',
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            font: {
              size: 20,
            },
            display: true,
            text:
              'BST : ???',
          },
        },
      },
    }