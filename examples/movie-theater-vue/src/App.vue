<script setup lang="ts">
import ReceiptInfoForm from './components/ReceiptInfoForm.vue'
import { MovieReceipt, defaultReceiptData, type MovieReceiptProps } from './receipt'

function onSubmit(data: MovieReceiptProps) {
  console.log(data)
}
</script>

<template>
  <header>
    <h1>Movie Receipt Demo</h1>
  </header>

  <main>
    <ReceiptInfoForm :form-data="defaultReceiptData" @submit="onSubmit" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
