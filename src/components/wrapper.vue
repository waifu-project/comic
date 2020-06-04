<template>
  <scroll-view scroll-y :style="style">
    <slot name="default" />
  </scroll-view>
</template>

<script lang="ts">
/**
* 包裹层
* @desc 该组件主要是为了解决 `ios` 的 `bar` 高度问题
* @author d1y<chenhonzhou@gmail.com>
* @date 2020年06月04日23:41:43
* @example 调用示例
*  <wrapper></wrapper>
 */
import Vue from 'vue'
import cssType from 'csstype'
export default Vue.extend({
  name: 'wrapper',
  computed: {
    style(): cssType.Properties {
      const info = uni.getSystemInfoSync()
      let h = info.windowHeight || 0
      const _b = info.statusBarHeight || 0
      const isIos: boolean = (info.platform || "").search('ios') >= 0
      if (isIos) h = h - _b
      return {
        height: `${ h }px`
      }
    }
  }
})
</script>