<template>
  <section class="dashboard-page">
    <div class="dashboard-header">
      <div>
        <h1>Satış Dashboard</h1>
        <p>Vuex, Props ve ECharts pratik projesi</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="placeholder-box">Kart alanı</div>
      <div class="placeholder-box">Kart alanı</div>
      <div class="placeholder-box">Kart alanı</div>
    </div>

    <div class="charts-grid">
      <div class="placeholder-box large">Bar chart alanı</div>
      <div class="placeholder-box large">Pie chart alanı</div>
    </div>

    <div class="placeholder-box table-box">Tablo alanı</div>
  </section>
</template>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  padding: 24px;
  background: #f5f7fb;
}

.dashboard-header {
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.dashboard-header p {
  color: #6b7280;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.placeholder-box {
  background: white;
  border-radius: 18px;
  padding: 24px;
  min-height: 120px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-weight: 600;
}

.large {
  min-height: 360px;
}

.table-box {
  min-height: 260px;
}

@media (max-width: 992px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
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