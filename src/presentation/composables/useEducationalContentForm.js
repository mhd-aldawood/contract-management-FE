// src/presentation/composables/useEducationalContentForm.js
import { ref, reactive } from 'vue'
import EducationalContent from '@/domain/entities/EducationalContent'
import container from '@/di/container'

export function useEducationalContentForm(type = 'educational-content') {
  const form = reactive(EducationalContent.empty(type))
  const saving = ref(false)
  const error = ref('')

  function reset() {
    Object.assign(form, EducationalContent.empty(type))
    error.value = ''
  }

  function addPaymentRow() {
    form.paymentSchedule.push({ label: '', amount: 0, dueDate: '' })
  }

  function removePaymentRow(index) {
    form.paymentSchedule.splice(index, 1)
  }

  async function save() {
    saving.value = true
    error.value = ''
    try {
      const saved = await container.saveEducationalContentUseCase.execute(form)
      Object.assign(form, saved)
      return saved
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      saving.value = false
    }
  }

  return {
    form,
    saving,
    error,
    save,
    reset,
    addPaymentRow,
    removePaymentRow,
  }
}