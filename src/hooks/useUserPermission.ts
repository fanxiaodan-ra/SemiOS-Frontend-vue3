import usePermissionStore from '@/store/permissions'
import { ref } from 'vue'

export default function usePermission() {
  const userPermission = ref({
    isPermission: false,
    workId: 0,
    daoNameNft: '',
    workNumber: 0,
  })
  const getPermission = async ({
    daoId,
    permissionType,
  }:{
    daoId: string,
    permissionType: number
  }) => {
    const permissionStore = usePermissionStore()
    const data = await permissionStore.getUserPermissionsNftInDetail({
      daoId,
      permissionType,
    })
    userPermission.value = data
  }

  return { userPermission, getPermission }
}
