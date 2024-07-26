import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { cancelAllRequests } from '@/api/request'
import Page from '@/views/Index.vue'
import useAccount from '@/hooks/useAccount'
const { getLoginStatus } = useAccount()
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Page,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/addNodes/Index.vue'),
      },
      {
        path: '/setupNodes',
        name: 'setupNodes',
        component: () => import('@/views/addNodes/Index.vue'),
      },

      {
        path: '/explore',
        name: 'explore',
        component: () => import('@/views/explore/Index.vue'),
      },
      {
        path: '/nodeDetails',
        name: 'nodeDetails',
        component: () => import('@/views/nodeDetails/Index.vue'),
      },
      {
        path: '/workDetails',
        name: 'workDetails',
        component: () => import('@/views/workDetails/Index.vue'),
      },
      {
        path: '/editWork',
        name: 'editWork',
        component: () => import('@/views/editWork/Index.vue'),
      },
      {
        path: '/addWork',
        name: 'addWork',
        component: () => import('@/views/addWork/Index.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/Index.vue'),
        beforeEnter: (_, __, next) => {
          if (getLoginStatus()) {
            next()
          } else {
            next('/')
          }
        }
      },
      {
        path: '/editInformation',
        name: 'editInformation',
        component: () => import('@/views/editNodes/EditInformation.vue'),
      },
      {
        path: '/editOnChainParameters',
        name: 'editOnChainParameters',
        component: () => import('@/views/editNodes/EditOnChainParameters.vue'),
      },
      {
        path: '/editNodesStrategies',
        name: 'editNodesStrategies',
        component: () => import('@/views/editNodes/EditNodesStrategies.vue'),
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/Index.vue'),
      },
      {
        path: '/daoCollectionAnalytics',
        name: 'daoCollectionAnalytics',
        component: () => import('@/views/daoCollectionAnalytics/Index.vue'),
      },
      {
        path: '/dex',
        name: 'dex',
        component: () => import('@/views/dex/Index.vue'),
      },
      {
        path: '/setupPlan',
        name: 'setupPlan',
        component: () => import('@/views/setupPlan/Index.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((_, __, next) => {
  cancelAllRequests()
  next();
});

router.onError((error) => {
  console.error('Router error:', error);

  const isChunkLoadFailed = error.message.startsWith('Failed to fetch dynamically imported module');
  const targetPath = router.currentRoute.value.fullPath;

  if (isChunkLoadFailed) {
    window.location.reload();
    // 可选的延时处理确保资源加载完成
    setTimeout(() => {
      router.push(targetPath);
    }, 1000);
  }
});

export default router
