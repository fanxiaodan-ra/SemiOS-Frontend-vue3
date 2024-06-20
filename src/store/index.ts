import { acceptHMRUpdate, defineStore } from 'pinia';
export interface State {
  UserInfo: {
    token: string
    name: string
    address: string
    time: number | string
    avatar: string
    role?: number
  }
  addNodeType: number
  IsAcceptSign: boolean
  PactAbi: {
    [key: string]: string
  }
  NeworkId: string
  ScreenWidth: number
}


export const useUserStore = defineStore({
  id: 'user',
  state: (): State => ({
    UserInfo: {
      token: '',
      name: '',
      address: '',
      time: 0,
      avatar: '',
      role: 0,
    },
    addNodeType: 0,
    IsAcceptSign: false,
    PactAbi: {},
    NeworkId: '',
    ScreenWidth: 0,
  }),
  actions: {
    setUserInfo(info: State['UserInfo']) {
      const { token, name, address, time, avatar, role } = info
      this.UserInfo.token = token
      this.UserInfo.name = name
      this.UserInfo.address = address
      this.UserInfo.time = time
      this.UserInfo.avatar = avatar
      this.UserInfo.role = role
    },
    setNodeType(nodeType: State['addNodeType']) {
      this.addNodeType = nodeType
    },
    setIsAcceptSign(isSign: State['IsAcceptSign']) {
      this.IsAcceptSign = isSign
    },
    setPactAbi(abi: State['PactAbi']) {
      this.PactAbi = abi
    },
    setNeworkId(netWorkId: State['NeworkId']) {
      this.NeworkId = netWorkId
    },
    setScreenWidth(screenWidth: State['ScreenWidth']) {
      this.ScreenWidth = screenWidth
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));

export default useUserStore;

