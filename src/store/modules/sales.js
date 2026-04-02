export default {
  namespaced: true,

  state() {
    return {
      orders: [
        { id: 1, customer: 'Ayşe', category: 'İçecek', amount: 120, paymentType: 'Kart', date: '2026-04-02' },
        { id: 2, customer: 'Mehmet', category: 'Tatlı', amount: 95, paymentType: 'Nakit', date: '2026-04-02' },
        { id: 3, customer: 'Zeynep', category: 'İçecek', amount: 150, paymentType: 'Kart', date: '2026-04-01' },
        { id: 4, customer: 'Ali', category: 'Fast Food', amount: 210, paymentType: 'Online', date: '2026-04-01' },
        { id: 5, customer: 'Ece', category: 'Tatlı', amount: 80, paymentType: 'Kart', date: '2026-03-31' },
        { id: 6, customer: 'Can', category: 'Fast Food', amount: 175, paymentType: 'Nakit', date: '2026-03-31' }
      ]
    }
  },

  getters: {
    orders(state) {
      return state.orders
    },

    totalSales(state) {
      return state.orders.reduce((sum, order) => sum + order.amount, 0)
    },

    totalOrders(state) {
      return state.orders.length
    },

    bestCategory(state) {
      const totals = {}

      state.orders.forEach(order => {
        if (!totals[order.category]) {
          totals[order.category] = 0
        }
        totals[order.category] += order.amount
      })

      let best = ''
      let max = 0

      for (const category in totals) {
        if (totals[category] > max) {
          max = totals[category]
          best = category
        }
      }

      return best
    },

    categorySalesChartData(state) {
      const totals = {}

      state.orders.forEach(order => {
        if (!totals[order.category]) {
          totals[order.category] = 0
        }
        totals[order.category] += order.amount
      })

      return Object.keys(totals).map(category => ({
        name: category,
        value: totals[category]
      }))
    },

    paymentTypeChartData(state) {
      const totals = {}

      state.orders.forEach(order => {
        if (!totals[order.paymentType]) {
          totals[order.paymentType] = 0
        }
        totals[order.paymentType] += order.amount
      })

      return Object.keys(totals).map(type => ({
        name: type,
        value: totals[type]
      }))
    },

    recentOrders(state) {
      return [...state.orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    }
  }
}