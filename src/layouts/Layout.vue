<template>
  <div>
    <header ref="header">
      <Navigation />
    </header>
    <main ref="main">
      <div class="row h-100">
        <div class="col-6">
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

  // mounted() {
  //   this.adjustMainHeight()
  //   window.addEventListener('resize', this.adjustMainHeight)
  // },
  // beforeUnmount() {
  //   window.removeEventListener('resize', this.adjustMainHeight)
  // },
  // methods: {
  //   adjustMainHeight() {
  //     const headerHeight = this.$refs.header.clientHeight
  //     const footerHeight = this.$el.querySelector('footer').clientHeight
  //     this.$refs.main.style.minHeight = `calc(100vh - ${
  //       headerHeight + footerHeight
  //     }px)`
  //   },
  // },
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
