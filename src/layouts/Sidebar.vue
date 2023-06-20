<template>
  <div class="sidebar">
    <TreeView :assets="assets" @expand="handleExpand" />
  </div>
</template>

<script lang="ts">
import TreeView from '@/components/TreeView/TreeView.vue'
import { useStore } from '@/store/store'

export default {
  name: 'Sidebar',
  components: {
    TreeView,
  },
  data() {
    return {
      assets: [],
    }
  },
  async mounted() {
    await useStore().fetchAssets()
    this.assets = useStore().assets
  },
  methods: {
    handleExpand(asset) {
      // Handle expanding/collapsing the asset
      asset.expanded = !asset.expanded
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
