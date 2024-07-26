<template>
  <div class="profile-box min-w-[1280px]">
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <div class="n-top"></div>
        <v-list class="avatar-box">
          <v-list-item :prepend-avatar="store.UserInfo.avatar || userInfo.avatar" :title="userInfo.name"
            :subtitle="ellipsis(userInfo.address)">
          </v-list-item>
        </v-list>
        <v-divider class="border-purple"></v-divider>

        <v-list density="compact" nav>
          <template v-for="(item, index) in profileTabs" :key="item.title" class="a-style">
            <v-list-group :value="item.title" v-if="item?.children && item?.children.length > 0">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :title="item.title" :active="item.types.includes(type)"
                  color="rgb(179, 181, 242)">
                  <template v-slot:prepend>
                    <v-icon :class="`iconfont ${item.icon} ft24`" />
                  </template>
                </v-list-item>
              </template>

              <template v-for="i in item.children" class="a-style">
                <v-list-item @click="navListClick(i.type)" :value="i.title" color="rgb(179, 181, 242)"
                  :active="type === i.type">
                  <v-list-item-title>
                    {{ i.title }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-list-group>
            <v-list-item v-else :value="index" @click="navListClick(item.type as number)" :active="type === item.type"
              color="rgb(179, 181, 242)" active-class="no-bg">
              <template v-slot:prepend>
                <v-icon :class="`iconfont ${item.icon} ft24`" />
              </template>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <component class="w-full ml-[55px]" ref="childRef" :is="currentCopmonent[type - 1]" :userInfo="userInfo">
      </component>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import { ellipsis } from '@/utils'
import { ref, onMounted, shallowRef } from 'vue'
import Profile from './Profile.vue';
import Wallet from './Wallet.vue';
import TopUpBalance from './TopUpBalance.vue';
import TopUpReward from './TopUpReward.vue';
import MyNodes from './MyNodes.vue';
import MyWorks from './MyWorks.vue';
import FavoritesNodes from './FavoritesNodes.vue';
import FavoritesWorks from './FavoritesWorks.vue';
import NFTHolds from './NFTHolds.vue';
import NFTMinted from './NFTMinted.vue';
import MyPermissions from './MyPermissions.vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import useUserStore from '@/store'
const store = useUserStore()

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
  MyPermissions,
])
console.log(route, 'route')
const profileTabs = [
  {
    title: 'Profile',
    type: 1,
    icon: 'icon-profile',
  },
  {
    title: 'Wallet',
    type: 2,
    icon: 'icon-wallet1',
  },
  {
    title: 'Top-up Balance',
    type: 3,
    icon: 'icon-top_up_balance',
  },
  {
    title: 'Top-up Reward',
    type: 4,
    icon: 'icon-top-up-banlance',
  },
  {
    title: 'My Created Nodes',
    type: 5,
    icon: 'icon-a-MyCreatednodes',
  },
  {
    title: 'My Works',
    type: 6,
    icon: 'icon-add-work',
  },
  {
    title: 'My Permissions',
    type: 11,
    icon: 'icon-a-MyPermissions',
  },
  {
    title: 'Favorite',
    icon: 'icon-shoucang',
    types: [7, 8],
    children: [
      {
        title: 'Nodes',
        icon: 'icon-dao',
        type: 7,
      },
      {
        title: 'Works',
        icon: 'icon-add-work',
        type: 8,
      }
    ]
  },
  {
    title: 'NFT Holds',
    type: 9,
    icon: 'icon-nft-holder',
  },
  {
    title: 'NFT Minted',
    type: 10,
    icon: 'icon-nft-minted',
  }
]
import useAccount from '@/hooks/useAccount'
const { getLoginStatus } = useAccount()
const type = ref<any>(1)
const userInfo = ref({
  address: '',
  avatar: '',
  name: '',
})
const navListClick = (clickType: number) => {
  type.value = clickType
  router.push({
    path: '/profile',
    query: {
      type: clickType,
    },
  })
}
onMounted(() => {
  type.value = Number(route.query.type)
  userInfo.value = getLoginStatus(true)
  console.log(userInfo, 'userInfo')
})
</script>
<style scoped lang="scss">
.no-bg {
  :deep(.v-list-item__overlay) {
    background: none !important;
  }
}
.profile-box {
  height: 100%;
  flex: 1;
  display: flex;
}

.v-navigation-drawer {
  position: fixed !important;
  z-index: 2;
  background: #151925;
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
