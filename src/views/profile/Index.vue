<template>
  <div class="profile-box">
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <div class="n-top"></div>
        <v-list class="avatar-box">
          <v-list-item
            :prepend-avatar="store.UserInfo.avatar || userInfo.avatar"
            :title="userInfo.name"
            :subtitle="ellipsis(userInfo.address)"
          >
          </v-list-item>
        </v-list>
        <v-divider class="my-divider"></v-divider>

        <v-list density="compact" nav>
          <router-link
            v-for="(item, index) in profileTabs"
            :key="item.title"
            :to="item.path"
            class="a-style"
          >
            <v-list-item :value="index">
              <template v-slot:prepend>
                <v-icon class="iconfont icon-tianjia ft24" />
              </template>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <v-list-group value="Favorite">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Favorite">
                <template v-slot:prepend>
                  <v-icon class="iconfont icon-tianjia ft24" />
                </template>
              </v-list-item>
            </template>

            <router-link class="a-style" to="profile?type=7">
              <v-list-item value="Nodes">
                <v-list-item-title class="mgl56"> Nodes </v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link class="a-style" to="profile?type=8">
              <v-list-item value="Works">
                <v-list-item-title class="mgl56"> Works </v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-group>

          <router-link class="a-style" to="profile?type=9">
            <v-list-item value="NFT Holds" title="NFT Holds">
              <template v-slot:prepend>
                <v-icon class="iconfont icon-tianjia ft24" />
              </template>
            </v-list-item>
          </router-link>

          <router-link class="a-style" to="profile?type=10">
            <v-list-item value="NFT Minted" title="NFT Minted">
              <template v-slot:prepend>
                <v-icon class="iconfont icon-tianjia ft24" />
              </template>
            </v-list-item>
          </router-link>

          <v-list-item @click="setProfileTab">
            <template v-slot:prepend>
              <v-icon class="iconfont icon-tianjia ft24" />
            </template>
            <v-list-item-title> Log Out </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <component
        ref="childRef"
        :is="currentCopmonent[type - 1]"
        :userInfo="userInfo"
      >
      </component>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import { ellipsis } from '@/utils'
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import useUserStore from '@/store'
const store = useUserStore()

const Profile = defineAsyncComponent(() => import('./Profile.vue'))
const Wallet = defineAsyncComponent(() => import('./Wallet.vue'))
const TopUpBalance = defineAsyncComponent(() => import('./TopUpBalance.vue'))
const TopUpReward = defineAsyncComponent(() => import('./TopUpReward.vue'))
const MyNodes = defineAsyncComponent(() => import('./MyNodes.vue'))
const MyWorks = defineAsyncComponent(() => import('./MyWorks.vue'))
const FavoritesNodes = defineAsyncComponent(
  () => import('./FavoritesNodes.vue')
)
const FavoritesWorks = defineAsyncComponent(
  () => import('./FavoritesWorks.vue')
)
const NFTHolds = defineAsyncComponent(() => import('./NFTHolds.vue'))
const NFTMinted = defineAsyncComponent(() => import('./NFTMinted.vue'))
const currentCopmonent = shallowRef([
  Profile,
  Wallet,
  TopUpBalance,
  TopUpReward,
  MyNodes,
  MyWorks,
  FavoritesNodes,
  FavoritesWorks,
  NFTHolds,
  NFTMinted,
])
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
  // {
  //   title: 'Favorite',
  //   path: 'profile?type=6',
  //   icon: '',
  // },
  // {
  //   title: 'NFT Holds',
  //   path: 'profile?type=7',
  //   icon: '',
  // },
  // {
  //   title: 'NFT Minted',
  //   path: 'profile?type=8',
  //   icon: '',
  // },
]
import useAccount from '@/hooks/useAccount'
const { setLogOut, getLoginStatus } = useAccount()
const setProfileTab = () => {
  setLogOut()
}
const type = ref<any>(1)
const userInfo = ref({
  address: '',
  avatar: '',
  name: '',
})
onMounted(() => {
  type.value = route.query.type
  userInfo.value = getLoginStatus(true)
  console.log(userInfo, 'userInfo')
})
</script>
<style scoped lang="scss">
.profile-box {
  height: 100%;
  flex: 1;
  display: flex;
}

.v-navigation-drawer {
  position: fixed !important;
  z-index: 2;
  background: #1b2233;
  transform: none !important;
}

.n-top {
  height: 64px;
}

.v-layout {
  z-index: 2 !important;
}
.avatar-box {
  height: 84px;
  display: flex;
}
:deep(.v-list-item--density-compact.v-list-item--one-line) {
  min-height: 56px;
}
.mgl56 {
  margin-left: 56px;
}
.mglAt {
  float: right;
}
</style>
