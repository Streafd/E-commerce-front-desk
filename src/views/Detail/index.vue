<template>
  <div>
    <Content></Content>
    <Product></Product>
    <Links></Links>
  </div>
</template>

<script>
import Content from '@/views/Detail/Content'
import Product from '@/views/Detail/Product'
import Links from '@/views/Detail/Link'

export default {
  name: 'detail',
  props: ['id'],
  methods: {
    //调用vuex中detail的getGoodsInfo方法
    goodsInfo() {
      this.$store.dispatch('detail/getGoodsInfo', this.id)
    }
  },
  mounted() {
    //发送商品详情
    this.goodsInfo()
  },
  components: {
    Content,
    Product,
    Links
  }
}
</script>

<style lang="less" scoped></style>
