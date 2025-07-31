// bst-histogram.config.ts
import { ChartConfiguration } from 'chart.js';
import { Pokemon } from 'src/app/Pokemon';

const BIN_MIN = 200;
const BIN_SIZE = 20;
const BIN_MAX = 900;
const BIN_COUNT = Math.ceil((BIN_MAX - BIN_MIN)/BIN_SIZE) + 1;

export const bstHistogramConfig: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: {
    labels: Array.from({ length: BIN_COUNT }, (_, i) => {
        const min = BIN_MIN + i * BIN_SIZE;
        const max = min + BIN_SIZE - 1;
        return i === BIN_COUNT - 1
        ? `≥${min}`
        : `${min}–${max}`;
        }),
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
    animations: {
        x: { duration: 0},
    },
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

export function binBSTs(pokemonList: Pokemon[]) {
    return pokemonList.reduce((bins, { stat_total }) => {
        if(stat_total >= BIN_MIN && stat_total < BIN_MAX) {
            const index = Math.floor((stat_total - BIN_MIN) / BIN_SIZE);
            bins[index]++;
        } else if (stat_total>=BIN_MAX) {
            bins[bins.length - 1]++
        }
      return bins;
    }, Array(BIN_COUNT).fill(0));
  }
