// import blocknativeLogo from './icons/blocknative-logo'
// import blocknativeIcon from './icons/blocknative-icon'
// import { init } from '@web3-onboard/vue'
// import injectedModule from '@web3-onboard/injected-wallets'
// import walletConnectModule from '@web3-onboard/walletconnect'

// const dappId = '17292f6a-f7de-4ea0-8042-2db6915a118a'
// const INFURA_ID = '9aa3d95b3bc440fa88ea12eaa4456161'
// const injected = injectedModule()
// // const walletConnect = walletConnectModule(INFURA_ID)
// const wcV2InitOptions = {
//   /**
//    * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
//    */
//   projectId: '1e8f91e8d8fdb540a74d5f7aec10ac91',
//   /**
//    * Chains required to be supported by all wallets connecting to your DApp
//    */
//   requiredChains:
//     import.meta.env.VITE_APP_VERSION === 'prod' ||
//     import.meta.env.VITE_APP_VERSION === 'mainnet'
//       ? [1]
//       : [11155111],
//   dappUrl:
//     import.meta.env.VITE_APP_VERSION === 'prod' ||
//     import.meta.env.VITE_APP_VERSION === 'mainnet'
//       ? 'https://protodao.io/'
//       : 'https://test.protodao.io/',
// }
// const walletConnect = walletConnectModule(wcV2InitOptions)
// const initWeb3 = init({
//   theme: 'dark',
//   wallets: [injected, walletConnect],
//   chains: [
//     {
//       id: '0x1',
//       token: 'ETH',
//       label:
//         import.meta.env.VITE_APP_VERSION === 'mainnet'
//           ? 'Mainnet Fork'
//           : 'Ethereum',
//       rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
//     },
//     {
//       // id: "0xaa36a7",
//       id: 11155111,
//       token: 'SepoliaETH',
//       label: 'Sepolia',
//       // rpcUrl: "https://sepolia.drpc.org",
//       rpcUrl: 'https://rpc.sepolia.org/',
//     },
//     // {
//     //   id: "0xaa36a7",
//     //   token: "ETH",
//     //   label: "SepoliaETH",
//     //   rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/v8ZBq3bRWcFCwm4cwBJTgY-dml440H3l`,
//     //   // rpcUrl: "https://sepolia.drpc.org",
//     // },
//   ],
//   apiKey: dappId, // get this for free at https://explorer.blocknative.com/?signup=true
//   appMetadata: {
//     name: 'ProtoDAO, an innovative Web3 IP asset incubator',
//     icon: blocknativeIcon,
//     logo: blocknativeLogo,
//     description: 'an innovative Web3 IP asset incubator',
//     explore: 'https://protodao.io',
//     recommendedInjectedWallets: [
//       { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
//       { name: 'MetaMask', url: 'https://metamask.io' },
//     ],
//   },
//   accountCenter: {
//     desktop: {
//       position: 'bottomRight',
//       enabled: false,
//       minimal: false,
//     },
//     mobile: {
//       position: 'bottomRight',
//       enabled: false,
//       minimal: false,
//     },
//   },
//   notify: {
//     enabled: false, // default: true
//     transactionHandler: (transaction) => {
//       if (transaction) {
//         return {
//           // autoDismiss set to zero will persist the notification until the user excuses it
//           autoDismiss: 0,
//         }
//       }
//     },
//   },
//   connect: { autoConnectLastWallet: true, removeWhereIsMyWalletWarning: true },
//   disableFontDownload: true,
// })
// console.log(initWeb3, 'initWeb3initWeb3initWeb3initWeb3')
