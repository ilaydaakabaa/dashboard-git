<template>
  <div class="chart-card">
    <h2 class="chart-title">{{ title }}</h2>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: 'Kategori Grafiği'
  },
  chartData: {
    type: Array,
    required: true
  },
  seriesName: {
    type: String,
    default: 'Değer'
  },
  yAxisName: {
    type: String,
    default: 'Tutar'
  },
  valueSuffix: {
    type: String,
    default: ''
  },
  labelRotate: {
    type: Number,
    default: 20
  }
})

const chartRef = ref(null)
let chartInstance = null

function getChartOptions() {
  return {
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        const item = params[0]
        return `${item.name}<br/>${props.seriesName}: ${item.value}${props.valueSuffix}`
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '12%',
      bottom: '14%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.chartData.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: props.labelRotate
      }
    },
    yAxis: {
      type: 'value',
      name: props.yAxisName
    },
    series: [
      {
        name: props.seriesName,
        type: 'bar',
        data: props.chartData.map(item => item.value),
        barWidth: 40,
        label: {
          show: true,
          position: 'top',
          formatter: ({ value }) => `${value}${props.valueSuffix}`
        }
      }
    ]
  }
}

function renderChart() {
  if (!chartRef.value) return

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }

  chartInstance.setOption(getChartOptions())
  chartInstance.resize()
}

function resizeChart() {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', resizeChart)
})

watch(
  () => props.chartData,
  () => {
    renderChart()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)

  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
.chart-card {
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  width: 100%;
  min-width: 0;
}

.chart-title {
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #0f172a;
  line-height: 1.4;
}

.chart {
  width: 100%;
  height: 340px;
}

@media (max-width: 992px) {
  .chart {
    height: 300px;
  }
}

@media (max-width: 576px) {
  .chart-card {
    padding: 16px;
  }

  .chart-title {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  .chart {
    height: 260px;
  }
}
</style>