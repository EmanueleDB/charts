<template>
  <div class="sidebar">
    <TreeView :assets="assets" @expand="handleExpand" />
  </div>
</template>

<script lang="ts">
import TreeView from '@/components/TreeView/TreeView.vue'
import { useStore } from '@/store/store'
import { Asset } from '@/store/store'

export default {
  name: 'Sidebar',
  components: {
    TreeView,
  },
  data() {
    return {
      assets: [] as Asset[],
    }
  },
  async mounted() {
    await useStore().fetchAssets()
    this.assets = useStore().assets
  },
  methods: {
    handleExpand(asset: { expanded: boolean }) {
      asset.expanded = !asset.expanded
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  width: 100%;
  height: 100%;
  background: var(--sidebar-background);
  color: var(--white);
  padding-top: 1rem;
}
</style>
