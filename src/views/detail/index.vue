<template>
  <view>

    <topbar bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">18comic</block>
      <block slot="right">
        <text>下载</text>
      </block>
    </topbar>

    <card-preview :data="data" />

    <!-- 选集 -->
    <view class="grid margin-bottom-xs margin-top text-center col-4 solids-top bg-gray">
      <view class="padding-xs margin-bottom-sm" v-for="(item, index) in data.episode" :key="index">
        <view class="shadow bg-cyan padding-sm radius">
          第{{ index }}话
        </view>
      </view>
    </view>

    <!-- 推荐 -->
    <Card title="看过这个本子的人也有在看" :data="data.recommends" />

  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { getIndexData, getDetail } from '@/api/v1'
import Card from '@/components/card.vue'
import CardPreview from '@/components/card-preview.vue'

export default Vue.extend({
  components: {
    Card,
    CardPreview,
  },
  data() {
    return {
      data: {
        title: '', // 标签
        cover: '', // 封面图
        tags: [], // 标签
        authors: [], // 作者
        desc: '', // 介绍
        page_count: 0, // 页数
        date: '', // 创建时间
        review: 0, // 浏览量
        like_count: 0, // 点赞数
        comment_count: 0, // 评论
        previews: [], // 预览
        episode: [], // 选集
        recommends: [], // 推荐
      }
    }
  },
  async onLoad(ops: any) {
    let { id } = ops
    id = id ? id : 105924
    const data = await getDetail(id)
    this.data = data
  }
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