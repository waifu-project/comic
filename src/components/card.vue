<template>
  <view>
    <view class="cu-bar bg-white">
      <view class="action">
        <text class="cuIcon-titles text-green" />
        <text class="text-xl text-bold">{{ title }}</text>
      </view>
    </view>
    <scroll-view scroll-x>
      <view class="grid margin-bottom text-center col-3">
        <view style="height: 10vh" v-for="(item, index) in 20" :key="index">
          {{ item }}
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'x-card',
  props: {
    title: {
      required: true,
      type: String
    },
    data: {
      type: Array,
      default: ()=> []
    }
  }
}
</script>

<style>

</style>