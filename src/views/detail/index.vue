<template>
  <view>

    <topbar bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">18comic</block>
      <block slot="right">
        <text>下载</text>
      </block>
    </topbar>

    <!-- 信息 -->
    <view class="flex solid-bottom padding-sm justify-between bg-white">
      <view class="bg-img bg-mask bg-cover-box" :style="{
        backgroundImage: `url(${ img })`
      }"></view>
      <view class="padding-left-sm padding-right-sm">
        <view class="text-df text-black">{{ title }}</view>
        <view class="text-pink">{{ author }}</view>
      </view>
      <view>
        <text style="font-size: 60rpx" class="cuIcon-favor padding-sm" />
      </view>
    </view>

    <!-- 标签 -->
    <view class="padding-xs flex flex-wrap bg-white">
      <view class="padding-xs" v-for="(item, index) in 10" :key="index">
        <view class="cu-tag line-pink round">
          {{ '御姐' }}
        </view>
      </view>
    </view>

    <!-- 简介 -->
    <view class="padding-xs bg-white">
      <text class="text-cut" style="width: 420rpx">{{ desc }}</text>
    </view>

    <!-- 操作栏 -->
    <view class="flex p-xs margin-bottom-sm padding-top-sm padding-bottom-sm bg-white">
      <view class="flex flex-treble radius flex-direction padding-left-sm padding-right-sm">
        <button class="cu-btn round bg-pink lg">开始阅读</button>
      </view>
      <view class="flex flex-twice flex-direction padding-left-sm padding-right-sm">
        <button class="cu-btn round bg-pink lg light">预览</button>
      </view>
      <view class="flex-twice"></view>
    </view>

    <!-- 选集 -->
    <view class="grid margin-bottom-xs margin-top text-center col-4 solids-top bg-gray">
      <view class="padding-xs margin-bottom-sm" v-for="(item, index) in 10" :key="index">
        <view class="shadow bg-cyan padding-sm radius">
          第{{ index }}话
        </view>
      </view>
    </view>

    <!-- 推荐 -->
    <Card title="看过这个本子的人也有在看" :data="tempList" />

  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { getIndexData } from '@/api/v1'
import Card from '@/components/card.vue'
import topbar from '@/components/topbar.vue'

export default Vue.extend({
  components: {
    topbar,
    Card
  },
  data() {
    return {
      title: '[同人汉化] [禁漫漢化組] 小鏡華與呼糖侵犯派對 (C98) [きつね屋 (リーフィ)]キョウカちゃんとおかしぱ (プリンセスコネクト!Re:Dive)',
      img: 'https://cdn-msp.18comic.biz/media/albums/187422_3x4.jpg?v=1590499803',
      author: '周某人',
      desc: `我說，榮口…你無論如何…就是想要嗎？」她用勾人的眼神盯著我，將身體靠了過來…女生主動對自己這樣…讓我怎麼可能不誤會！——醒來卻發現，自己身處一片黑暗之中。與研討會的同學在家喝酒之後，我醉了過去。然而醒來之後卻發現身邊睡的便是我偷偷心儀的女生，左振同學。而且她衣衫不整，重點部位（奶頭）若隱若現，睡得正香…（吞口水）。我裝作自己也睡迷糊了，悄悄撫摸她柔軟的身體，卻沒想到把她吵醒……正當我害怕之時，她卻突然逼近，咦？妳要幹嘛……！？嬌俏可人、古靈精怪、十分……性感的左振同學不停玩弄我這個處男……？`,
      tempList: []
    }
  },
  onLoad(ops) {
    console.log('ops: ', ops);
  },
  async created() {
		const data = await getIndexData()
		this.tempList = data
	},
})
</script>

<style scoped>
.bg-cover-box {
  width: 840rpx;
  max-width: 50vw;
  height: 320upx;
  padding: 12rpx;
}
</style>