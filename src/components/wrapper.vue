<template>
  <scroll-view
    scroll-y
    :style="style"
    :show-scrollbar="isScrollbar"
    :scroll-top="top"
    :scroll-with-animation="true"
    @scroll="handleScroll(false, $event)"
    @scrolltolower="handleScroll('bottom', $event)"
    @scrolltoupper="handleScroll('top', $event)"
  >
    <slot name="default" />
  </scroll-view>
</template>

<script lang="ts">
/**
 * 包裹层
 * @desc 该组件主要是为了解决 `ios` 的 `bar` 高度问题
 * @author d1y<chenhonzhou@gmail.com>
 * @date 2020年06月04日23:41:43
 * @event `@scroll 触发事件`
 * @param {Boolean} [isScrollbar] - 控制是否出现滚动条
 * @example 调用示例
 *  <wrapper @scroll=""></wrapper>
 */
import Vue from "vue";
import cssType from "csstype";
import { isIos, isAndroid } from "@/utils/is";
export default Vue.extend({
  name: "wrapper",
  props: {
    /**
     * 控制是否出现滚动条
     */
    isScrollbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      top: 0,
      old: {
        scrollTop: 0
      }
    };
  },
  computed: {
    style(): cssType.Properties {
      const info = uni.getSystemInfoSync();
      let h = info.windowHeight || 0;
      const _b = info.statusBarHeight || 0;
      const CustomBar = (this as any).CustomBar;
      // fixbug: 在 `ios` 下, 需要减去 `statusBarHeight`
      if (isIos()) h = h - _b;
      // fixbug: 在 `android`下, 需要减去自定义的 `CustomBar`
      if (isAndroid()) h = h - CustomBar;
      //#ifdef H5
      h = h - CustomBar;
      //#endif
      return {
        height: `${h}px`
      };
    }
  },
  methods: {
    handleScroll(position: string | boolean, event: any) {
      if (!position) {
        this.top = this.old.scrollTop
        return
      }
      this.$emit("scroll", {
        position,
        event
      });
    },
    /**
     * 跳转顶部
     * 参考: https://ask.dcloud.net.cn/article/36612
     */
    goTop() {
      const R = Math.random()
      this.top = R
    }
  }
});
</script>