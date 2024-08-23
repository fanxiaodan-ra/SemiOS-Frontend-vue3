<template>
  <v-dialog
    v-model="store.IsAcceptSign"
    :persistent="true"
    :no-click-animation="true"
    width="420"
  >
    <v-card>
      <span>
        <v-btn class="cancel-btn" variant="text" @click="setLogOut">
          <i class="iconfont icon-guanbi ft12"></i>
        </v-btn>
      </span>
      <div class="dialog-icon">
        <i class="iconfont icon-logoicon ft36"></i>
      </div>
      <v-card-text>
        <p class="dialog-text">
          {{ $t('IsAcceptSignDialog.infoText') }}
          <a
            :href="goOpenUrl('https://wiki.protodao.io/terms-of-service')"
            target="_blank"
            style="text-decoration: none"
          >
            <span>{{ $t('IsAcceptSignDialog.termsofServiceLabel') }}</span>
          </a>
          {{ $t('IsAcceptSignDialog.and') }}
          <a
            :href="goOpenUrl('https://wiki.protodao.io/privacy-policy')"
            target="_blank"
            style="text-decoration: none"
          >
            <span> {{ $t('IsAcceptSignDialog.privacyPolicy') }}</span> </a
          >.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="#fff"
          class="btnmo btnz text-none"
          size="large"
          block
          @click="signData"
          >{{ $t('IsAcceptSignDialog.signBtn') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import useAccount from '@/hooks/useAccount'
const { setLogOut, signData } = useAccount()
import useUserStore from '@/store'
const store = useUserStore()
const goOpenUrl = (url: string) => {
  return url
}
</script>

<style lang="scss" scoped>
.dialog-icon {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 2.25rem;
  color: #8c91ff;
}

.cancel-btn {
  position: absolute;
  right: 0;
  border-radius: 2.25rem;
  padding: 0 !important;
  height: 2.25rem !important;
  width: 2.25rem !important;
  min-width: 2.25rem !important;
}
</style>
