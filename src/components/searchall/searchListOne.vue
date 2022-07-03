<template>
  <div>
    <van-cell
      v-for="(e, i) in list"
      :key="i"
      :title="e.communityName"
      @click="
        $emit('key', { community: e.community, communityName: e.communityName })
      "
    />
  </div>
</template>

<script>
export default {
  name: 'searchList',
  props: {
    list: {
      type: [Object, Array],
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style></style>
