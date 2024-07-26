import { describe, it, expect, vi, MockedFunction } from 'vitest'
import usePermission from '@/hooks/useUserPermission'
import usePermissionStore from '@/store/permissions'
import { createPinia, setActivePinia } from 'pinia';

describe('usePermission', () => {
  it('should return true when user has permission', async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    const permissionStore = usePermissionStore()
    const { userPermission, getPermission } = usePermission()
    vi.spyOn(permissionStore, 'getUserPermissionsNftInDetail');
    (permissionStore.getUserPermissionsNftInDetail as MockedFunction<any>).mockResolvedValue({
      isPermission: true,
      workId: 100,
      daoNameNft: 'nft test',
      workNumber: 0,
    });

    await getPermission({
      daoId: '1',
      permissionType: 1,
    })

    expect(userPermission.value.isPermission).toBe(true)
    expect(userPermission.value.workId).toBe(100)
    expect(userPermission.value.daoNameNft).toBe('nft test')
    expect(userPermission.value.workNumber).toBe(0)
  })
})