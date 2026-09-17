<template>
  <tr>
    <td class="form-row-cell">
      <div class="form-input">
        <slot />
      </div>
      <label class="form-label">{{ label }}</label>
    </td>
  </tr>
</template>

<script setup>
defineProps({ label: String })
</script>

<style scoped>
.form-row-cell {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ddd;
  gap: 0;
}

.form-label {
  width: 200px;
  text-align: right;
  font-weight: bold;
  background: #f7fafc;
  padding: 0.4rem 0.6rem;
  margin: 0;
  border-left: 1px solid #ddd;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
}

/* ✅ :deep() is required to reach slotted inputs */
.form-input :deep(input),
.form-input :deep(select),
.form-input :deep(textarea) {
  width: 100%;
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 0;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  direction: rtl !important;        /* ✅ RTL direction */
  text-align: right !important;     /* ✅ text & placeholder start from right */
}

/* ✅ Ensure placeholder starts from the right */
.form-input :deep(input::placeholder),
.form-input :deep(textarea::placeholder) {
  text-align: right !important;
  direction: rtl !important;
}
</style>