<template>
  <div class="row">
    <div class="col-6">
      <div class="container">
        <div class="text-center">
          <div class="text-center my-3">
            <b-progress :value="35" :max="100" show-progress animated></b-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TestComponent',
})
</script>

<style lang="scss">
@import 'style';
</style>
