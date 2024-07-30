<template>
  <FormRow
    :input-name="props.inputName"
    :left-width="props.leftWidth"
    :tooltipText="props.tooltipText"
    :importance="false"
  >
    <div class="pos-box">
      <v-file-input
        v-model="formData.imgFile"
        variant="outlined"
        prepend-icon=""
        @update:modelValue="updateSourceFile"
        :error-messages="errorMessage"
      ></v-file-input>
      <div class="upload-text" v-if="formData.imgUrl === ''">
        <v-icon>mdi-plus</v-icon>
        <p class="box-info">Upload</p>
      </div>
      <div
        class="upload-text z-box"
        v-else
        @mouseenter="isDelete = true"
        @mouseleave="isDelete = false"
      >
        <v-img
          :aspect-ratio="1"
          class="img-bg"
          :lazy-src="formData.imgUrl"
          :src="formData.imgUrl"
          width="86"
        ></v-img>
        <v-expand-transition>
          <div class="delete-img" v-if="isDelete" @click="updateSourceFile([])">
            <div class="dele-icon"><v-icon>mdi-trash-can-outline</v-icon></div>
          </div>
        </v-expand-transition>
      </div>
    </div>
  </FormRow>
</template>
<script lang="ts" setup>
import FormRow from './FormRow.vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  inputName: {
    type: String,
    default: 'Add Work',
  },
  leftWidth: {
    type: String,
    default: '140px',
  },
  tooltipText: {
    type: String,
    default:
      'Recommended resolution is 3000*2000 or 2000*3000, Max file size 20MB, keep visual elements centered (JPG, JPEG, PNG, GIF).',
  },
  imgUrl: {
    type: String,
    default: '',
  },
  imgSize: {
    type: Number,
    default: 20,
  },
})
const isDelete = ref(false)
const formData = ref({
  imgFile: [],
  imgUrl: '',
})
const errorMessage = ref('')
const emit = defineEmits(['setUpImg'])
const setUpImgUrl = () => {
  emit('setUpImg', formData.value.imgFile)
}
const updateSourceFile = (e: any) => {
  if (e.length > 0) {
    const file = e[0]
    const typs = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
    const isJPG = typs.indexOf(file.type) > -1
    if (!isJPG) {
      errorMessage.value = 'Invalid file type'
    }
    const isLt = file.size / 1024 / 1024 < props.imgSize
    if (!isLt) {
      errorMessage.value = 'File size exceeds limit'
    }
    var URL = window.URL || window.webkitURL
    formData.value.imgUrl = URL.createObjectURL(new Blob([file]))
  } else {
    errorMessage.value = ''
    formData.value.imgFile = []
    formData.value.imgUrl = ''
  }
  isDelete.value = false
  setUpImgUrl()
}
const setUrlMsg = async () => {
  return errorMessage.value !== ''
}
defineExpose({
  setUrlMsg,
  updateSourceFile,
})
onMounted(() => {
  formData.value.imgUrl = props.imgUrl
})
</script>

<style lang="scss" scoped>
.box-info {
  color: #9e9e9e;
  font-size: 14px;
}
// .v-file-input {
//   width: 86px;
//   height: 86px;
// }
:deep(.v-field__clearable) {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // margin: 0;
  // padding: 0;
  // width: 86px;
  // height: 86px;
  display: none;
}
// :deep(.v-field) {
//   padding-right: 31px;
// }
:deep(.v-field__input) {
  background-color: transparent !important;
  display: none;
}
:deep(.v-field__overlay) {
  background-color: transparent !important;
}
:deep(.v-input__control) {
  width: 86px;
  height: 86px !important;
  z-index: 1;
  position: relative;
}
.pos-box {
  position: relative;
}
.upload-text {
  width: 86px;
  height: 86px;
  position: absolute;
  top: 0;
  // border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.img-bg {
  background-color: #282f41;
  border-radius: 6px;
  :deep(.v-img__img--contain) {
    border-radius: 6px;
  }
}
.delete-img {
  position: absolute;
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  z-index: 11;
}
.dele-icon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid #fff;
  text-align: center;
  background-color: rgba(40, 47, 65, 0.5); /* 半透明遮罩 */
}
.z-box {
  z-index: 10;
}
:deep(.v-field.v-field--appended) {
  border-radius: 7px;
}
</style>
