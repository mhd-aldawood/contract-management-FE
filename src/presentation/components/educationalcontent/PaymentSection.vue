<template>
  <div class="payment-section">
    <select v-model="form.paymentMethod" class="table-input">
      <option value="">-- اختر طريقة الدفع --</option>
      <option value="text">نص</option>
      <option value="table">جدول</option>
    </select>

    <div v-if="form.paymentMethod === 'text'" class="payment-text-container">
      <input v-model="form.paymentText" type="text" placeholder="أدخل تفاصيل وشروط الدفع هنا..." />
    </div>

    <div v-if="form.paymentMethod === 'table'" class="payment-table-container">
      <table class="sub-table">
        <thead>
          <tr>
            <th>الدفعة</th>
            <th>المبلغ</th>
            <th>تاريخ الاستحقاق</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in form.paymentSchedule" :key="i">
            <td><input v-model="row.label" type="text" /></td>
            <td><input v-model.number="row.amount" type="number" placeholder="0.00" /></td>
            <td><input v-model="row.dueDate" type="date" /></td>
            <td><button type="button" @click="removePaymentRow(i)">✕</button></td>
          </tr>
        </tbody>
      </table>
      <button type="button" @click="addPaymentRow">+ إضافة دفعة</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ form: Object, addPaymentRow: Function, removePaymentRow: Function })
</script>