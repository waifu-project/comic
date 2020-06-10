<template>
  <view>
    <view class="cu-custom" :style="wrapperStyle">
      <view class="cu-bar fixed" :style="ppStyle" v-if="isAndroid" />
      <view
        class="cu-bar fixed"
        :style="style"
        :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]"
      >
        <block v-if="!diy">
          <view class="action" @tap="BackPage" v-if="isBack">
            <text class="cuIcon-back"></text>
            <slot name="backText"></slot>
          </view>
          <!-- fixbug: 不支持绝对定位, 不然无法触发事件 -->
          <view :class="{ content: !fixEvent }" :style="[{top:StatusBar + 'px'}]">
            <slot name="content"></slot>
          </view>
          <slot name="right"></slot>
        </block>
        <block v-else>
          <slot name="default"></slot>
        </block>
      </view>
    </view>
  </view>
</template>

<script>

/**
 * 自定义 `bar`
 * @desc 该组件参考: https://www.npmjs.com/package/colorui
 * @author d1y<chenhonzhou@gmail.com>
 * @param {Boolean} [diy] - 是否使用默认的布局
 * @param {Boolean} [bgColor] - 默认布局的背景颜色, 颜色值参考 const/index color[]
 * @param {Boolean} [isBack] - 默认布局, 是否使用默认的返回按钮
 * @param {String} [bgImg] - 默认布局, 背景图片
 * @param {Number} [blur] - 模糊滤镜, 模糊大小
 * @param {Number} [isBlur] - 是否模糊
 * @param {String} [barImg] - 模糊的背景图片
 * @param {Boolean} [fixEvent] - 是否解决事件无法触发问题(.content的错误)
 * @example 调用示例
 *  <topbar></topbar>
 */
import { blur_default_url } from '@/const'
import { isIos, isAndroid } from '@/utils/is'
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    };
  },
  name: "topbar",
  computed: {
    isAndroid() {
      return isAndroid()
    },
    isIos() {
      return isIos()
    },
    style() {
      const StatusBar = this.StatusBar
      const CustomBar = this.CustomBar
      const bgImage = this.bgImage
      const isBlur = this.isBlur
      const blurPx = this.blur || 12
      const _blur = `blur(${ blurPx }px)`
      const style = {
        height: `${ CustomBar }px`,
        paddingTop: `${ StatusBar }px`,
      }
      if (isBlur) {
        const box = {
          /* Google Chrome */
          backdropFilter: _blur,
          /* Safari for macOS & iOS */
          WebkitBackdropFilter: _blur,
        }
        Object.assign(style, box)
      }
      if (this.bgImage) {
        Object.assign(style, {
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          overflow: 'hidden'
        })
      }
      return style
    },
    wrapperStyle() {
      const barHeight = this.CustomBar
      const b = this.barImg
      const custom = {}
      // const i = this.isIos()
      // if (i) custom['backgroundImage'] = `url(${ b })`
      const e = {
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        height: `${ barHeight }px`,
      }
      Object.assign(e, custom)
      return e
    },
    ppStyle() {
      const isBlur = this.isBlur
      const blurPx = this.blur || 12
      const _blur = `blur(${ blurPx }px)`
      const CustomBar = this.CustomBar
      const StatusBar = this.StatusBar
      const barImg = this.barImg
      const r =  {
        height: `${ CustomBar }px`,
        paddingTop: `${ StatusBar }px`,
        backgroundImage: `url(${ barImg })`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        overflow: `hidden`
      }
      if (isBlur) r['filter'] = _blur
      return r
    }
  },
  props: {
    diy: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: ""
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ""
    },
    blur: {
      type: Number,
      default: 18
    },
    isBlur: {
      type: Boolean,
      default: true
    },
    barImg: {
      type: String,
      default: ()=> blur_default_url
    },
    fixEvent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    BackPage() {
      if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
        let url = "/" + __wxConfig.pages[0]
        return uni.redirectTo({ url })
      }
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style scoped>

</style>