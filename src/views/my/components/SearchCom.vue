<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="$router.go(-1)"
    />
    <SearchList :list="searchList" @key="onSearch2" />
  </div>
</template>

<script>
import { findCommunity } from '@/api/home'
import SearchList from '@/components/searchall/searchListOne'
export default {
  name: 'SearchCom',
  components: { SearchList },
  data() {
    return {
      value: '',
      searchList: [],
    }
  },
  methods: {
    onSearch() {
      this.getCommunity()
    },
    async getCommunity() {
      try {
        const { data } = await findCommunity({
          id: this.$store.state.city.value,
          name: this.value,
        })
        this.searchList = data.body
      } catch (err) {
        this.$toast('信息获取失败')
      }
    },
    onSearch2(val) {
      this.$store.commit('setSearchChose', val)
      this.$router.go(-1)
    },
  },
}
</script>

<style></style>
