<template>
  <v-card class="title-card">
    <div class="card-left">
      <img :src="props.dataObj.daoLogoUrl" alt="" />
    </div>
    <div class="card-center">
      <h4 class="text-white">
        <span style="display: initial">
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.daoName }} </v-tooltip>{{ truncateString(props.dataObj.daoName, 40) }}</span>
        <div class="icon-body my-mgl24">
          <v-menu open-on-click>
            <template v-slot:activator="{ props }">
              <v-btn size="36" class="text-none" variant="text" v-bind="props" @click="verifyLogin">
                <i class="iconfont icon-more ft24" style="color: #8c91ff" />
              </v-btn>
            </template>
            <v-list v-show="isLogin">
              <router-link :to="'/editInformation?id=' + props.dataObj.daoId" class="a-style">
                <v-list-item value="editInformation">
                  Edit Information
                </v-list-item>
              </router-link>
              <router-link :to="'/editOnChainParameters?id=' + props.dataObj.daoId" class="a-style">
                <v-list-item value="editParameter">
                  Edit On-chain Parameter
                </v-list-item>
              </router-link>
              <router-link :to="'/editNodesStrategies?id=' + props.dataObj.daoId" class="a-style">
                <v-list-item value="editNodesStrategies">
                  Edit Strategy
                </v-list-item>
              </router-link>
            </v-list>
          </v-menu>
        </div>
        <ForkNode
          :daoName="props.dataObj.daoName"
          v-if="!props.dataObj.isAncestorDao"
        />
      </h4>
      <p class="flex !items-center">
        {{ $t('NodeTitle.permissionsNftLabel') }} :
        <a class="ml-2 text-indigo-400 text-sm font-medium font-['Inter'] tracking-tight cursor-pointer" @click="viewAll">
          {{ $t('NodeTitle.viewAll') }}
        </a>
      </p>
      <p>
        {{ $t('NodeTitle.feePoolLabel') }} :
        <a :href="`${APP_OPEN_URL}/address/${props.dataObj.feePool}`" target="_blank">
          <span> {{ props.dataObj.feePool }} </span>
        </a>
        <CopyInformation size="24" fontSize="14" :address="props.dataObj.feePool" />
      </p>
      <p>
        {{ $t('NodeTitle.erc721AddressLabel') }} :
        <a :href="`${APP_OPEN_URL}/address/${props.dataObj.erc721Address}`" target="_blank">
          <span> {{ props.dataObj.erc721Address }} </span>
        </a>
        <CopyInformation size="24" fontSize="14" :address="props.dataObj.erc721Address" />
      </p>

      <p v-show="props.dataObj.inputTokenAddress !== ''">
        {{ $t('NodeTitle.inputTokenContractAddressLabel') }} :
        <a :href="`${APP_OPEN_URL}/address/${props.dataObj.inputTokenAddress}`" target="_blank">
          <span> {{ props.dataObj.inputTokenAddress }} </span>
        </a>
        <CopyInformation size="24" fontSize="14" :address="props.dataObj.inputTokenAddress" />
      </p>

      <p>
        {{ $t('NodeTitle.outputTokenContractAddressLabel') }} :
        <a :href="`${APP_OPEN_URL}/address/${props.dataObj.erc20Address}`" target="_blank">
          <span> {{ props.dataObj.erc20Address }} </span>
        </a>
        <CopyInformation size="24" fontSize="14" :address="props.dataObj.erc20Address" />
      </p>
    </div>
    <div class="card-right">
      <v-btn block class="btnz text-none" type="submit" @click="goSeedNode">{{
        $t('NodeTitle.seedNodesBtn')
        }}</v-btn>
      <p>
        {{ $t('NodeTitle.relatedNodesLabel') }}:
        {{ props.dataObj.totalDaoNumber }}
      </p>
      <div class="icons">
        <IconsTab :dataObj="props.dataObj" :isName="true" />
      </div>
    </div>
    <PermissionList :isDialog="openPermissionsDialog" @cancelDialog="openPermissionsDialog = false" />
  </v-card>
</template>

<script setup lang="ts">
import IconsTab from '@/components/IconsTab.vue'
import CopyInformation from '@/components/CopyInformation.vue'
import PermissionList from '../components/PermissionList.vue'
import { truncateString } from '@/utils'
import { useRouter } from 'vue-router'
import { APP_OPEN_URL } from '@/config'
import { ref } from 'vue'
import ForkNode from './components/ForkNode/Index.vue'
import useAccount from '@/hooks/useAccount'
const { getTrading } = useAccount()
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const router = useRouter()
const openPermissionsDialog = ref(false)
const isLogin = ref(false)
const goSeedNode = () => {
  router.push({
    path: '/daoCollectionAnalytics',
    query: {
      id: props.dataObj.mainDaoId,
    },
  })
}
const verifyLogin = async () => {
  const isTrad = await getTrading()
  if (!isTrad) {
    return
  }
  isLogin.value = isTrad
}
    
const viewAll = () => {
  openPermissionsDialog.value = true
}
</script>

<style scoped lang="scss">
.title-card {
  .iconfont {
    font-size: 12px;
    cursor: pointer;
    color: #fff;
  }
  height: 220px;
  margin: 24px 48px;
  background-color: #1A1F2E !important;
  display: flex;
  padding: 24px;
  box-sizing: border-box;
  .card-left {
    width: 172px;
    height: 172px;
    flex: 0 0 auto;
    margin-right: 24px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .card-center {
    flex: 1;
    // width: 300px;
    h4 {
      color: #bbbaba;
      font-family: Inter;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 36px;
      display: flex;
      align-items: center;
      span {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    p {
      margin: 0;
      margin-top: 2px;
      color: #9e9e9e;
      font-family: Inter;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      display: flex;
      align-items: flex-end;
      span {
        color: #8c91ff;
        cursor: pointer;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        margin: 0 6px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .card-right {
    margin-left: auto;
    width: 200px;
    flex: 0 0 auto;
    p {
      color: #9e9e9e;
      text-align: center;
      font-family: Inter;
      font-size: 12px;
      font-weight: 400;
      margin: 12px 0;
    }
  }
}
.icons {
  // line-height: 28px !important;
  display: flex;
  justify-content: center;
  i {
    font-size: 24px !important;
    color: #9e9e9e !important;
    margin-right: 12px;
  }
  .isClick {
    color: #8c91ff !important;
  }
}
</style>
