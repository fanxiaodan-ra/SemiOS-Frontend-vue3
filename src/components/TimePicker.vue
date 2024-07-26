<template>
  <FormRow
    :inputName="props.inputName"
    :leftWidth="props.leftWidth"
    :tooltipText="props.tooltipText"
  >
    <v-menu :close-on-content-click="false" v-model="menu">
      <template v-slot:activator="{ props }">
        <v-text-field
          v-model="formatDate"
          density="comfortable"
          v-bind="props"
          append-inner-icon="mdi-calendar-month-outline"
          :label="label"
        >
        </v-text-field>
      </template>
      <v-date-picker
        v-model="datetime"
        show-adjacent-months
        max-height="470"
        width="100%"
        :min="minDate"
      ></v-date-picker>
    </v-menu>
    <p class="text-grey-1 text-xs">{{ $t('AddFormBlock.timeZoneTip') }}</p>
  </FormRow>
</template>
<script lang="ts" setup>
import FormRow from './FormRow.vue'
import { ref, watch, onMounted } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Nodes Block Window',
  },
  inputName: {
    type: String,
    default: 'Start Date',
  },
  leftWidth: {
    type: String,
    default: '320px',
  },
  tooltipText: {
    type: String,
    default:
      'Date you wish to start the mint process. All time UTC+0. Choosing today means the Nodes will start immediately after launch successfully.',
  },
})

import { useDate } from 'vuetify'

const date = useDate()
const minDate = ref(date.format(new Date(), 'fullDateWithWeekday'))

const datetime = ref(new Date())
const formatDate = ref(date.format(new Date(), 'fullDateWithWeekday'))
const menu = ref(false)
watch([datetime, formatDate], (cur) => {
  console.log(cur, 'cur')
  formatDate.value = date.format(cur[0], 'fullDateWithWeekday')

  menu.value = false
  emit('setFormDate', formatDate.value)
})
const emit = defineEmits(['setFormDate'])
onMounted(() => {
  emit('setFormDate', formatDate.value)
})
</script>

<style lang="scss" scoped>
.input-name {
  margin-inline-end: 16px;
  height: 40px;
  place-self: flex-start;
  line-height: 40px;
  color: #9e9e9e;
  text-align: end;
}
</style>
