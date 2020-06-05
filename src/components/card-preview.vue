<template>
  <view>

    <!-- 信息 -->
    <view class="flex solid-bottom padding-sm justify-between bg-white">
      <view class="bg-img bg-mask bg-cover-box" @click="handlePreview(data.cover)" :style="{ backgroundImage: `url(${ data.cover })` }"></view>
      <view class="padding-left-sm padding-right-sm text-left">
        <view class="text-df text-black">{{ data.title }}</view>
        <view class="text-pink">{{ data.authors && data.authors[0] }}</view>
      </view>
      <view>
        <text style="font-size: 60rpx" class="cuIcon-favor padding-sm" />
      </view>
    </view>

    <!-- 标签 -->
    <view class="padding-xs flex flex-wrap bg-white">
      <view class="padding-xs" v-for="(item, index) in data.tags" :key="index">
        <view class="cu-tag line-pink round">{{ item }}</view>
      </view>
    </view>

    <!-- 简介 -->
    <view class="padding-xs bg-white">
      <text class="text-cut" style="width: 420rpx">{{ data.desc }}</text>
    </view>

    <!-- 操作栏 -->
    <view class="flex p-xs margin-bottom-sm padding-top-sm padding-bottom-sm bg-white">
      <view class="flex flex-treble radius flex-direction padding-left-sm padding-right-sm">
        <button class="cu-btn round bg-pink lg" @click="handleReader(data.id)">开始阅读</button>
      </view>
      <view class="flex flex-twice flex-direction padding-left-sm padding-right-sm">
        <button class="cu-btn round bg-pink lg light" @click="handlePreview(...data['previews'])">预览</button>
      </view>
      <view class="flex-twice"></view>
    </view>

  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { router } from '../utils';
export default Vue.extend({
  name: 'card-preview',
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  methods: {
    handlePreview(...imgs: any[]) {
      uni.previewImage({
        urls: imgs,
        current: ""
      })
    },
    handleReader(id: string | number) {
      router.push(`reader/index`, {
        id
      })
    }
  }
});
</script>

<style scoped>
.bg-cover-box {
  width: 840rpx;
  max-width: 50vw;
  height: 320upx;
  padding: 12rpx;
}
</style>