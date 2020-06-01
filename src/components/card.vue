<template>
  <view>
    <view class="cu-bar bg-white">
      <view class="action">
        <text class="cuIcon-titles text-green" />
        <text class="text-xl text-bold">{{ title }}</text>
      </view>
    </view>
    <scroll-view scroll-x class="bg-white nav" scroll-with-animation>
      <view class="grid col-3 diy-grid">
        <view class="cu-item grid-card-item" v-for="(item,index) in data" :key="index">
          <view class="bg-img bg-mask" :style="{
            backgroundImage: `url(${ item.cover })`,
            height: `320upx`
          }"></view>
          <!-- <image :src="item.cover" /> -->
          <view class="text-cut">{{ item.title }}</view>
        </view>
      </view>
		</scroll-view>
    <!-- <scroll-view scroll-x>
      <view class="grid margin-bottom text-center col-3">
        <view style="height: 10vh" v-for="(item, index) in 20" :key="index">
          {{ item }}
        </view>
      </view>
    </scroll-view> -->
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

<style scoped>
.diy-grid {
  flex-wrap: nowrap
}
.grid-card-item {
  margin: unset;
  height: auto;
}
</style>