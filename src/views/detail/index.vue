<template>
  <view>

    <topbar :blur="32" :isBack="true" :barImg="data.cover">
      <block slot="backText">返回</block>
      <block slot="content">18comic</block>
      <!-- 暂时不支持下载操作 -->
      <block slot="right" v-if="false">
        <text>下载</text>
      </block>
    </topbar>

    <wrapper :isLoading="isLoading">

      <card-preview ref="card" :data="data" :isFavorite="true" />

      <!-- 选集 -->
      <view class="grid margin-bottom-xs margin-top text-center col-4 bg-gray" :class="!isDark ? 'solids-top' : ''">
        <view class="padding-xs margin-bottom-sm" v-for="(item, index) in data.episode" :key="index">
          <view
            class="shadow bg-cyan padding-sm radius dark-remove flex align-center justify-center"
            @tap="handleClickReader(item)"
            :style="{ position: `relative`, height: `100%` }"
          >
            <view class="cu-tag badge" v-if="current_index === index">上次看过</view>
            <!-- <view class="dark-remove">第{{ index }}话</view> -->
            <view class="dark-remove">{{ item.ep_title }}</view>
          </view>
        </view>
      </view>

      <!-- 推荐 -->
      <Card title="看过这个本子的人也有在看" :data="data.recommends" />

    </wrapper>

  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'
import { getIndexData, getDetail } from '@/api/v1'
import Card from '@/components/card.vue'
import CardPreview from '@/components/card-preview.vue'
import { mapState, mapGetters } from 'vuex'
import { detailDataInterface } from '@/interface/pages'
import { episodeInterface } from '@/interface'

export default Vue.extend({
  components: {
    Card,
    CardPreview,
  },
  data(): detailDataInterface {
    return {
      data: {
        id: '',
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
      },
      isLoading: false
    }
  },
  computed: {
    ...mapState('settings', [
      'isDark'
    ]),
    ...mapGetters('reader', [
      'current_index'
    ])
  },
  methods: {
    ...mapMutations('reader', [
      'SET_CURRENT_READER_DATA_ID',
      'SET_CURRENT_READER_DATA'
    ]),
    async handleClickReader(data: episodeInterface) {
      await this.$nextTick()
      const _data = this.data
      ;(this.$refs['card'] as any).handleReader(data.id, _data)
    },
    async getData(id: number | string) {
      this.isLoading = true
      const data = await getDetail(id)
      this.data = data
      this.SET_CURRENT_READER_DATA(data)
      this.isLoading = false
    }
  },
  async onLoad(ops: any) {
    // console.log('当前 `index`: ', this.current_index)
    let { id } = ops
    id = id ? id : 105924
    this.getData(id)
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