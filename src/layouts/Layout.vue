<template>
  <div>
    <header ref="header">
      <Navigation />
    </header>
    <main ref="main">
      <div class="row h-100">
        <div class="col-4">
          <Sidebar />
        </div>
        <div class="col-8">
          <Graph />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/layouts/Sidebar.vue'
import Navigation from '@/layouts/Navigation.vue'
import Graph from '@/components/Graph/Graph.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Navigation, Sidebar, Graph },
})
</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

main {
  margin-top: 80px;
  height: calc(100vh - 80px);
  background: var(--white);
}
</style>
