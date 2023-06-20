<template>
  <div>
    <header ref="header">
      <Navigation />
    </header>
    <main ref="main">
      <div class="row h-100">
        <div class="col-auto">
          <Sidebar />
        </div>
        <div class="col">
          <testComponent />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Sidebar from '@/layouts/Sidebar.vue'
import Navigation from '@/layouts/Navigation.vue'
import testComponent from '@/components/Graph/Graph.vue'

export default {
  components: { Navigation, Sidebar, testComponent },
}
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
  height: 100vh;
  background: var(--white);
}
</style>
