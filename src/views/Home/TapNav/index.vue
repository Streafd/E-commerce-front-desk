<template>
  <div class="type-nav">
    <div class="container" @mouseenter="show = true" @mouseleave="currentLeave">
      <h2 class="all">全部商品分类</h2>
      <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" @click="goServe($event)" v-show="show">
          <div class="all-sort-list2">
            <div
              class="item bo"
              v-for="itemOne in categoryList"
              :key="itemOne.categoryId"
              :class="currentIndexs === itemOne.categoryId ? 'cur' : ''"
            >
              <h3 @mouseenter="currentIndex(itemOne.categoryId)">
                <a
                  :data-mycategoryName="itemOne.categoryName"
                  :data-mycategory1Id="itemOne.categoryId"
                  >{{ itemOne.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" @mouseleave.stop="currentOut()">
                <div
                  class="subitem"
                  v-for="itemTwo in itemOne.categoryChild"
                  :key="itemTwo.categoryId"
                >
                  <dl class="fore">
                    <dt @mouseenter="currentTwo(itemTwo.categoryId)">
                      <a
                        :class="
                          currentTwos === itemTwo.categoryId ? 'curFont' : ''
                        "
                        :data-mycategoryName="itemTwo.categoryName"
                        :data-mycategory2Id="itemTwo.categoryId"
                        >{{ itemTwo.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="itemThree in itemTwo.categoryChild"
                        :key="itemThree.categoryId"
                        @mouseenter="
                          currentThree(itemThree.categoryId, itemTwo.categoryId)
                        "
                      >
                        <a
                          :class="{
                            curFont: currentThrees === itemThree.categoryId
                          }"
                          :data-mycategoryName="itemThree.categoryName"
                          :data-mycategory3Id="itemThree.categoryId"
                          >{{ itemThree.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

//引入lodas的全部
// import _ from 'lodash'
//按需引入
import throttle from 'lodash/throttle'

export default {
  name: 'TabNav',
  data() {
    return {
      currentIndexs: -1,
      currentTwos: -1,
      currentThrees: -1,
      show: true
    }
  },
  computed: {
    //通过mapState映射获取到home仓库state中的categoryList数据，
    ...mapState('home', ['categoryList'])
  },
  methods: {
    // ...mapActions('home', ['categoryListe'])

    // currentIndex(id) {
    //   this.currentIndexs = id
    // },
    //对经过一一级变色进行节流处理，采用lodash的throttle(回调函数,时间)
    currentIndex: throttle(function (id) {
      this.currentIndexs = id
    }, 100),
    //二级
    currentTwo(id) {
      this.currentTwos = id
    },
    //三级
    currentThree(id1, id2) {
      if (id2 !== this.currentTwos) {
        this.currentTwo(id2)
      }
      this.currentThrees = id1
    },
    //离开一级,并且判断是否隐藏列表
    currentLeave() {
      this.currentIndexs = -1
      //判断是否在search路由页中
      if (this.$route.name === 'search') {
        this.show = false
      }
    },
    //离开二级
    currentOut() {
      this.currentTwos = -1
      this.currentThrees = -1
    },
    //进行路由跳转的方法
    goServe(e) {
      // console.log(e.target.dataset)
      //注意:自定义写是MymycategoryName,浏览器会自动解析成全小写
      let { mycategoryname, mycategory1id, mycategory2id, mycategory3id } =
        e.target.dataset
      //判断标签身上是否拥有mycategoryname属性，有一定a标签
      if (mycategoryname) {
        //整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: mycategoryname }

        //判断是一级、二级、三级哪个标签
        if (mycategory1id) {
          query.category1Id = mycategory1id
        } else if (mycategory2id) {
          query.category2Id = mycategory2id
        } else {
          query.category3Id = mycategory3id
        }
        //进行路由跳转
        let params = this.$route.params
        this.$router.push({ name: 'search', query, params })
      }
    }
  },
  mounted() {
    //如果在跳转到路由页，则隐藏商品分类列表
    if (this.$route.name === 'search') {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        text-decoration: none;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              text-decoration: none;
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  text-decoration: none;
                  a {
                    text-decoration: none;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                    a {
                      text-decoration: none;
                    }
                  }
                }
                .curFont {
                  color: #74c0fc;
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: #74c0fc;
        }
      }
    }
    //过渡动画：进入动画
    .sort-enter {
      height: 0px;
    }
    .sort-enter-active {
      transition: all 1s;
    }
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>
