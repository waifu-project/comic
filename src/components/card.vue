<template>
  <view>
    <view class="cu-bar">
      <view class="action">
        <text class="cuIcon-titles" :class="`text-${ lineColor }`" />
        <text class="text-xl text-bold">{{ title }}</text>
      </view>
    </view>
    <scroll-view scroll-x class="nav" scroll-with-animation>
      <view class="grid col-3 diy-grid">
        <view
          class="cu-item grid-card-item"
          v-for="(item,index) in data"
          :key="index"
          :style="{
          minWidth: `33.33%`
        }"
        >
          <view class="bg-img bg-mask"
            :style="{
              minWidth: `100%`,
              backgroundImage: `url(${ item.cover })`,
              height: `320upx`
            }"
            @tap="handleClickItem(false, item, index)"
          ></view>
          <view
            :style="{ lineHeight: `60rpx` }"
            @tap="handleClickItem(true, item, index)" class="text-cut"
          >
            {{ item.title }}
          </view>
          <slot name="default" :row="item" />
        </view>
      </view>
    </scroll-view>

    <!-- 丢弃的弹窗 -->
    <view class="cu-modal bottom-modal" :class="{ show: currentModalFlag }" @tap="currentModalFlag = false">
      <view class="cu-dialog" @tap.stop="">
        <card-preview :data="currentData" />
      </view>
    </view>
  </view>
</template>

<script>

/**
* 卡片
* @desc 卡片
* @author d1y<chenhonzhou@gmail.com>
* @date 2020年05月25日17:22:43
* @param {String} [title]    - 标题
* @param {Array} [data]  - 列表数据
* @param {String} [lineColor] - 线条的颜色
* @example 调用示例
*  <card :title="'你好'" :data="[]" :lineColor="'blue'"></glass>
 */

import cardPreview from '@/components/card-preview'
import { router } from '@/utils'
export default {
  name: "x-card",
  components: {
    cardPreview
  },
  props: {
    title: {
      required: true,
      type: String
    },
    data: {
      type: Array,
      default: () => []
    },
    lineColor: {
      type: String,
      default: 'green'
    }
  },
  data() {
    return {
      currentData: {
        title: '',
        cover: '',
        author: '',
        desc: ``,
      },
      currentModalFlag: false
    }
  },
  methods: {
    handleClickItem(flag, item, index) {
      if (flag) {
        // TODO 预览内容
        this.currentData = item
        this.currentModalFlag = true
      } else {
        // TODO 跳转
        const { id } = item
        router.push(`detail/index`, {
          id
        })
      }
      this.$emit('click', {
        flag,
        item,
        index
      })
    }
  }
};
</script>

<style scoped>
.diy-grid {
  flex-wrap: nowrap;
}
.grid-card-item {
  margin: unset;
  height: auto;
}
</style>