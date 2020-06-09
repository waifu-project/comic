<template>
  <view class="bg-img flex align-center" :style="styl">
    <slot name="default" />
  </view>
</template>

<script lang="ts">

/**
 * 内容为空时展示
 * @desc 内容为空时展示
 * @author d1y<chenhonzhou@gmail.com>
 * @param {String} [bg] - 背景图片
 * @param {Object} [boxStyle] - 大盒子的样式
 * @example 调用示例
 *  <empty></empty>
 */
import Vue from 'vue'
import { empty_default_url } from '@/const'
import cssType from 'csstype'
export default Vue.extend({
  name: 'empty',
  props: {
    bg: {
      type: String,
      default: empty_default_url
    },
    boxStyle: {
      type: Object,
      default: ()=> {}
    }
  },
  computed: {
    styl(): cssType.Properties {
      const bg = this.bg
      const obj = {
        height: `550rpx`,
        backgroundPosition: `-48px`,
        backgroundImage: `url(${ bg })`
      }
      const _styl = this.boxStyle
      Object.assign(obj, _styl)
      return obj
    }
  }
})
</script>

<style>

</style>