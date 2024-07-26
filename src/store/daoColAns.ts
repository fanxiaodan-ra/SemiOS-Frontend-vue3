import { acceptHMRUpdate, defineStore } from "pinia";
import {
  togetherPlan,
  togetherPlanList,
  togetherPlanBasicInfo
} from '@/api/daos';

export const useDaoColAnsStore = defineStore({
  id: 'daoColAns',
  state: () => ({
    togetherPlan: {
      planTotal: 0,
      planOngoing: 0,
      planEnd: 0,
      planNotStarted: 0,
      projectId: '',
    },
    togetherPlanList: {
      dataList: [],
      page: {
        count: 0,
        pageNo: 0,
        pageSize: 0
      }
    }
  }),
  actions: {
    async getTogetherPlan(data: { daoId: string}) {
      try {
        const res = await togetherPlan(data)
        this.togetherPlan = res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getTogetherPlanList(data: { daoId: string }) {
      try {
        const res:any = await togetherPlanList(data)
        if (res.dataList && res.dataList.length > 0) {
          this.togetherPlanList.dataList = res.dataList
        }
        if (res.page) {
          this.togetherPlanList.page = {
            count: res.page.count,
            pageNo: res.page.pageNo,
            pageSize: res.page.pageSize
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getTogetherPlanBasicInfo(data: { planId: string }) {
      try {
        const res = await togetherPlanBasicInfo(data)
        return res.data
      } catch (error) {
        console.error(error)
      }
    },
    clearTogetherPlanList() {
      this.togetherPlanList = {
        dataList: [],
        page: {
          count: 0,
          pageNo: 0,
          pageSize: 0
        }
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDaoColAnsStore, import.meta.hot))
}

export default useDaoColAnsStore;