<template>
  <div>
    <TabNav></TabNav>
    <ListContent></ListContent>
    <Rrcommend></Rrcommend>
    <Rank></Rank>
    <Link />
    <Floor v-for="item in floorList" :key="item.id" :list="item"></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ListContent from '@/views/Home/ListContent'
import Rrcommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Link from '@/views/Home/Link'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {
    ...mapState('home', ['floorList'])
  },
  methods: {},
  created() {},
  mounted() {
    //获取floor组件数据
    this.$store.dispatch('home/getFloorList')
  },

  components: {
    ListContent,
    Rrcommend,
    Rank,
    Link,
    Floor,
    Brand
  }
}
</script>

<style lang="less" scoped></style>
