<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
}
</script>

<style lang="scss">
nav {
  height: 50px;
  background: orange;
}
</style>
