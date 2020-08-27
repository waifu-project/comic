<template>
  <view class="text-center padding flex flex-direction">
    <button @tap="handleClickButton" class="cu-btn round bg-pink shadow lg">
      <text class="margin-right-xs" :class="[ `cuIcon-${ icon }` ]" />
      {{ text }}
    </button>
  </view>
</template>

<script>

/**
 * create by d1y<chenhonzhou@gmail.com>
 * 2020-08-28
 * 重新加载按钮
 * (首页/主题都用到了, 所以封装一层..)
 * 演示
 * <reload-button bgColor="green" text="刷新" icon="search" />
 */

import { reloadButtonText } from '@/const'
export default {
  name: `reload-button`,
  props: {
    /**
     * 背景颜色
     */
    bgColor: {
      type: String,
      default: `pink`
    },
    /**
     * 文本
     */
    text: {
      type: String,
      default: reloadButtonText
    },
    /**
     * 图标
     */
    icon: {
      type: String,
      default: `loading`
    }
  },
  methods: {
    handleClickButton() {
      this.$emit("click")
    }
  }
}
</script>

<style>

</style>