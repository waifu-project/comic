<template>
  <view>

    <topbar :blur="32" :isBack="true" :barImg="data.cover">
      <block slot="backText">{{ '返回' }}</block>
      <block slot="content">{{ topbarTitle }}</block>
      <!-- 暂时不支持下载操作 -->
      <block slot="right">
        <view v-if="!isLoading" @tap="handleBindLink">
          <!-- {{ '分享' }} -->
          <text class="cuIcon-link margin-right-sm" :style="{
            fontSize: `42rpx`
          }" />
        </view>
      </block>
    </topbar>

    <wrapper :isLoading="isLoading">

      <card-preview class="round bg-pink light shadow-lg" ref="card" :data="data" :isFavorite="true" />

      <!-- :class="{ show: showComicInfoBox }" -->

      <view class="radius bg-white shadow-lg margin-left-sm margin-right-sm margin-top-sm padding-xs" :style="comicBoxStyle">
        <!-- TODO: 这里是不是应该来一个 `v-for` 循环? -->
        <view v-if="data.desc">
          <text class="info-title"> 简介: </text>
          <view class="bg-grey padding-sm radius">
            <text class="desc-class">{{ data.desc }}</text>
          </view>
        </view>
        <view v-if="data.authors && data.authors.length">
          <!-- TODO: 作者现在只取 `0`.. -->
          <text class="info-title"> 作者: </text>
          {{ data.authors[0] }}
        </view>
        <view v-if="data.page_count">
          <text class="info-title"> 页数: </text>
          {{ data.page_count }}
        </view>
        <view v-if="data.like_count">
          <text class="info-title"> 点赞数: </text>
          {{ data.like_count }}
        </view>
        <view v-if="data.sub_text">
          <text class="info-title"> 类型: </text>
          {{ data.sub_text }}
        </view>
        <view v-if="data.review">
          <text class="info-title"> 浏览量: </text>
          {{ data.review }}
        </view>
        <view v-if="data.comment_count">
          <text class="info-title"> 评论数: </text>
          {{ data.comment_count }}
        </view>
      </view>

      <!-- 操作栏 -->
      <view class="flex p-xs margin-bottom-sm padding-top-sm padding-bottom-sm">
        <view class="flex flex-twice flex-direction padding-left-sm padding-right-sm">
          <button @tap="showComicInfoBox = !showComicInfoBox" class="cu-btn round bg-pink lg light dark-remove">
            查看信息
            <text :style="comicIconStyle" style="transition: all .3s" class='lg text-pink cuIcon-unfold margin-left-xs' />
          </button>
        </view>
        <view class="flex flex-treble radius flex-direction padding-left-sm padding-right-sm">
          <button class="cu-btn round bg-pink lg dark-remove" @click="handleActionReader(data.id, data)">开始阅读</button>
        </view>
        <!-- <view class="flex-twice"></view> -->
      </view>


      <!-- 选集 -->
      <view class="grid margin-bottom-xs margin-top text-center bg-gray" :class="[ !isDark ? 'solids-top' : '', `col-${ epCol }`]">
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
import { episodeInterface, shareComicFace } from '@/interface'
import { getMirror } from '@/utils/mirror'
import cssType from 'csstype'

export default Vue.extend({
  components: {
    Card,
    CardPreview,
  },
  data(): detailDataInterface {
    return {
      id: '',
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
      isLoading: false,
      showComicInfoBox: false
    }
  },
  computed: {
    ...mapState('settings', [
      'isDark',
      'detailKanBanInfoShow'
    ]),
    ...mapState('reader', [
      'current_id'
    ]),
    ...mapGetters('reader', [
      'current_index'
    ]),
    /**
     * 选集的`宽度`占比
     */
    epCol(): number {
      // TODO
      const list = this.data.episode as episodeInterface[]
      const arr: number[] = list.map(item=> item.ep_title.length)
      // 参考: https://www.jstips.co/en/javascript/calculate-the-max-min-value-from-an-array
      const maxWord = Math.max.apply(null, arr)
      if (maxWord >= 24) return 1
      if (maxWord >= 12) return 2
      if (maxWord >= 8) return 3
      return 4
    },
    topbarTitle(): string {
      const { title } = this.data
      // 标题的最大长度
      const maxTextLength = 6
      if (title.length <= maxTextLength) return title
      return ""
    },
    comicBoxStyle(): cssType.Properties {
      // .showComicBox {
      //   pointer-events: none;
      //   /* opacity: 0; */
      //   transform: translateY(-240rpx);
      //   transition: all .3s;
      // }
      // .showComicBox.show {
      //   transform: translateY(0);
      //   pointer-events: unset;
      // }
      const flag = this.showComicInfoBox
      return {
        pointerEvents: !flag ? 'none' : 'unset',
        opacity: +flag,
        transform: `translateY(${ flag ? 0 : 240 }rpx)`,
        transition: `all .3s`,
        display: flag ? `block` : `none`,
        height: flag ? 'auto' : `0!important`
      }
    },
    comicIconStyle(): cssType.Properties {
      const flag = this.showComicInfoBox
      return {
        transform: `rotate(${ flag ? 180 : 0 }deg)`
      }
    }
  },
  methods: {
    ...mapMutations('reader', [
      'SET_CURRENT_READER_DATA_ID',
      'SET_CURRENT_READER_DATA'
    ]),
    async handleClickReader(data: episodeInterface) {
      try {
        await this.$nextTick()
        const _data = this.data
        ;(this.$refs['card'] as any).handleReader(data.id, _data) 
      } catch (error) {
        throw new Error(error)
      }
    },
    async getData(id: number | string) {
      try {
        this.isLoading = true
        const data = await getDetail(id)
        this.data = data
        this.SET_CURRENT_READER_DATA(data)
        this.SET_CURRENT_READER_DATA_ID(id && null)
        this.isLoading = false 
      } catch (error) {
        throw new Error(error)
      }
    },
    async handleBindLink() {
      try {
        if (this.isLoading) return
        const api = getMirror()
        const id = this.id || ""
        let href = `${ api }/album/${ id }`
        plus.runtime.openURL(href)
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 触发卡片下的 `action` (阅读)
     * TODO: 该方法还需要实现跳转到已读章节..
     */
    async handleActionReader(id: string | number, data: shareComicFace) {
      let runtimeID = id
      const x = this.current_id
      if (x) runtimeID = x
      try {
        await this.$nextTick()
        ;(this.$refs['card'] as any).handleReader(runtimeID, data)
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  onShow() {
    this.showComicInfoBox = this.detailKanBanInfoShow
  },
  async onLoad(ops: any) {
    // console.log('当前 `index`: ', this.current_index)
    let { id } = ops
    id = id ? id : 105924
    this.id = id
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
.info-title {
  display: inline-block;
  width: 120rpx;
  text-align: right;
  margin-right: 8rpx;
  color: var(--pink)
}
.desc-class {
  display: inline-block;
}
</style>