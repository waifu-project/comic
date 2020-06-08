<template>
  <view>
    <view class="cu-custom" :style="wrapperStyle">
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
          <view class="contentx" :style="[{top:StatusBar + 'px'}]">
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
 * @example 调用示例
 *  <topbar></topbar>
 */
import { blur_default_url } from '@/const'
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
    };
  },
  name: "topbar",
  computed: {
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
          backgroundImage: `url(${bgImage})`
        })
      }
      return style
    },
    wrapperStyle() {
      const x = this.CustomBar
      const b = this.barImg
      return {
        backgroundPosition: `center`,
        backgroundRepeat: `no-repeat`,
        backgroundImage: `url(${ b })`,
        height: `${ x }px`
      }
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