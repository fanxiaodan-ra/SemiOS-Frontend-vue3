import { ref } from 'vue'
import useAccount from '@/hooks/useAccount'
import { checkName } from '@/api/daos'

const useNameSubmit = (
  emit: (event: "setDaoName" | "setIsModeSelection", ...args: any[]) => void,
  daoName: string,
  formRef: { validate: () => Promise<{ valid: boolean }>  },
) => {
  const { getTrading } = useAccount()

  const btnLoading = ref(false)
  const errorMessage = ref<string[]>([])

  const submit = async () => {
    const isTrad = await getTrading()
    if (!isTrad) return
    btnLoading.value = true
    const { valid } = await formRef.validate()
    if (!valid) return (btnLoading.value = false)
    const data = {
      name: daoName,
      type: 0,
    }
    try {
      await checkName(data)
      emit('setDaoName', daoName)
      emit('setIsModeSelection', true)
      errorMessage.value = []
    } catch (e: any) {
      errorMessage.value = [e.resultDesc]
    }
    btnLoading.value = false
  }

  return {
    submit,
    btnLoading,
    errorMessage,
  }
}
export default useNameSubmit;
