<template>
  <div class="chart-card">
    <h2 class="chart-title">Ödeme Türleri</h2>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'

const store = useStore()
const chartRef = ref(null)
let chartInstance = null

const paymentTypeChartData = computed(() => {
  return store.getters['sales/paymentTypeChartData']
})

function getChartOptions() {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/>Tutar: {c} ₺ ({d}%)'
    },
    legend: {
      bottom: 0
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['50%', '45%'],
        data: paymentTypeChartData.value,
        label: {
          formatter: '{b}: {d}%'
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

watch(paymentTypeChartData, () => {
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
}

.chart-title {
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #0f172a;
}

.chart {
  width: 100%;
  height: 320px;
}

@media (max-width: 576px) {
  .chart {
    height: 280px;
  }
}
</style>