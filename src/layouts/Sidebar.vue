<template>
  <div class="sidebar">
    <TreeView :assets="assets" @expand="handleExpand" />
  </div>
</template>

<script lang="ts">
import TreeView from '@/components/TreeView/TreeView.vue'
import { useStore } from '@/store/store'
import { Asset } from '@/store/store'
import { defineComponent } from 'vue'

export default defineComponent({
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
    async handleExpand(asset: { id: number; expanded: boolean; name: string }) {
      useStore().setSelectedAsset(asset.name)
      asset.expanded = !asset.expanded

      useStore().reset()
      await useStore().fetchMeasurements(asset.id)
      const measurements = useStore().measurements[asset.id]

      if (measurements) {
        useStore().getFormattedDates(measurements)
        useStore().getDataSets(asset.id)
      }
    },
  },
})
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
