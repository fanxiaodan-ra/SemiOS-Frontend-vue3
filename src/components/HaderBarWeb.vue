<template>
  <div>
    <v-app-bar flat class="initbgc init-hader">
      <div class="logoclass" @click="goIndex">
        <i class="iconfont icon-a-SEMIOSlogozuhe"></i>
      </div>

      <v-responsive width="320">
        <v-text-field
          density="compact"
          flat
          hide-details
          label="Search Nodes "
          rounded="lg"
          single-line
          variant="solo-filled"
          ref="inputRef"
          v-model="query"
          @keydown.enter="searchData"
        >
          <template v-slot:prepend-inner>
            <i
              class="iconfont icon-sousuo zindex click-icon"
              @click="searchData"
            />
          </template>
        </v-text-field>
      </v-responsive>
      <v-container class="mx-auto d-flex align-center justify-end">
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <i class="iconfont icon-tianjia ft24" />
            </v-btn>
          </template>
          <v-list>
            <router-link
              v-for="(item, index) in addTabs"
              :key="item.title"
              :to="item.path"
              class="a-style"
            >
              <v-list-item :value="index">
                <i class="iconfont icon-tianjia" />
                {{ item.title }}
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>

        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn class="text-none" v-bind="props"> Explore </v-btn>
          </template>
          <v-list>
            <router-link
              v-for="(item, index) in exploreTabs"
              :key="item.title"
              :to="item.path"
              class="a-style"
            >
              <v-list-item :value="index">
                <i class="iconfont icon-tianjia" />
                {{ item.title }}
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="text-none" v-bind="props" @click="goDex"> Redeem </v-btn>
          </template>
        </v-menu>
        <v-menu v-if="!userInfo.address">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" @click="loginWallet">
              <i class="iconfont icon-yonghu-fang-L ft24" />
            </v-btn>
          </template>
        </v-menu>
        <v-menu v-else open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <v-avatar
                :image="store.UserInfo.avatar || userInfo.avatar"
                size="24"
              ></v-avatar>
              <!-- <v-avatar color="grey-darken-1" size="24"></v-avatar> -->
              <!-- <i class="iconfont icon-yonghu-fang-L ft24" /> -->
            </v-btn>
          </template>
          <v-list>
            <router-link
              v-for="(item, index) in profileTabs"
              :key="item.title"
              :to="item.path"
              class="a-style"
            >
              <v-list-item :value="index" v-if="item.title !== 'Log Out'">
                <i class="iconfont icon-tianjia" />
                {{ item.title }}
              </v-list-item>
            </router-link>
            <v-list-item @click="setProfileTab">
              <i class="iconfont icon-tianjia" />
              Log Out
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" @click="loginWallet" v-if="!userInfo.address">
              <i class="iconfont icon-qianbao ft24" />
            </v-btn>
            <router-link
              to="profile?type=2"
              class="a-style"
              v-if="userInfo.address"
            >
              <v-list-item style="padding: 0">
                <v-btn>
                  <i class="iconfont icon-qianbao ft24" />
                </v-btn>
              </v-list-item>
            </router-link>
          </template>
        </v-menu>
      </v-container>
    </v-app-bar>
    <div>
      <is-accept-sign-dialog />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import IsAcceptSignDialog from '@/components/IsAcceptSignDialog.vue'
import { useRouter, useRoute } from 'vue-router'
// import { aPush } from '@/utils'
import useUserStore from '@/store'
const store = useUserStore()
// const openAurl = (push: string) => {
//   console.log(push, 'push')
//   return aPush(location.origin + push)
// }

const query = ref('')
const searchData = () => {
  if (!query.value) return
  router.push({
    path: '/search',
    query: {
      query: query.value,
    },
  })
  console.log('我被点击了')
}

const addTabs = [
  {
    title: 'Setup Nodes',
    path: '/setupNodes',
    icon: '',
  },
  {
    title: 'Add Works',
    path: '/addWork',
    icon: '',
  },
]
const exploreTabs = [
  {
    title: 'Works',
    path: 'explore?type=1',
    icon: '',
  },
  {
    title: 'NFTs',
    path: 'explore?type=2',
    icon: '',
  },
  {
    title: 'SubNodes',
    path: 'explore?type=3',
    icon: '',
  },
  {
    title: 'Seed Nodes',
    path: 'explore?type=4',
    icon: '',
  },
]
const profileTabs = [
  {
    title: 'Profile',
    path: 'profile?type=1',
    icon: '',
  },
  {
    title: 'Wallet',
    path: 'profile?type=2',
    icon: '',
  },
  {
    title: 'Top-up Balance',
    path: 'profile?type=3',
    icon: '',
  },
  {
    title: 'Top-up Reward',
    path: 'profile?type=4',
    icon: '',
  },
  {
    title: 'My Nodes',
    path: 'profile?type=5',
    icon: '',
  },
  {
    title: 'My Works',
    path: 'profile?type=6',
    icon: '',
  },
  {
    title: 'Favorite',
    path: 'profile?type=7',
    icon: '',
  },
  {
    title: 'NFT Holds',
    path: 'profile?type=9',
    icon: '',
  },
  {
    title: 'NFT Minted',
    path: 'profile?type=10',
    icon: '',
  },
]

import useAccount from '@/hooks/useAccount'
const { login, setLogOut, getLoginStatus } = useAccount()
const loginWallet = async () => {
  await login()
  userInfo.value = getLoginStatus(true)
}
const setProfileTab = async () => {
  await setLogOut()
  userInfo.value = {
    address: '',
    avatar: '',
  }
}
const router = useRouter()
const goIndex = () => {
  store.setNodeType(0)
  router.push({
    path: '/',
  })
}

const goDex = () => {
  router.push({
    path: '/dex',
  })
}

const route = useRoute()
const userInfo = ref({
  address: '',
  avatar: '',
})
onMounted(() => {
  query.value = route.query.query as string
  userInfo.value = store.UserInfo.address
    ? { ...store.UserInfo }
    : getLoginStatus(true)
})
</script>

<style lang="scss" scoped>
.logoclass {
  margin: 0 2.25rem;
  color: #8c91ff;
  cursor: pointer;
  i {
    font-size: 1.875rem;
  }
}

// :deep(.v-list-item__content) {
//   width: 100%;
//   height: 100%
// }
</style>
