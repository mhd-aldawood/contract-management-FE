<template>
  <div class="agreement-section">
    <div class="pdf-content">
      <h2 class="title">تفاصيل اتفاقية محتوى تعليمي</h2>

      <table>
        <FormRow label="رقم الاتفاقية">
          <input v-model="form.agreementNumber" type="text" placeholder="أدخل رقم الاتفاقية" />
        </FormRow>

        <FormRow label="اسم الاتفاقية">
          <input v-model="form.name" type="text" placeholder="أدخل اسم الاتفاقية" />
        </FormRow>

        <FormRow label="اسم الشركة المتعاقد معها">
          <input v-model="form.companyName" type="text" placeholder="أدخل اسم الشركة" />
        </FormRow>

        <FormRow label="موضوع الاتفاقية">
          <input v-model="form.subject" type="text" placeholder="أدخل موضوع الاتفاقية" />
          <ContractActions @print="handlePrint" class="contract-actions" @upload="handleUpload" />
        </FormRow>

        <FormRow label="المقررات الإضافية المكلف بها">
          <input v-model="form.additionalCourses" type="text" placeholder="أدخل المقررات الإضافية" />
        </FormRow>

        <FormRow label="الكلفة التقديرية">
          <input v-model.number="form.estimatedCost" type="number" placeholder="0.00" />
        </FormRow>

        <FormRow label="بداية الاتفاقية">
          <input v-model="form.startDate" type="date" />
        </FormRow>

        <FormRow label="نهاية الاتفاقية">
          <input v-model="form.endDate" type="date" />
        </FormRow>

        <FormRow label="طريقة الدفع">
          <PaymentSection :form="form" :add-payment-row="addPaymentRow" :remove-payment-row="removePaymentRow" />
        </FormRow>

        <FormRow label="المبلغ المستحق الفصلي">
          <input v-model.number="form.quarterlyDue" type="number" placeholder="0.00" />
        </FormRow>

        <FormRow label="حالة الاتفاقية">
          <input v-model="form.status" type="text" placeholder="مثال: نشط، قيد الانتظار" />
        </FormRow>

        <FormRow label="الصرف">
          <input v-model="form.disbursement" type="text" placeholder="تفاصيل الصرف" />
        </FormRow>

        <FormRow label="نوع الموازنة">
          <select v-model="form.budgetType" class="table-input">
            <option value="current">جاري</option>
            <option value="investment">استثماري</option>
          </select>
        </FormRow>
      </table>

      <div class="contract-text-area">
        <textarea v-model="form.contractText" rows="10" placeholder="نص العقد..."></textarea>
      </div>

      <div class="actions">
        <button :disabled="saving" @click="handleSave">
          {{ saving ? 'جارٍ الحفظ...' : 'حفظ الاتفاقية' }}
        </button>
        <label class="checkbox-container">
          <input type="checkbox" id="hide-content-chk" v-model="isHidden" @change="toggleContentVisibility" />
          <span>إخفاء المحتوى</span>
        </label>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
  </div>
</template>

<script setup>
import FormRow from '@/presentation/components/educationalcontent/FormRow.vue'
import PaymentSection from '@/presentation/components/educationalcontent/PaymentSection.vue'
import ContractActions from '@/presentation/components/educationalcontent/ContractActions.vue'
import { useEducationalContentForm } from '@/presentation/composables/useEducationalContentForm'

const {
  form,
  saving,
  error,
  save,
  reset,
   isHidden,                  // ✅ from composable
  toggleContentVisibility,   // ✅ from composable
  addPaymentRow,
  removePaymentRow,
} = useEducationalContentForm('educational-content')

async function handleSave() {
  try {
    await save()
    alert('تم الحفظ بنجاح ✅')
  } catch (e) {
    console.error(e)
  }
}

function handlePrint() {
  window.print()
}

function handleUpload(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.contractText = e.target.result
  }
  reader.readAsText(file)
}

</script>

<style scoped>
.agreement-section {
  padding: 2rem;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ddd;
}

th {
  background: #f7fafc;
  text-align: right;
  width: 200px;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.4rem 0.6rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 0.95rem;
}

.actions button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #667eea;
  color: white;
}

.actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #e53e3e;
  margin-top: 1rem;
}

.contract-text-area {
  margin-top: 1.5rem;
}

.form-input {
  flex: 1;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  /* ✅ ترتيب عمودي */
  gap: 0.75rem;
  /* ✅ مسافة من الأعلى والأسفل بين العناصر */
  align-items: stretch;
}

.contract-text-area textarea {
  direction: rtl;
  text-align: right;
}

.contract-text-area textarea::placeholder {
  direction: rtl;
  text-align: right;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  direction: rtl;
  /* ✅ ensures right is the start */
  justify-content: flex-start;
  /* ✅ buttons align to the right */
}

.checkbox-container {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #2d3748;
  user-select: none;
  direction: rtl;

  /* ✅ Box styling */
  padding: 0.55rem 1rem;
  border: 1.5px solid #cbd5e0;
  border-radius: 8px;
  background: #ffffff;
  transition: all 0.2s ease;
}

.checkbox-container:hover {
  border-color: #667eea;
  background: #f7fafc;
}

.checkbox-container input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: #667eea;
  cursor: pointer;
}

/* ✅ Highlight when checked */
.checkbox-container:has(input:checked) {
  border-color: #667eea;
  background: #edf2ff;
  color: #4c51bf;
}
</style>