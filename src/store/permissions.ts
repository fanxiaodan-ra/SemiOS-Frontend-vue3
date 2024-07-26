import { acceptHMRUpdate, defineStore } from "pinia";
import {
  myPermissions,
  userPermissionsNft,
} from "@/api/user";
import {
  workPermissionDetail,
  workPermissionDetailNode,
  workPermissionDetailNodeInfo
} from '@/api/works';

type Permission = {
  permissionType: number,
  daoId: string,
  daoName: string,
  projectId: string,
  workId: number,
  daoNameNft: string,
  workNumber: number,
  erc721Token: string,
  nftsName?: string,
  ownerAddress?: string,
}

const permissionNameMap = new Map([
  ['1', 'SubNodes Edit Information Permission'],
  ['2', 'Edit On-chain Parameters Permission'],
  ['3', 'Edit Strategies Permission'],
  ['4', 'Starter Reward Claim Permission'],
  ['5', 'Treasury Permission'],
  ['6', 'Seed Nodes Edit Information Permission'],
  ['7', 'Top-Up Governance Permission']
])

const processPermissions = (permissions: Permission[]) => {
  return permissions.map((item: Permission) => {
    const nftsName = `${item.daoNameNft}.${item.workNumber}`
    const nftsLink = `/workDetails?id=${item.workId}`
    const nodeLink = item.permissionType <= 4 ? `/nodeDetails?id=${item.daoId}` : `/daoCollectionAnalytics?id=${item.daoId}`
    return {
      ...item,
      nodeLink,
      nftsName,
      nftsLink,
      permissionName: permissionNameMap.get(item.permissionType.toString()) || '',
    }
  })
}
export const usePermissionStore = defineStore({
  id: 'permissions',
  state: () => ({
    myPermissions: [] as Permission[],
    myPermissionsPageInfo: {
      pageNo: 0,
      pageSize: 10,
      totalItems: 0
    },
    permissionList: [] as Permission[],
    permissionListPageInfo: {
      pageNo: 1,
      pageSize: 10
    }
  }),
  actions: {
    async getUserPermissions({ userAddress, pageNo }: {
      userAddress: string
      pageNo: number
    }) {
      try {
        const res = await myPermissions({
          userAddress,
          pageNo: pageNo,
          pageSize: this.myPermissionsPageInfo.pageSize
        })
        this.myPermissions = processPermissions(res.dataList)
        this.myPermissionsPageInfo.totalItems = res.page.count
        this.myPermissionsPageInfo.pageNo = res.page.pageNo
      } catch (error) {
        console.error(error)
      }
    },
    async getUserPermissionsNft({ workId }: {
      workId: number
    }) {
      try {
        const res = await userPermissionsNft({
          workId,
          pageSize: -1
        })
        return res.dataList
      } catch (error) {
        console.error(error)
      }
    },
    async getNftPermissionInDetail(workId: number) {
      try {
        const res = await workPermissionDetail({
          workId,
          pageSize: -1
        })
        return processPermissions(res.dataList)
      } catch (error) {
        console.error(error)
      }
    },
    async getPermissionListInDetail({ daoId }: {
      daoId: string,
    }) {
      try {
        const res = await workPermissionDetailNode({
          daoId,
        })
        this.permissionList = processPermissions(res.dataList)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
      } catch (error) {
        console.error(error)
      }
    },
    async getUserPermissionsNftInDetail({ daoId, permissionType }: {
      daoId: string,
      permissionType: number
    }) {
      try {
        const res = await workPermissionDetailNodeInfo({
          daoId,
          permissionType
        })
        return res.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}

export default usePermissionStore;