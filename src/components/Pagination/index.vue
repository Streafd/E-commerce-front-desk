<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled" @click="acc('1')">
          <a>«上一页</a>
          <!-- 上页面 -->
        </li>
        <li
          :class="{ active: pagNa == 1 }"
          v-show="this.starNumandendNum.start > 1"
          @click="acc(1)"
        >
          <a>1</a>
        </li>
        <li class="dotted" v-show="startNum"><span>...</span></li>
        <!-- 中间页面 -->
        <li
          v-for="(item, index) in arrNum"
          :key="index"
          @click="acc(item)"
          :class="{ active: pagNa == item }"
        >
          <a>{{ item }}</a>
        </li>

        <!-- 下页面 -->
        <li
          class="dotted"
          v-show="this.starNumandendNum.end < this.totalPage - 1"
        >
          <span>...</span>
        </li>
        <li
          v-show="this.starNumandendNum.end < this.totalPage"
          @click="acc(totalPage)"
          :class="{ active: this.pagNa == totalPage }"
        >
          <a>{{ totalPage }}</a>
        </li>
        <li class="next" @click="acc(2)">
          <a>下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ total }}数据&nbsp;</span>
        <!-- <button :disabled="true" @click="console.log(1)">xxx</button> -->
      </div>
    </div>
  </div>
</template>

<script>
import keyWrod from '@/EventBus'
export default {
  name: 'Pagination',
  props: ['pagNa', 'pagSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pagSize)
    },
    //计算出连续的页码的起始数字和结束数字
    starNumandendNum() {
      //先定义两个变量存储起始数字与结束数字
      let start = 0
      let end = 0
      //不正常现象，总页数没有连续页码多
      if (this.continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        //正常现象【连续页码5，但是你的总页数一定大于5的】
        start = this.pagNa - parseInt(this.continues / 2)
        end = this.pagNa + parseInt(this.continues / 2)
        //把出现不正常的现象【start数字出现0|负数】,进行修正
        if (start < 1) {
          //这样情况下，连续页码起始为1，结束等于连续页码的个数
          start = 1
          end = this.continues
        }
        //把出现不正常的现象【end数字大于总页码数】,进行修正
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1
          end = this.totalPage
        }
      }
      return { start, end }
    },
    //计算需要循环的连续数字
    arrNum() {
      const num = []
      for (
        let i = this.starNumandendNum.start;
        i <= this.starNumandendNum.end;
        i++
      ) {
        num.push(i)
      }
      return num
    },
    startNum() {
      return this.starNumandendNum.start > 2 ? true : false
    }
  },
  methods: {
    //传递页码数给Serach组件
    acc(num) {
      if (num === '1') {
        if (this.pagNa != 1) {
          keyWrod.$emit('getPageNo', this.pagNa - 1)
        }
      } else if (num == 2) {
        if (this.pagNa != this.totalPage) {
          keyWrod.$emit('getPageNo', this.pagNa + 1)
        }
      } else {
        keyWrod.$emit('getPageNo', num)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  width: 800px;
  height: 66px;
  overflow: hidden;
  float: left;
  .sui-pagination {
    margin: 18px 0;
    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
      width: 700px;
      float: left;
      li {
        line-height: 18px;
        display: inline-block;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }
        &.active {
          a {
            background-color: #fff;
            color: #e1251b;
            // border-color: #fff;
            cursor: default;
            border: 1px solid #e0e9ee;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
          }
        }
        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }
        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }
        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }
    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 100px;
      text-align: center;
      line-height: 35px;
    }
  }
}
</style>
