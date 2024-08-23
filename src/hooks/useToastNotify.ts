import { useToast, POSITION } from 'vue-toastification'
const sucFiltr = (type: string) => {
  if (type === 'dao') {
    return 'The setup is successful, please open My Nodes to view.'
  }
  if (type === 'work') {
    return 'The work is minted successful, please open NFT Minted to view.'
  }
  if (type === 'collect') {
    return 'Collect successfully!'
  }

  if (type === 'Collect&Swap') {
    return 'The Collect&Swap is successful!'
  }
  if (type === 'Burn') {
    return 'The swap is successful!'
  }
  return 'Updated!'
}

const errFiltr = (err: string) => {
  if (err.toLowerCase().indexOf('-32000') > -1) {
    return 'You rejected the request in your wallet.'
  }
  if (err.toLowerCase().indexOf('-32015') > -1) {
    return 'Execution reverted. Please reach out to the collection owner to troubleshoot.'
  }
  if (err.toLowerCase().indexOf('-32601') > -1) {
    return 'The method does not exist / is not available.'
  }
  if (err.toLowerCase().indexOf('-32603') > -1) {
    return 'Execution reverted. Please reach out to the collection owner to troubleshoot.'
  }
  if (err.toLowerCase().indexOf('-4001') > -1) {
    return 'You rejected the request in your wallet.'
  }
  if (err.toLowerCase().indexOf('-4100') > -1) {
    return 'The requested method and/or account has not been authorized.'
  }
  if (err.toLowerCase().indexOf('-4902') > -1) {
    return 'Requested chain has not been added.'
  }
  if (err.toLowerCase().indexOf('0x60be3b59') > -1) {
    return 'Minting failed. The minting limit has been reached.'
  }
  if (err.toLowerCase().indexOf('insufficient') > -1) {
    return 'Insufficient wallet funds, please try again later.'
  }
  if (err.toLowerCase().indexOf('execution reverted') > -1) {
    return 'Transaction may reverted, please try again later.'
  }
  if (err.toLowerCase().indexOf('transaction failed') > -1) {
    return 'Transaction may reverted, please try again later.'
  }
  if (err.toLowerCase().indexOf('user rejected') > -1) {
    return 'User denied transaction.'
  }
  if (err.toLowerCase().indexOf('user denied') > -1) {
    return 'User denied transaction.'
  }
  return 'Transaction has been cancelled, please try again later.'
}
export default function useToastNotify() {
  const toast = useToast()
  const notifyErr = (err: string, type: boolean = false) => {
    const errMsg = type ? err : errFiltr(err)
    toast.error(
      // {
      //   // component: AlarmInfoDialog,
      //   // 事件回调，组件中emit的方法放在这里进行回调
      //   // listeners: {
      //   //     showDialog: () => alarmDetail.value.open()
      //   // }
      // },
      errMsg,
      {
        position: POSITION.BOTTOM_RIGHT, //出现位置
        timeout: 6200, // 延时关闭时间
        closeOnClick: true, // 单击即关闭
        pauseOnFocusLoss: true,
        pauseOnHover: true, // 鼠标移入暂停
        draggable: false, // 允许通过拖动和滑动事件关闭
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false, // 显示/隐藏进度条
        closeButton: false,
        icon: true,
        rtl: false,
      }
    )
  }
  const notifyInfo = () => {
    toast.info('我是默认的我可以自定义!', {
      position: POSITION.BOTTOM_RIGHT, //出现位置
      timeout: 6000, // 延时关闭时间
      closeOnClick: true, // 单击即关闭
      pauseOnFocusLoss: true,
      pauseOnHover: true, // 鼠标移入暂停
      draggable: false, // 允许通过拖动和滑动事件关闭
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false, // 显示/隐藏进度条
      closeButton: false,
      icon: {
        iconClass: 'iconfont icon-logoicon', // Optional
        iconChildren: '', // Optional
        iconTag: 'span', // Optional
      },
      rtl: false,
    })
  }

  const notifySuc = (msg: string, type: boolean = false) => {
    const suc = type ? msg : sucFiltr(msg)
    toast.success(suc, {
      position: POSITION.BOTTOM_RIGHT, //出现位置
      timeout: 6100, // 延时关闭时间
      closeOnClick: true, // 单击即关闭
      pauseOnFocusLoss: true,
      pauseOnHover: true, // 鼠标移入暂停
      draggable: false, // 允许通过拖动和滑动事件关闭
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false, // 显示/隐藏进度条
      closeButton: false,
      icon: true,
      rtl: false,
    })
  }
  return {
    notifyErr,
    notifyInfo,
    notifySuc,
  }
}
