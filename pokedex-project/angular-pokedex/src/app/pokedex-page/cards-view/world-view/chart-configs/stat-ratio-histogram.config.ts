// stat-ratio-histogram.config.ts
import { ChartConfiguration } from 'chart.js';
import { Pokemon } from 'src/app/Pokemon'; // adjust to match your project

// 🔐 Private constants
const BIN_SIZE = 0.25;  // bucket width for ratio range
const BIN_COUNT = 30;    // e.g. 1–2, 2–3, ..., 8+
const BIN_MIN = 1.0;    // lowest ratio tracked

// 🔢 Generate labels like "1.00–1.24", "1.25–1.49", ..., "≥3.75"
function generateRatioLabels(): string[] {
  return Array.from({ length: BIN_COUNT }, (_, i) => {
    const lower = BIN_MIN + i * BIN_SIZE;
    const upper = lower + BIN_SIZE - 0.01;
    return i === BIN_COUNT - 1
      ? `≥${lower.toFixed(2)}`
      : `${lower.toFixed(2)}–${upper.toFixed(2)}`;
  });
}

// 📈 Chart.js configuration template
export const statRatioHistogramConfig: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: {
    labels: generateRatioLabels(),
    datasets: [{
      label: 'Ratio of Highest to Lowest Stat',
      data: [], // to be filled dynamically
      backgroundColor: '#FFAB91',
      borderColor: '#FF7043',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Histogram of Stat Ratio (Max / Min)',
        font: { size: 18 },
        color: '#cfcfcf'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ratio Range',
          color: '#cfcfcf'
        },
        ticks: { color: '#cfcfcf' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Pokémon',
          color: '#cfcfcf'
        },
        ticks: { color: '#cfcfcf' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  }
};

// Compute ratio of highest stat to lowest stat
export function calculateStatRatio(p: Pokemon): number {
  const stats = p.special 
    ? [p.hp, p.attack, p.defense, p.special, p.speed]
    : [p.hp, p.attack, p.defense, p.sp_attack, p.sp_defense, p.speed];
  const max = Math.max(...stats);
  const min = Math.min(...stats);
  return max / min;
}

// Reduce Pokémon list into ratio bins
export function binStatRatios(pokemonList: Pokemon[]): number[] {
  return pokemonList.reduce((bins, p) => {
    const ratio = calculateStatRatio(p);
    const cappedRatio = Math.min(ratio, BIN_MIN + BIN_SIZE * BIN_COUNT - 0.01);
    const index = Math.floor((cappedRatio - BIN_MIN) / BIN_SIZE);
    bins[index]++;
    return bins;
  }, Array(BIN_COUNT).fill(0));
}