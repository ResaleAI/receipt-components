<script lang="ts">
import type { LineItem, TransactionInfo, RewardCreditInfo } from '@/types'
import { defineComponent, defineProps, reactive, type PropType, toRef } from 'vue'

interface MovieReceiptProps {
  theaterName: string
  address: string
  city: string
  state: string
  zip: string
  lineItems: LineItem[]
  trxInfo: TransactionInfo
  rewardInfo: RewardCreditInfo
}

export default defineComponent({
  name: 'ReceiptInfoForm',
  props: {
    formData: {
      type: Object as PropType<MovieReceiptProps>,
      required: true
    }
  },
  emits: ['submit'],
  setup(props, ctx) {
    const state = toRef(props, 'formData')

    const handleSubmit = () => {
      ctx.emit('submit', state)
    }

    return {
      state,
      handleSubmit
    }
  }
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label>
      Theater Name
      <input type="text" v-model="state.theaterName" /> </label
    ><br />
    <label>
      Address
      <input type="text" v-model="state.address" /> </label
    ><br />
    <label>
      City
      <input type="text" v-model="state.city" /> </label
    ><br />
    <label>
      State
      <input type="text" v-model="state.state" /> </label
    ><br />
    <label>
      Zip
      <input type="text" v-model="state.zip" /> </label
    ><br />
    <br />
    <button type="submit" @click="handleSubmit">Submit</button>
  </form>
</template>
