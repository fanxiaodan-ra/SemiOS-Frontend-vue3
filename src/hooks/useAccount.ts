import useUserStore from '@/store'
import { ref } from 'vue'
import { loginAccount, signature, cookieInfo, logout } from '@/api/user'
import { randomCoding, addressToLowerCase } from '@/utils'
import { APP_NETWORK, APP_LOCAL_NAME } from '@/config'
import { sig } from '@/common/web3service'
import { initWeb3 } from '@/common/walletService/wallet'
import { useRouter } from 'vue-router'
import useToastNotify from '@/hooks/useToastNotify'
declare global {
  const $onboard: typeof initWeb3
  interface Window {
    $onboard: typeof initWeb3
  }
}
window.$onboard = initWeb3
const { notifyErr } = useToastNotify()

export default function useAccount() {
  const router = useRouter()
  const isLoading = ref(true)
  let unsubscribeFc = null as any

  const login = async () => {
    const store = useUserStore()
    const wallets = await $onboard.connectWallet()
    console.log(wallets, 'wallets')
    if (wallets?.length === 0) return
    const address = addressToLowerCase(wallets[0].accounts[0].address)
    const res = await loginAccount(address)
    if (res.resultCode === 100) {
      store.setIsAcceptSign(!res.data)
      if (res.data) {
        await setUser()
      }
    } else {
      setLogOut()
    }
  }

  const onWallets = () => {
    const store = useUserStore()
    const wallets = $onboard.state.select('wallets')
    unsubscribeFc = wallets.subscribe((update) => {
      console.log(update, 'update')
      if (update?.length > 0) {
        if (
          store.UserInfo.address &&
          addressToLowerCase(store.UserInfo.address) !==
          addressToLowerCase(update[0].accounts[0].address)
        ) {
          setLogOut()
        } else {
          store.setNeworkId(update[0].chains[0].id)
          // const currentState = onboard.state.get().wallets
          // console.log(currentState, 'currentState')
        }
      } else {
        setLogOut()
      }
    })
  }
  const setUser = async () => {
    const store = useUserStore()
    const wallets = $onboard.state.get().wallets
    console.log(wallets, 'walletss')
    store.setNeworkId(wallets[0].chains[0].id)
    $onboard.state.actions.setPrimaryWallet(wallets[0])
    const wallet = {
      address: wallets[0].accounts[0].address,
      chainId: wallets[0].chains[0].id,
      label: wallets[0].label,
    }
    if (unsubscribeFc === null) {
      unsubscribeFc = onWallets()
    }
    const user = await cookieInfo()
    store.setUserInfo(user.data)
    console.log(JSON.stringify(wallet), 'JSON.stringify(wallet)')
    const localData = {
      ...user.data, ...wallet
    }
    window.localStorage.setItem(APP_LOCAL_NAME, JSON.stringify(localData))
    isLoading.value = false
  }

  const setLogOut = async () => {
    const store = useUserStore()
    logout()
    store.setUserInfo({
      token: '',
      name: '',
      address: '',
      time: '',
      avatar: '',
    })
    store.setIsAcceptSign(false)
    const wallets = $onboard.state.get().wallets
    console.log(wallets, 'walletswalletswalletswallets')
    if (wallets?.length !== 0) {
      $onboard.disconnectWallet({ label: wallets[0].label })
    }
    store.setNeworkId('')
    window.localStorage.setItem(APP_LOCAL_NAME, '')
    console.log(unsubscribeFc, 'unsubscribeFc')
    if (unsubscribeFc) {
      unsubscribeFc()
      unsubscribeFc = null
    }
    router.push({
      path: '/',
    })
  }

  const getCookieUser = () => {
    const store = useUserStore()

    const cookies = document.cookie.split('; ')
    if (cookies && cookies.length > 0 && cookies[0] !== '') {
      let json = {} as any
      for (let i = 0; i < cookies.length; i++) {
        let data = cookies[i].split('=')
        json[data[0]] = data[1]
      }
      json.name = json.name ? json.name.replace(new RegExp('_', 'g'), ' ') : ''
      store.setUserInfo(json)
    } else {
      setLogOut()
      isLoading.value = false
    }
  }
  const setLogin = async () => {
    const isLogin = getLoginStatus(true)
    if (
      isLogin
    ) {
      const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem(APP_LOCAL_NAME) as any)
      await $onboard.connectWallet({
        autoSelect: {
          label: previouslyConnectedWallets.label,
          disableModals: true,
        },
      })
      getCookieUser()
      await setUser()
    } else {
      isLoading.value = false
    }
  }

  const setIsAcceptSign = () => {
    const store = useUserStore()
    store.setIsAcceptSign(false)
  }

  const signData = async () => {
    const sig = await getSig()
    if (sig) {
      setUser()
    } else {
      return false
    }
    setIsAcceptSign()
  }

  const getNonce = () => {
    const wallets = $onboard.state.get().wallets
    const adress =
      wallets?.length > 0
        ? addressToLowerCase(wallets && wallets[0].accounts[0].address)
        : ''
    const nonce =
      randomCoding(8) +
      '-' +
      randomCoding(4) +
      '-' +
      randomCoding(4) +
      '-' +
      randomCoding(4) +
      '-' +
      randomCoding(12)
    return `Welcome to Semios!\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nWallet address:\n${adress}\n\nNonce:\n${nonce}`
  }
  function getCookieValue(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  }
  const getSig = () => {
    const text = getNonce()
    const time = getCookieValue('time')
    const userInfoTime = Number(time)
    if (userInfoTime > 0) {
      const time = new Date().getTime() / 1000 - userInfoTime
      if (time <= 86400) {
        return true
      } else {
        const data = setSigData(text)
        return data
      }
    } else {
      const data = setSigData(text)
      return data
    }
  }

  const setSigData = async (text: string) => {
    try {
      const wallets = $onboard.state.get().wallets
      const signa = await sig().signMessage(text)
      if (signa && wallets && wallets.length > 0) {
        const isSign = await signature({
          userAddress: addressToLowerCase(wallets[0].accounts[0].address),
          signatureHash: signa,
          originalText: text,
        })
        return isSign
      } else {
        return false
      }
    } catch (error) {
      notifyErr('User denied message signature.', true)
      console.log(error, 'error')
    }
  }

  const setChainId = async () => {
    const store = useUserStore()

    const wallets = $onboard.state.get().wallets
    if (wallets && wallets.length > 0 && store.NeworkId !== APP_NETWORK) {
      await $onboard.setChain({ chainId: APP_NETWORK })
    }
  }
  const getTrading = async (callback?: Function) => {
    const store = useUserStore()

    if (store.UserInfo.address) {
      if (store.NeworkId !== APP_NETWORK) {
        setChainId()
        return false
      } else {
        return true
      }
    } else {
      await login()
      callback && callback()
      return false
    }
  }
  const getLoginStatus = (type: boolean = false) => {
    const store = useUserStore()

    if (
      document.cookie.indexOf('user=') > -1 &&
      document.cookie.indexOf('address=') > -1
    ) {
      const previouslyConnectedWallets = window.localStorage.getItem(
        APP_LOCAL_NAME
      )
        ? JSON.parse(window.localStorage.getItem(APP_LOCAL_NAME) as any)
        : ''
      if (
        previouslyConnectedWallets &&
        document.cookie.indexOf(
          addressToLowerCase(previouslyConnectedWallets.address)
        ) > -1
      ) {
        store.setUserInfo({
          ...previouslyConnectedWallets
        })
        return type ? previouslyConnectedWallets : true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  return {
    login,
    setLogOut,
    setLogin,
    setIsAcceptSign,
    isLoading,
    signData,
    setChainId,
    getTrading,
    getSig,
    getLoginStatus
  }
}
