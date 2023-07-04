<template>
  <div>
    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <div class="conPoin">
          <a v-show="categoryView.category1Id">{{
            categoryView.category1Name
          }}</a>
          <a v-show="categoryView.category2Id">{{
            categoryView.category2Name
          }}</a>
          <a v-show="categoryView.category3Id">{{
            categoryView.category3Name
          }}</a>
        </div>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <div class="preview">
            <div class="jqzoom">
              <img :src="skuInfo.skuDefaultImg" />
            </div>
          </div>
          <!--下方的缩略图-->
          <div class="specScroll">
            <!--左按钮-->
            <a class="prev">&lt;</a>
            <!-- 中间可滑动区域 -->
            <div class="items">
              <div class="itemsCon" style="transition: all 0.5s ease 0s">
                <img
                  :src="item.imgUrl"
                  alt=""
                  v-for="item in skuInfo.skuImageList"
                  :key="item.id"
                />
              </div>
            </div>
            <!--右按钮-->
            <a class="next">&gt;</a>
          </div>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ skuInfo.skuName }}
            </h3>
            <p class="news">
              推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
                <dt>{{ item.saleAttrName }}</dt>
                <dd @click="changeActive(item.saleAttrValueName)">
                  {{ item.saleAttrValueName }}
                </dd>
              </dl>
            </div>

            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  v-model.number="skuNum"
                  @change="changeskuNum(skuNum)"
                />
                <a class="plus" @click="skuNum++">+</a>
                <a class="mins" @click="skuNum > 1 ? skuNum-- : '1'">-</a>
              </div>
              <div class="add">
                <a @click="addshoppcart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'countent',
  data() {
    return { skuNum: 1 }
  },
  computed: {
    ...mapState('detail', ['categoryView', 'skuInfo'])
  },
  methods: {
    changeActive(value) {},
    //用户输入进来的文本*1，判断是数字还是NaN
    changeskuNum(value) {
      let num = value * 1
      if (isNaN(num) || num < 1) {
        this.skuNum = 1
      } else {
        this.skuNum = parseInt(num)
      }
    },
    async addshoppcart() {
      //1.发请求--将产品加入到数据库(通知服务器)
      // 下面这行代码：调用仓库中的AddOrUpdata，这个方法加上了async，返回一定是一个Promise
      //Promise要么成功或失败
      try {
        //成功
        await this.$store.dispatch('detail/AddOrUpdata', {
          skuId: this.$route.params.id,
          skuNum: this.skuNum
        })
        let skuinfo = JSON.stringify(this.skuInfo)
        sessionStorage.setItem('SKUINFO', skuinfo)
        //进行路由跳转
        this.$router.push({ name: 'addcatr', query: { skuNum: this.skuNum } })
      } catch (error) {
        alert(error.message)
        //失败
      }
      //2.服务器存储成功--进行路由跳转传递参数
      //3.失败，给用户进行提示
    }
  }
}
</script>

<style lang="less" scoped>
.con {
  width: 1200px;
  margin: 15px auto 0;
  .conPoin {
    padding: 9px 15px 9px 0;
    & > a + a:before {
      content: '/\00a0';
      padding: 0 5px;
      color: #ccc;
    }
  }
  .mainCon {
    overflow: hidden;
    margin: 5px 0 15px;
    .previewWrap {
      float: left;
      width: 400px;
      position: relative;
      .preview {
        width: 400px;
        height: 400px;
        border: 1px solid #dfdfdf;
        .jqzoom {
          cursor: pointer;
          width: 400px;
          height: 400px;
          position: relative;
          img {
            width: 100%;
          }
          .mask {
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.5);
            position: absolute;
            left: 0;
            top: 0;
            border: 1px solid #ddd;
          }
        }
        .maxbox {
          width: 400px;
          height: 400px;
          position: absolute;
          left: 420px;
          top: 0px;
          overflow: hidden;
          z-index: 20;
          border: 1px solid #ddd;
          img {
            width: 800px;
            height: 800px;
            display: block;
          }
        }
      }
      .specScroll {
        margin-top: 5px;
        width: 400px;
        overflow: hidden;
        .prev,
        .next {
          text-align: center;
          width: 10px;
          height: 54px;
          line-height: 54px;
          border: 1px solid #ccc;
          background: #ebebeb;
          cursor: pointer;
        }
        .prev {
          float: left;
          margin-right: 4px;
        }
        .next {
          float: right;
        }
        .items {
          float: left;
          position: relative;
          width: 372px;
          height: 56px;
          overflow: hidden;
          .itemsCon {
            position: absolute;
            width: 9999px;
            height: 56px;
            left: 0;
            img {
              float: left;
              text-align: center;
              border: 1px solid #ccc;
              padding: 2px;
              width: 50px;
              height: 50px;
              margin-right: 20px;
            }
          }
        }
      }
    }
    .InfoWrap {
      width: 700px;
      float: right;
      .InfoName {
        font-size: 14px;
        line-height: 21px;
        margin-top: 15px;
      }
      .news {
        color: #e12228;
        margin-top: 15px;
      }
      .priceArea {
        background: #fee9eb;
        padding: 7px;
        margin: 13px 0;
        .priceArea1 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            float: left;
            margin-right: 15px;
          }
          .price {
            float: left;
            color: #c81623;
            i {
              font-size: 16px;
            }
            em {
              font-size: 24px;
              font-weight: 700;
            }
            span {
              font-size: 12px;
            }
          }
          .remark {
            float: right;
          }
        }
        .priceArea2 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            margin-right: 15px;
            float: left;
          }
          .fixWidth {
            width: 520px;
            float: left;
            .red-bg {
              background: #c81623;
              color: #fff;
              padding: 3px;
            }
            .t-gray {
              color: #999;
            }
          }
        }
      }
      .support {
        border-bottom: 1px solid #ededed;
        padding-bottom: 5px;
        .supportArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            margin-right: 15px;
            float: left;
          }
          .fixWidth {
            width: 520px;
            float: left;
            color: #999;
          }
        }
      }
      .choose {
        .chooseArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .choosed {
            mark {
              height: 30px;
              display: inline-block;
              line-height: 30px;
              background-color: snow;
              border: 1px solid #ddd;
              padding: 0 20px;
              margin-right: 20px;
              a {
                font-size: 12px;
                color: red;
                margin-left: 20px;
                cursor: pointer;
              }
            }
          }
          dl {
            overflow: hidden;
            margin: 13px 0;
            dt {
              margin-right: 15px;
              float: left;
            }
            dd {
              float: left;
              margin-right: 5px;
              color: #666;
              line-height: 24px;
              padding: 2px 14px;
              border-top: 1px solid #eee;
              border-right: 1px solid #bbb;
              border-bottom: 1px solid #bbb;
              border-left: 1px solid #eee;
              &:nth-of-type(1) {
                color: red;
              }
            }
          }
        }
        .cartWrap {
          .controls {
            width: 48px;
            position: relative;
            float: left;
            margin-right: 15px;
            .itxt {
              width: 38px;
              height: 37px;
              border: 1px solid #ddd;
              color: #555;
              float: left;
              border-right: 0;
              text-align: center;
            }
            .plus,
            .mins {
              width: 15px;
              text-align: center;
              height: 17px;
              line-height: 17px;
              background: #f1f1f1;
              color: #666;
              position: absolute;
              right: -8px;
              border: 1px solid #ccc;
            }
            .mins {
              right: -8px;
              top: 19px;
              border-top: 0;
            }
            .plus {
              right: -8px;
            }
          }
          .add {
            float: left;
            a {
              background-color: #e1251b;
              padding: 0 25px;
              font-size: 16px;
              color: #fff;
              height: 36px;
              line-height: 36px;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
