<template>
  <div class="card-box">
    <Loading v-if="isLoading" />
    <div class="box-body" v-else>
      <div class="box-top">
        <h4>ETH Received from other Nodes</h4>
        <div
          class="box-content"
          v-if="infoData.receivedEthFromOther.length > 0"
        >
          <v-row
            align="start"
            no-gutters
            v-for="item in infoData.receivedEthFromOther"
            :key="item.daoName + 'receivedEthFromOther'"
          >
            <v-col cols="10">
              <router-link
                v-if="props.dataObj.daoId !== item.daoId"
                :to="`/nodeDetails?type=2&id=${item.daoId}`"
                class="a-style"
              >
                <v-btn class="text-none" variant="text">
                  {{ item.daoName }}
                </v-btn>
              </router-link>
              <v-btn class="text-none" variant="text" v-else>
                {{ item.daoName }}
              </v-btn>
            </v-col>
            <v-col cols="2" class="text-r init-font">
              {{ item.royaltyProportion }}%</v-col
            >
          </v-row>
        </div>
        <div class="box-content my-flex init-font" v-else>No Data</div>
      </div>
      <div class="box-bom">
        <h4>ETH Allocation to each Nodes</h4>
        <div v-if="!infoData.topupMode">
          <div
            class="box-content"
            v-if="infoData.allocationEthToOtherDao.length > 0"
          >
            <v-row
              align="start"
              no-gutters
              v-for="item in infoData.allocationEthToOtherDao"
              :key="item.daoName + 'allocationEthToOtherDao'"
            >
              <v-col cols="10">
                <router-link
                  v-if="props.dataObj.daoId !== item.daoId"
                  :to="`/nodeDetails?type=2&id=${item.daoId}`"
                  class="a-style"
                >
                  <v-btn class="text-none" variant="text">
                    {{ item.daoName }}
                  </v-btn>
                </router-link>
                <v-btn class="text-none" variant="text" v-else>
                  {{ item.daoName }}
                </v-btn>
              </v-col>
              <v-col cols="2" class="text-r init-font">
                {{ item.royaltyProportion }}%</v-col
              >
            </v-row>
          </div>
          <div class="box-content my-flex init-font" v-else>No Data</div>
        </div>
        <div class="box-content my-flex init-font" v-else>
          Because this DAO opened top-up mode, there is no ETH-related asset
          information display.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import { allocationInfo } from '@/api/daos'
import { ref, onMounted } from 'vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  title: {
    type: Boolean,
    default: false,
  },
  daoId: {
    type: Number,
    default: 0,
  },
})
import { useRoute } from 'vue-router'

const route = useRoute()

const isLoading = ref(true)
const infoData = ref({
  receivedEthFromOther: [],
  allocationEthToOtherDao: [],
}) as any
const getData = async () => {
  isLoading.value = true
  const res = await allocationInfo({
    daoId: props.dataObj.daoId ? props.dataObj.daoId : route.query.id,
  })
  infoData.value = res.data
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.flexbox {
  height: 116px;
}
.box-body {
  flex: 1;
  h4 {
    color: #9e9e9e;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 36px;
    margin-left: 16px;
  }
  .box-content {
    height: 114px;
    overflow-y: auto;
  }
  .v-row {
    line-height: 36px;
  }
  .text-r {
    padding-right: 48px;
  }
  .text-none {
    color: #b3b5f2;
  }
}
.init-font {
  color: #9e9e9e;
  font-size: 14px;
}
</style>
