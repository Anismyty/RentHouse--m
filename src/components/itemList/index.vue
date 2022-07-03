<template>
  <div class="container">
    <van-cell
      v-for="(e, i) in list"
      :key="i"
      :to="{ name: 'HousePage', params: { id: e.houseCode } }"
    >
      <template #icon>
        <img slot="icon" :src="baseURL + e.houseImg" alt="" />
      </template>
      <template #title>
        <h3>{{ e.title }}</h3>
        <span class="desc">{{ e.desc }}</span>
        <div class="tag">
          <i v-for="(e, i) in e.tags" :key="i">{{ e }}</i>
        </div>
        <span class="price">{{ e.price }}元/月</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { baseURL } from '@/utils/request'
export default {
  name: 'ItemList2',
  props: {
    list: Array,
  },
  data() {
    return {
      baseURL,
    }
  },
}
</script>

<style scoped lang="less">
.container {
  padding-top: 90px;
  height: 94vh;
}
img {
  width: 250px;
}
.van-cell__title {
  margin-left: 10px;
  width: 700px;
  overflow: hidden;
  h3 {
    width: 100%;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    color: #777777;
    letter-spacing: 5px;
  }
  .tag {
    margin-bottom: 20px;
    i {
      display: inline-block;
      margin-bottom: 5px;
      font-style: normal;
      background-color: #83da85;
      color: #204911;
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
  .price {
    color: red;
    font-weight: bold;
    font-size: 40px;
  }
}
</style>
