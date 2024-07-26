<template>
  <v-card class="title-card" v-if="props.isLoading">
    <v-skeleton-loader
      elevation="12"
      height="100%"
      type="image"
      class="loading-loader"
    ></v-skeleton-loader>
    <v-skeleton-loader
      elevation="12"
      height="100%"
      type="list-item,list-item,list-item,list-item,list-item,list-item"
      class="loading-text"
    ></v-skeleton-loader>
  </v-card>
  <v-card class="title-card" v-else>
    <div class="card-left">
      <img :src="props.dataObj.daoLogoUrl" alt="" />
    </div>
    <div class="card-center">
      <h4>
        <span style="display: initial">
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.daoName }} </v-tooltip
          >{{ truncateString(props.dataObj.daoName, 24) }}</span
        >

        <div class="icon-body my-mgl24">
          <v-menu open-on-click>
            <template v-slot:activator="{ props }">
              <v-btn size="36" class="text-none" variant="text" v-bind="props" @click="verifyLogin">
                <i class="iconfont icon-more ft24" style="color: #8c91ff" />
              </v-btn>
            </template>
            <v-list v-show="isLogin">
              <router-link
                :to="'/editInformation?id=' + props.dataObj.daoId + '&type=1'"
                class="a-style"
              >
                <v-list-item value="editInformation">
                  {{ $t('rightMemberTitle.editInfo') }}
                </v-list-item>
              </router-link>
            </v-list>
          </v-menu>
        </div>
      </h4>
      <p class="flex !items-center">
        {{ $t('NodeTitle.permissionsNftLabel') }} :
        <a class="ml-2 text-indigo-400 text-sm font-medium font-['Inter'] tracking-tight cursor-pointer"
          @click="viewAll">
          {{ $t('NodeTitle.viewAll') }}
        </a>
      </p>
      <p>
        {{ $t('NodeTitle.feePoolLabel') }} :
        <a
          class="token-icon"
          :href="aPush(props.dataObj.feePool)"
          target="_blank"
        >
          <v-btn class="text-none" variant="text">
            <span
              >{{ ellipsis(props.dataObj.feePool) }}
              <v-tooltip activator="parent" location="top">
                {{ props.dataObj.feePool }}
              </v-tooltip>
            </span>
          </v-btn>
        </a>
        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.feePool"
        />
      </p>
      <p>
        {{ $t('NodeTitle.erc721AddressLabel') }} :
        <a
          class="token-icon"
          :href="aPush(props.dataObj.erc721Address)"
          target="_blank"
        >
          <v-btn class="text-none" variant="text">
            <span
              >{{ ellipsis(props.dataObj.erc721Address) }}
              <v-tooltip activator="parent" location="top">
                {{ props.dataObj.erc721Address }}
              </v-tooltip>
            </span>
          </v-btn>
        </a>

        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.erc721Address"
        />
      </p>

      <p v-show="props.dataObj.inputTokenAddress !== ''">
        {{ $t('NodeTitle.inputTokenContractAddressLabel') }} :
        <a
          class="token-icon"
          :href="aPush(props.dataObj.inputTokenAddress)"
          target="_blank"
        >
          <v-btn class="text-none" variant="text">
            <span
              >{{ ellipsis(props.dataObj.inputTokenAddress) }}
              <v-tooltip activator="parent" location="top">
                {{ props.dataObj.inputTokenAddress }}
              </v-tooltip>
            </span>
          </v-btn>
        </a>

        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.inputTokenAddress"
        />
      </p>

      <p>
        {{ $t('NodeTitle.outputTokenContractAddressLabel') }} :
        <a
          class="token-icon"
          :href="aPush(props.dataObj.erc20Address)"
          target="_blank"
        >
          <v-btn class="text-none" variant="text">
            <span
              >{{ ellipsis(props.dataObj.erc20Address) }}
              <v-tooltip activator="parent" location="top">
                {{ props.dataObj.erc20Address }}
              </v-tooltip>
            </span>
          </v-btn>
        </a>
        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.erc20Address"
        />
      </p>
    </div>
    <div class="card-right">
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
import { truncateString, ellipsis } from '@/utils'
import { ref } from 'vue'
import useAccount from '@/hooks/useAccount'

const { getTrading } = useAccount()

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
})
import { APP_OPEN_URL } from '@/config'

const isLogin = ref(false)
const openPermissionsDialog = ref(false)

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
const aPush = (address: string) => {
  return `${APP_OPEN_URL}/address/${address}`
}
</script>

<style scoped lang="scss">
.title-card {
  margin-bottom: 24px;

  .iconfont {
    font-size: 12px;
    cursor: pointer;
    color: #fff;
  }

  height: 220px;
  background-color: #1A1F2E !important;
  display: flex;
  padding: 24px;
  box-sizing: border-box;
  min-width: 780px;

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

.token-icon {
  :deep(.v-btn) {
    height: 24px;
    line-height: 24px;
    padding: 0;
  }
}

.loading-loader {
  :deep(.v-skeleton-loader__image) {
    height: 100%;
    width: 172px;
    flex: none;
  }

  :deep(.v-skeleton-loader) {
    display: contents;
  }

  :deep(.v-skeleton-loader__text) {
    max-width: 100%;
  }
}

.loading-text {
  width: 100%;
  box-shadow: none !important;
  background-color: transparent;

  :deep(.v-skeleton-loader__list-item) {
    margin: 6px 16px;
    box-shadow: none !important;
  }
}
</style>
