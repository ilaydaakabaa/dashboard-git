<template>
  <section class="dashboard-page">
    <div class="dashboard-header">
      <div>
<h1>Yönetim Dashboard</h1>
<p>Satış verilerinin genel görünümü</p>
      </div>
    </div>

    <div class="stats-grid">
      <StatCard title="Toplam Satış" :value="`${totalSales} ₺`" />
      <StatCard title="Toplam Sipariş" :value="totalOrders" />
      <StatCard title="En İyi Kategori" :value="bestCategory" />
    </div>

    <!-- <div class="charts-grid">
      <SalesBarChart />
      <PaymentPieChart />
      <AverageAmountBarChart />
    </div> -->
        <div class="charts-grid">
      <BarChart
        title="Kategori Bazlı Toplam Satış"
        :chartData="categorySalesChartData"
        seriesName="Toplam Satış"
        yAxisName="Satış"
        valueSuffix=" ₺"
      />

      <BarChart
        title="Kategoriye Göre Ortalama Tutar"
        :chartData="averageAmountByCategory"
        seriesName="Ortalama Tutar"
        yAxisName="Ortalama"
        valueSuffix=" ₺"
      />

      <BarChart
        title="Kategoriye Göre Sipariş Sayısı"
        :chartData="ordersCountByCategory"
        seriesName="Sipariş Sayısı"
        yAxisName="Adet"
        valueSuffix=""
      />
    </div>

    <RecentOrdersTable :orders="recentOrders" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import StatCard from '@/components/dashboard/StatCard.vue'
import SalesBarChart from '@/components/dashboard/SalesBarChart.vue'
import PaymentPieChart from '@/components/dashboard/PaymentPieChart.vue'
import AverageAmountBarChart from '@/components/dashboard/AverageAmountBarChart.vue'
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
const store = useStore()

const totalSales = computed(() => store.getters['sales/totalSales'])
const totalOrders = computed(() => store.getters['sales/totalOrders'])
const bestCategory = computed(() => store.getters['sales/bestCategory'])
const recentOrders = computed(() => store.getters['sales/recentOrders'])


const categorySalesChartData = computed(() => {
  return store.getters['sales/categorySalesChartData'] || []
})

const averageAmountByCategory = computed(() => {
  return store.getters['sales/averageAmountByCategory'] || []
})

const ordersCountByCategory = computed(() => {
  return store.getters['sales/ordersCountByCategory'] || []
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(to bottom, #f8fafc, #eef2ff);
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 2rem;
  margin-bottom: 8px;
  color: #0f172a;
  line-height: 1.2;
}

.dashboard-header p {
  color: #6b7280;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
  align-items: stretch;
}

@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .dashboard-page {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }

  .dashboard-header p {
    font-size: 0.95rem;
  }
}
</style>