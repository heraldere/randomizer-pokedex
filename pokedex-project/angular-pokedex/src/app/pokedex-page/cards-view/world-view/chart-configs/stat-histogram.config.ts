import { ChartConfiguration } from 'chart.js'; 
import { Pokemon } from 'src/app/Pokemon';

// Private binning constants
const BIN_WIDTH = 10;    // each bin spans 10 stat points
const BIN_MIN = 0;      // lower bound for histogram range
const BIN_MAX = 250;     // upper bound for histogram range
const BIN_COUNT = Math.ceil((BIN_MAX - BIN_MIN) / BIN_WIDTH) + 1;

// Generate bin labels like "50–59", "60–69", ..., "140–149"
function generateStatLabels(): string[] {
  return Array.from({ length: BIN_COUNT }, (_, i) => {
    const lower = BIN_MIN + i * BIN_WIDTH;
    const upper = lower + BIN_WIDTH - 1;
    return i === BIN_COUNT - 1
      ? `≥${lower}`
      : `${lower}–${upper}`;
  });
}

// 📈 Chart.js configuration template
export const statValueHistogramConfig: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: {
    labels: generateStatLabels(),
    datasets: [{
      label: 'Stat Value Distribution',
      data: new Array(generateStatLabels().length).fill(0),
      backgroundColor: '#81D4FA',
      borderColor: '#0288D1',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
        x: { duration: 0 },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Histogram of Specific Stat Values',
        font: { size: 18 },
        color: '#cfcfcf'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Stat Value Range',
          color: '#cfcfcf'
        },
        ticks: { color: '#cfcfcf' },
        grid: { 
            color: 'rgba(255,255,255,0.1)',
            display: false, 
        }
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

// Extract stat value from Pokémon by stat key
export function getStatValue(p: Pokemon, stat: string): number {      
  switch (stat) {
    case "hp":
      return p.hp;
    case "attack":
      return p.attack;
    case "defense":
      return p.defense;
    case "sp_attack":
      return p.sp_attack ? p.sp_attack : 0;
    case "sp_defense":
      return p.sp_defense ? p.sp_defense : 0;
    case "special":
      return p.special ? p.special : 0;
    case "speed":
      return p.speed;
    case "stat_total":
      return p.bst();
    default:
      return 0;
  }
}

// Bin Pokémon by a given stat key (e.g. 'attack', 'defense', 'speed')
export function binStatValues(pokemonList: Pokemon[], stat: string): number[] {
  return pokemonList.reduce((bins, p) => {
    const value = getStatValue(p, stat);
    if (value >= BIN_MIN && value < BIN_MAX) {
      const index = Math.floor((value - BIN_MIN) / BIN_WIDTH);
      bins[index]++;
    } else if (value >= BIN_MAX) {
        bins[bins.length - 1]++
    }
    return bins;
  }, Array(BIN_COUNT).fill(0));
}