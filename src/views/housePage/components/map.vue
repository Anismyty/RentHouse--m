<template>
  <baidu-map class="map" :center="center" :zoom="18">
    <bm-marker
      :position="center"
      :dragging="true"
      animation="BMAP_ANIMATION_BOUNCE"
    >
      <bm-label
        :content="title"
        :labelStyle="{ color: 'red', fontSize: '10px' }"
        :offset="{ width: -28, height: 30 }"
      />
    </bm-marker>
  </baidu-map>
</template>

<script>
export default {
  name: 'SmallMap',
  props: {
    center: {
      type: [Object, Array],
    },
    title: {
      type: String,
    },
  },
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
