// bst-histogram.config.ts
import { ChartConfiguration } from 'chart.js';

export const bstHistogramConfig: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: {
    labels: [
      '200–299', '300–399', '400–499', '500–599',
      '600–699', '700–799', '800–899', '900+'
    ],
    datasets: [{
      label: 'Count of Pokémon by BST',
      data: [], // You can fill this dynamically
      backgroundColor: '#82B1FF',
      borderColor: '#448AFF',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: 'Distribution of Base Stat Totals'
      }
    },
    scales: {
      x: { title: { display: true, text: 'BST Range' } },
      y: { beginAtZero: true, title: { display: true, text: 'Number of Pokémon' } }
    }
  }
};
