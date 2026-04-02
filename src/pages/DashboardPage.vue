<template>
  <section class="dashboard-page">
    <div class="dashboard-header">
      <div>
        <h1>Satış Dashboard</h1>
        <p>Vuex, Props ve ECharts pratik projesi</p>
      </div>
    </div>

    <div class="stats-grid">
      <StatCard title="Toplam Satış" :value="`${totalSales} ₺`" />
      <StatCard title="Toplam Sipariş" :value="totalOrders" />
      <StatCard title="En İyi Kategori" :value="bestCategory" />
    </div>

    <div class="charts-grid">
      <SalesBarChart />
      <PaymentPieChart />
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
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable.vue'

const store = useStore()

const totalSales = computed(() => store.getters['sales/totalSales'])
const totalOrders = computed(() => store.getters['sales/totalOrders'])
const bestCategory = computed(() => store.getters['sales/bestCategory'])
const recentOrders = computed(() => store.getters['sales/recentOrders'])
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
}

.dashboard-header p {
  color: #6b7280;
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
}
</style>