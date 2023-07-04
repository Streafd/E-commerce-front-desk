<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

//引入样式公共文件，我选择在public的index.html引入
// import './assets/css/reset.css'
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    //向vuex中的home仓库中的actions调用categoryListe函数
    this.$store.dispatch('home/categoryListe')
  }
}
</script>

<style></style>
