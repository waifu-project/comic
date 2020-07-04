<template>
  <scroll-view
    scroll-y
    :style="style"
    :show-scrollbar="isScrollbar"
    :scroll-top="top"
    :scroll-with-animation="true"
    @scrolltolower="handleScroll('bottom', $event)"
    @scrolltoupper="handleScroll('top', $event)"
    :class="isDark? 'dark-theme' : ''"
  >
    <view v-if="isLoading" class="flex align-center justify-center" :style="loadingStyle">
      <view class="message-box">
        <image class="imageClass" :src="loadingImae" mode="aspectFit" />
        <view class="text-center text-pink text-lg">
          <text>{{ '加载中...' }}</text>
        </view>
        <view class="text-center margin-top-sm">
          <button class="cu-btn round bg-red margin-right-sm">重试</button>
          <button class="cu-btn round bg-green">取消</button>
        </view>
      </view>
    </view>
    <slot name="default" v-else />
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
import { mapState } from 'vuex'
import { _loadingImage } from '@/config/assets'
export default Vue.extend({
  name: "wrapper",
  props: {
    /**
     * 控制是否出现滚动条
     */
    isScrollbar: {
      type: Boolean,
      default: false
    },
    /**
     * 深色模式
     */
    darkmode: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: false
    },
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
    loadingStyle(): cssType.Properties {
      const ctx = uni.getSystemInfoSync()
      return {
        width: `${ ctx.windowWidth }px`,
        height: `${ ctx.windowHeight }px`,
        background: `#fff`,
      }
    },
    loadingImae() {
      return _loadingImage;
    },
    ...mapState('settings',[
      'isDark'
    ]),
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

      let safaPoint = info.safeArea?.height || 0

      // h = h - safaPoint

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

<style scoped>
.imageClass {
  width: 320rpx;
  height: 320rpx;
  border-bottom-left-radius: 42rpx;
  border-bottom-right-radius: 42rpx;
}
.message-box {
  height: 820rpx;
}
</style>