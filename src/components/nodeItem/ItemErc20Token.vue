<template>
  <div class="card-box">
    <Loading v-if="isLoading" />
    <div class="box-body" v-else>
      <div class="box-top">
        <h4>ERC-20 Tokens Received from other Nodes</h4>
        <div
          class="box-content"
          v-if="infoData.receivedTokenFromOther.length > 0"
        >
          <v-row
            align="start"
            no-gutters
            v-for="item in infoData.receivedTokenFromOther"
            :key="item.daoName + 'receivedTokenFromOther'"
          >
            <v-col cols="10">
              <router-link
                :to="`/nodeDetails?type=2&id=${item.daoId}`"
                class="a-style"
              >
                <v-btn class="text-none" variant="text">
                  {{ item.daoName }}
                </v-btn>
              </router-link>
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
        <div
          class="box-content"
          v-if="infoData.allocationTokenToOtherDao.length > 0"
        >
          <v-row
            align="start"
            no-gutters
            v-for="item in infoData.allocationTokenToOtherDao"
            :key="item.daoName + 'allocationTokenToOtherDao'"
          >
            <v-col cols="10">
              <router-link
                :to="`/nodeDetails?type=2&id=${item.daoId}`"
                class="a-style"
              >
                <v-btn class="text-none" variant="text">
                  {{ item.daoName }}
                </v-btn>
              </router-link>
            </v-col>
            <v-col cols="2" class="text-r init-font">
              {{ item.royaltyProportion }}%</v-col
            >
          </v-row>
        </div>
        <div class="box-content my-flex init-font" v-else>No Data</div>
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
  receivedTokenFromOther: [],
  allocationTokenToOtherDao: [],
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
