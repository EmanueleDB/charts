<template>
  <div class="row">
    <div class="col-6">
      <div class="container">
        <b-alert variant="success" show>Success Alert</b-alert>
        <p>test</p>
        <FontAwesomeIcon icon="fa-solid fa-language" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "TestComponent",
})
</script>

<style lang="scss">
@import "style";
</style>
