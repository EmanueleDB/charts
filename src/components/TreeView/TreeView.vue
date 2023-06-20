<template>
  <ul class="tree">
    <li v-for="asset in assets" :key="asset.id">
      <span @click="expand(asset)">
        <span class="tree__arrow">{{ asset.expanded ? '▼' : '►' }}</span>
        <span class="tree__name">{{ asset.name }}</span></span
      >
      <TreeView
        v-if="asset.expanded"
        :assets="asset.children"
        @expand="$emit('expand', $event)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TreeView',
  emits: ['expand'],
  props: {
    assets: {
      type: Array,
      required: true,
    },
  },
  methods: {
    expand(asset: { id: number; expanded: boolean }) {
      this.$emit('expand', asset)
    },
  },
})
</script>

<style lang="scss">
.tree {
  &__name {
    margin-left: 1rem;
    cursor: pointer;
  }
  &__arrow {
    cursor: pointer;
  }
}
</style>
