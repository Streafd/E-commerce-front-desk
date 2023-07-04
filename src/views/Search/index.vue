<template>
  <div>
    <TabNav></TabNav>
    <div class="main">
      <div class="py-container">
        <Bread
          :categoryName="searchParams.categoryName"
          :keyword="searchParams.keyword"
          :trademark="searchParams.trademark?.split(':')[1]"
          :attrprops="searchParams.props"
          @removeName="reGodata"
          @removeKeyowrd="reKeyword"
          @removeMark="reMark"
          @removeprops="reprops"
        ></Bread>
        <Selector
          :trademarkList="trademarkList"
          :attrsList="attrsList"
          @gettrademark="settrademark"
          @getattr="setattrProps"
        ></Selector>
        <Details
          :goodsList="goodsList"
          :order="searchParams.order"
          :pageNo="pageNo"
          :pageSize="pageSize"
          :total="total"
          :totalPages="totalPages"
          @getorder="setorder"
        ></Details>
        <Hotsale></Hotsale>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from './Bread'
import Selector from './Selector'
import Details from './Details'
import Hotsale from './Hotsale'

import keyWrod from '@/EventBus'
// import getpage from '@/EventBus'

import { mapGetters, mapState } from 'vuex'
export default {
  name: 'search',
  props: [],
  data() {
    return {
      searchParams: {
        //带给服务器参数
        category1Id: '',
        //一级分类id
        category2Id: '',
        //二级分类id
        category3Id: '',
        //分类名字
        categoryName: '',
        //关键字
        keyword: '',
        //排序
        order: '1:desc',
        //分页器：当前在第几页
        pageNo: 2,
        //每一页展示数据的个数
        pageSize: 3,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: ''
      }
    }
  },
  computed: {
    ...mapGetters('search', [
      'goodsList',
      'attrsList',
      'trademarkList',
      'pageNo',
      'pageSize',
      'total',
      'totalPages'
    ])
  },
  methods: {
    getData() {
      this.$store.dispatch('search/getSearchList', this.searchParams)
    },
    //清除分类名称
    reGodata(value) {
      //把带给服务器的参数置空了，还需向服务器发请求
      //带给服务器参数说明可有可无:如果属性值为空的字符串还是会把相应的字段携带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会携带给服务器
      this.searchParams.categoryName = value
      this.searchParams.category1Id = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category1Id = undefined
      // this.getData()

      //地址栏也需要修改：进行路由跳转(现在的路由跳转时自己跳转自己)
      //本意是删除query参数,如果路径当中出现params，那则不应该删除，路由跳转的时候应该携带发给服务器
      //还需要判断params是否存在，存在还需要加上params
      //注意：当路由路径发生了改变，会触发watch的$route监听事件，不需要自己添加this.getData()请求服务器
      if (this.$route.params?.keyword) {
        this.$router.push({ name: 'search', params: this.$route.params })
      } else {
        this.$router.push({ name: 'search' })
      }
    },
    //清除关键字
    reKeyword(value) {
      //让this.searchParams.keyword='' 或最好是undefined,这样不会携带给服务器
      this.searchParams.keyword = value
      //通知兄弟组件Headers清除关键字keyword
      keyWrod.$emit('share')
      //路由自己跳转自己
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    //清除品牌
    reMark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    //清除某个售卖属性
    reprops(index) {
      //通过子组件传递过来的index索引，来确定删除数组元素
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    //添加品牌
    settrademark(value) {
      this.searchParams.trademark = `${value.tmId}:${value.tmName}`
      this.getData()
    },
    //添加售卖属性
    setattrProps(obj) {
      // console.log(obj)
      // this.searchParams.props = []
      let attr = `${obj.id}:${obj.value}:${obj.Name}`

      //数组去重
      if (this.searchParams.props.indexOf(attr) === -1) {
        //这一步是循环判断是否有同一分类的id，有则删除，覆盖
        this.searchParams.props.forEach((item, index) => {
          if (item.split(':')[0] == attr.split(':')[0]) {
            this.searchParams.props.splice(index, 1)
          }
        })
        //添加售卖属性
        this.searchParams.props.push(attr)
      }
      //再次调用请求服务器
      this.getData()
    },
    //修改order排序方式
    setorder(value) {
      this.searchParams.order = value
      this.getData()
    },
    aaa(value) {}
  },
  watch: {
    //监听路由的变化再次请求服务器，响应回数据
    $route() {
      //每一次请求前，应该把相应的1,2,3级分类的id置空，让它接受下一次的相应1,2,3id
      //不置空 categoryName: '' 分类名是因为，当你点击其他分类名会替换之前的分类名
      //然而三级id是分别独立的，每次只能触发其中一级，不能多级触发发送请求。
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''

      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      //再次发起ajax请求
      this.getData()
    }
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    // console.log(this.searchParams)
    this.getData()
    //接收页码组件传递过来的页码值，通过修改请求服务器
    keyWrod.$on('getPageNo', (value) => {
      this.searchParams.pageNo = value
      this.getData()
    })
  },
  components: {
    Bread,
    Selector,
    Details,
    Hotsale
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
