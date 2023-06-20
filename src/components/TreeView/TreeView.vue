<template>
  <ul>
    <li v-for="asset in assets" :key="asset.id">
      <span @click="expand(asset)">{{ asset.expanded ? '▼' : '►' }}</span>
      <span>{{ asset.name }}</span>
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
  },
}
</script>
