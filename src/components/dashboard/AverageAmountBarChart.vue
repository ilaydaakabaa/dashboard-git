<template>
  <div class="chart-card">
    <h2 class="chart-title">Kategoriye Göre Ortalama Tutar</h2>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'

const store = useStore()
const chartRef = ref(null)
let chartInstance = null

const averageAmountByCategory = computed(() => {
  return store.getters['sales/averageAmountByCategory']
})

function getChartOptions() {
  return {
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        const item = params[0]
        return `${item.name}<br/>Ortalama Tutar: ${item.value} ₺`
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '12%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: averageAmountByCategory.value.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 20
      }
    },
    yAxis: {
      type: 'value',
      name: 'Tutar'
    },
    series: [
      {
        name: 'Ortalama Tutar',
        type: 'bar',
        data: averageAmountByCategory.value.map(item => item.value),
        barWidth: 40,
        label: {
          show: true,
          position: 'top',
          formatter: '{c} ₺'
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

watch(averageAmountByCategory, () => {
  renderChart()
}, { deep: true })

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