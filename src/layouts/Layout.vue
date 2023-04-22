<template>
  <div>
    <header ref="header">
      <Navigation />
    </header>
    <main ref="main">
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Navigation from '@/layouts/Navigation.vue'
import Footer from '@/layouts/Footer.vue'

export default {
  components: { Footer, Navigation },
  mounted() {
    this.adjustMainHeight()
    window.addEventListener('resize', this.adjustMainHeight)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustMainHeight)
  },
  methods: {
    adjustMainHeight() {
      const headerHeight = this.$refs.header.clientHeight
      const footerHeight = this.$el.querySelector('footer').clientHeight
      this.$refs.main.style.minHeight = `calc(100vh - ${
        headerHeight + footerHeight
      }px)`
    },
  },
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
  margin-top: 50px;
  background: aquamarine;
}

footer {
  position: fixed;
  height: 100px;
  background: blueviolet;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
