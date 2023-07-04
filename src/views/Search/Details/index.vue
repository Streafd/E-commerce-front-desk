<template>
  <div class="details clearfix">
    <div class="sui-navbar">
      <div class="navbar-inner filter">
        <!-- 排序的结构 -->
        <ul class="sui-nav">
          <li :class="{ active: styleactive }" @click="changeOredr(1)">
            <a
              >综合
              <svg class="icon" aria-hidden="true" v-if="styleactive">
                <use :xlink:href="icon"></use>
              </svg>
            </a>
          </li>
          <li :class="{ active: !styleactive }" @click="changeOredr(2)">
            <a
              >价格
              <svg class="icon" aria-hidden="true" v-if="!styleactive">
                <use :xlink:href="icon"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-list">
      <ul class="yui3-g">
        <li
          class="yui3-u-1-5"
          v-for="item in goodsList"
          :key="item.id"
          @click="add(item.id)"
        >
          <div class="list-wrap">
            <div class="p-img">
              <a><img :src="item.defaultImg" /></a>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>{{ item.price }}</i>
              </strong>
            </div>
            <div class="attr">
              <a
                target="_blank"
                href="item.html"
                title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                >{{ item.title }}</a
              >
            </div>
            <div class="commit">
              <i class="command">已有<span>2000</span>人评价</i>
            </div>
            <div class="operate">
              <a
                href="success-cart.html"
                target="_blank"
                class="sui-btn btn-bordered btn-danger"
                >加入购物车</a
              >
              <a href="javascript:void(0);" class="sui-btn btn-bordered"
                >收藏</a
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 分页器 -->
    <Pagination
      :pagNa="pageNo"
      :pagSize="pageSize"
      :total="total"
      :continues="5"
    ></Pagination>
  </div>
</template>

<script>
import '@/assets/icon/iconfont.js'

export default {
  name: 'Details',
  props: ['goodsList', 'order', 'pageNo', 'pageSize', 'total', 'totalPages'],
  computed: {
    //根据父组件传递过来的值，计算出是背景色和icon样式显示综合还是价格
    styleactive() {
      return this.order.indexOf('1') !== -1 ? true : false
    },
    //根据父组件传递过来的值计算出降序还是升序icon样式
    icon() {
      return this.order.split(':')[1] === 'desc'
        ? '#icon-icon-arrow-down'
        : '#icon-icon-arrow-up'
    }
  },
  methods: {
    //切换综合还是价格，判断是升序还是降序排列
    changeOredr(value) {
      //先判断传递进来的id是否与order的一致,是就修改排序方式
      if (this.order.split(':')[0] == value) {
        let order = `${value}:${
          this.order.split(':')[1] === 'desc' ? 'asc' : 'desc'
        }`
        this.$emit('getorder', order)
      } else {
        //如果id不一样，则修改id，排序方式不变
        this.$emit('getorder', `${value}:${this.order.split(':')[1]}`)
      }
    },
    //商品跳转到商品详情
    add(value) {
      let id = value
      this.$router.push({ name: 'detail', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.details {
  margin-bottom: 5px;
  .sui-navbar {
    overflow: visible;
    margin-bottom: 0;
    .filter {
      min-height: 40px;
      padding-right: 20px;
      background: #fbfbfb;
      border: 1px solid #e2e2e2;
      padding-left: 0;
      border-radius: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
      .sui-nav {
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
        li {
          float: left;
          line-height: 18px;
          a {
            display: block;
            cursor: pointer;
            padding: 11px 15px;
            color: #777;
            text-decoration: none;
          }
          &.active {
            a {
              background: #e1251b;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .goods-list {
    margin: 20px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
        .list-wrap {
          .p-img {
            padding-left: 15px;
            width: 215px;
            height: 255px;
            a {
              color: #666;
              img {
                max-width: 100%;
                height: auto;
                vertical-align: middle;
              }
            }
          }
          .price {
            padding-left: 15px;
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: -5px;
              }
              em {
                padding-right: 10px;
              }
            }
          }
          .attr {
            padding-left: 15px;
            width: 85%;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a {
              color: #333;
              text-decoration: none;
            }
          }
          .commit {
            padding-left: 15px;
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            span {
              font-weight: 700;
              color: #646fb0;
            }
          }
          .operate {
            padding: 12px 15px;
            .sui-btn {
              display: inline-block;
              padding: 2px 14px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 0;
              background-color: transparent;
              margin-right: 15px;
            }
            .btn-bordered {
              min-width: 85px;
              background-color: transparent;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              &:hover {
                border: 1px solid #666;
                color: #fff !important;
                background-color: #666;
                text-decoration: none;
              }
            }
            .btn-danger {
              border: 1px solid #e1251b;
              color: #e1251b;
              &:hover {
                border: 1px solid #e1251b;
                background-color: #e1251b;
                color: white !important;
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
