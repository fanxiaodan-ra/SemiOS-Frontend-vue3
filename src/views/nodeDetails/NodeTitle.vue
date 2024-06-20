<template>
  <v-card class="title-card">
    <div class="card-left">
      <img :src="props.dataObj.daoLogoUrl" alt="" />
    </div>
    <div class="card-center">
      <h4>
        <span style="display: initial">
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.daoName }} </v-tooltip
          >{{ truncateString(props.dataObj.daoName) }}</span
        >

        <div class="icon-body my-mgl24" v-if="store.UserInfo.address">
          <v-menu
            open-on-hover
            v-if="props.dataObj.modifiable || props.dataObj.isMainDaoCreator"
          >
            <template v-slot:activator="{ props }">
              <v-btn size="36" class="text-none" variant="text" v-bind="props">
                <i class="iconfont icon-more ft24" style="color: #8c91ff" />
              </v-btn>
            </template>
            <v-list>
              <router-link
                :to="'/editInformation?id=' + props.dataObj.daoId"
                class="a-style"
              >
                <v-list-item
                  v-if="
                    store.UserInfo.address ===
                    props.dataObj.creatorAddress
                  "
                  value="editInformation"
                >
                  Edit Information
                </v-list-item>
              </router-link>
              <router-link
                :to="'/editOnChainParameters?id=' + props.dataObj.daoId"
                class="a-style"
              >
                <v-list-item value="editParameter">
                  Edit On-chain Parameter
                </v-list-item>
              </router-link>
              <router-link
                :to="'/editNodesStrategies?id=' + props.dataObj.daoId"
                class="a-style"
              >
                <v-list-item value="editNodesStrategies">
                  Edit Strategy
                </v-list-item>
              </router-link>
            </v-list>
          </v-menu>
        </div>
      </h4>
      <p>
        {{ $t('NodeTitle.creatorLabel') }} :
        <span v-if="props.dataObj.userName"
          >{{ truncateString(props.dataObj.userName) }}
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.userName }}
          </v-tooltip></span
        >
        <span v-else>
          {{ ellipsis(props.dataObj.creatorAddress) }}
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.creatorAddress }}
          </v-tooltip>
        </span>

        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.creatorAddress"
        />
      </p>
      <p>
        {{ $t('NodeTitle.feePoolLabel') }} :
        <span
          >{{ ellipsis(props.dataObj.feePool) }}
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.feePool }}
          </v-tooltip>
        </span>
        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.feePool"
        />
      </p>
      <p>
        {{ $t('NodeTitle.erc721AddressLabel') }} :
        <span
          >{{ ellipsis(props.dataObj.erc721Address) }}
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.erc721Address }}
          </v-tooltip>
        </span>

        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.erc721Address"
        />
      </p>

      <p v-show="props.dataObj.inputTokenAddress !== ''">
        {{ $t('NodeTitle.inputTokenContractAddressLabel') }} :
        <span
          >{{ ellipsis(props.dataObj.inputTokenAddress) }}
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.inputTokenAddress }}
          </v-tooltip>
        </span>

        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.inputTokenAddress"
        />
      </p>

      <p>
        {{ $t('NodeTitle.outputTokenContractAddressLabel') }} :
        <span
          >{{ ellipsis(props.dataObj.erc20Address) }}
          <v-tooltip activator="parent" location="top">
            {{ props.dataObj.erc20Address }}
          </v-tooltip>
        </span>
        <CopyInformation
          size="24"
          fontSize="14"
          :address="props.dataObj.erc20Address"
        />
      </p>
    </div>
    <div class="card-right">
      <v-btn block class="btnz text-none" type="submit">{{
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
  </v-card>
</template>

<script setup lang="ts">
import IconsTab from '@/components/IconsTab.vue'
import CopyInformation from '@/components/CopyInformation.vue'
import { ellipsis, truncateString } from '@/utils'
import useUserStore from '@/store'
const store = useUserStore()
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
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
  background-color: #252b3a !important;
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
      line-height: 36px;
      font-weight: 500;
      display: flex;
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
  line-height: 28px !important;
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
