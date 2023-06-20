<template>
  <nav>
    <div class="d-flex h-100 align-items-center">
      <h3>Spectral Front-End Assignment</h3>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navigation',
})
</script>

<style lang="scss">
nav {
  height: 80px;
  background: var(--navigation);
  color: var(--white);

  div {
    margin-left: 1rem;
  }
}
</style>
