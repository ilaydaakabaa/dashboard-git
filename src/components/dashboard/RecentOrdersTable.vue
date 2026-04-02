<template>
  <div class="table-card">
    <h2 class="table-title">Son Siparişler</h2>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Müşteri</th>
            <th>Kategori</th>
            <th>Tutar</th>
            <th>Ödeme Türü</th>
            <th>Tarih</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.customer }}</td>
            <td>{{ order.category }}</td>
            <td>{{ order.amount }} ₺</td>
            <td>{{ order.paymentType }}</td>
            <td>{{ order.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  orders: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.table-card {
  background: white;
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  width: 100%;
  min-width: 0;
}

.table-title {
  margin-bottom: 16px;
  font-size: 1.1rem;
  color: #0f172a;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 14px 12px;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

th {
  color: #475569;
  font-size: 0.95rem;
}

td {
  color: #0f172a;
}

@media (max-width: 576px) {
  .table-card {
    padding: 16px;
  }

  .table-title {
    font-size: 1rem;
  }

  th,
  td {
    padding: 12px 10px;
    font-size: 0.92rem;
  }
}
</style>