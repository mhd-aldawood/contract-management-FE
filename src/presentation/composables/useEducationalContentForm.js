// src/presentation/composables/useEducationalContentForm.js
import { ref, reactive } from 'vue'
import EducationalContent from '@/domain/entities/EducationalContent'
import container from '@/di/container'
import { createLogger } from '@/core/logger';
const log = createLogger('useEducationalContentForm');
export function useEducationalContentForm(type = 'educational-content') {
  const form = reactive(EducationalContent.empty(type))
  const saving = ref(false)
  const error = ref('')

  function reset() {
    Object.assign(form, EducationalContent.empty(type))
    error.value = ''
  }

  function toggleContentVisibility() {  // ✅ added
    form.isHidden =!form.isHidden
  }

  function addPaymentRow() {
    form.paymentSchedule.push({ label: '', amount: 0, dueDate: '' })
  }

  function removePaymentRow(index) {
    form.paymentSchedule.splice(index, 1)
  }

   function handleFormUpload(payload) {
    // payload can be a File directly, or an event/array from some UI libs
    const picked =
      payload instanceof File          ? payload :
      payload?.target?.files?.[0]      ? payload.target.files[0] :
      payload?.file                    ? payload.file :
      Array.isArray(payload)           ? payload[0] :
      null

    if (!picked) {
      log.warn('handleUpload: no file found in payload', payload)
      return
    }

     form.fileName = picked.name     // ✅ now the entity carries the name
     form.fileUrl = picked.fileUrl
     form.file=picked
     log.debug('handleUpload: file set', picked.name, picked.size, picked.type)
  }
  function clearFile(){
    form.fileName=''
  }


  async function save() {
    saving.value = true
    error.value = ''
    try {
      log.debug("useEducationalContentForm save func",form)
      const saved = await container.saveEducationalContentUseCase.execute(form)
      Object.assign(form, saved instanceof EducationalContent ? saved.toJSON() : saved)

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
    handleFormUpload,
    toggleContentVisibility,   // ✅
    save,
    reset,
    clearFile,
    addPaymentRow,
    removePaymentRow,
  }
}