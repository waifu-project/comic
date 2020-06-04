<template>
  <view>
    <view class="nowBg" :style="{ opacity }">
      <view class="big-bg bg-gradual-blue padding" :style="bgStyle" />
    </view>
    <slot></slot>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import cssType from 'csstype'
import { blur_default_url } from '@/const'

/**
* 毛玻璃
* @desc 生成毛玻璃效果
* @author d1y<chenhonzhou@gmail.com>
* @date 2020年05月25日17:22:43
* @param {String} [bg]    - 背景
* @param {Number} [blur]  - 模糊度
* @param {Boolean} [dark] - 是否显示黑白
* @param {Number} [opacity] - 透明度(0-1)
* @example 调用示例
*  <glass :bg="" :blur="12" :dark="false"></glass>
 */
export default Vue.extend({
  name: 'glass',
  props: {
    bg: {
      required: false,
      type: String,
      default: (): string=> blur_default_url
    },
    blur: {
      required: false,
      type: Number,
      default: 4
    },
    dark: {
      required: false,
      type: Boolean,
      default: false
    },
    opacity: {
      required: false,
      type: Number,
      default: 1
    }
  },
  computed: {
    bgStyle: {
      get(): cssType.Properties {
        const bgUrl = this.bg
        const blur = this.blur
        const isDark = this.dark
        let filter: string = isDark ? `grayscale(100%)` : `blur(${ blur }px)`
        const obj: cssType.Properties = {
          backgroundImage: bgUrl ? `url('${ bgUrl }')` : `unset`
        }
        let resultObj: cssType.Properties = {
          WebkitFilter: filter,
          filter
        }
        Object.assign(obj, resultObj)
        return obj
      }
    }
  }
})
</script>

<style scoped>
.nowBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.big-bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>