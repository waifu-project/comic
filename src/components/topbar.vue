<template>
  <view>
    <view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
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
          <view class="content" :style="[{top:StatusBar + 'px'}]">
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
// 该组件参考: https://www.npmjs.com/package/colorui
export default {
  data() {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    };
  },
  name: "topbar",
  computed: {
    style() {
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var bgImage = this.bgImage;
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`;
      }
      return style;
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
    }
  },
  methods: {
    BackPage() {
      if (getCurrentPages().length < 2 && "undefined" !== typeof __wxConfig) {
        let url = "/" + __wxConfig.pages[0];
        return uni.redirectTo({ url });
      }
      uni.navigateBack({
        delta: 1
      });
    }
  }
};
</script>

<style>
</style>