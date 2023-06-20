<template>
  <ul class="tree">
    <li v-for="asset in assets" :key="asset.id">
      <span class="tree__arrow" @click="expand(asset)">{{
        asset.expanded ? '▼' : '►'
      }}</span>
      <span class="tree__name" @click="setData">{{ asset.name }}</span>
      <TreeView
        v-if="asset.expanded"
        :assets="asset.children"
        @expand="$emit('expand', $event)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TreeView',
  emits: ['expand'],
  props: {
    assets: {
      type: Array,
      required: true,
    },
  },
  methods: {
    expand(asset) {
      this.$emit('expand', asset)
    },
    setData() {
      console.log('yes')
    },
  },
}
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
