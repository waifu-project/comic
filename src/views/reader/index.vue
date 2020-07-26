<template>
  <view @touchstart="handleViewTap" @touchmove="handleViewTap" @touchend="handleViewTapEnd">
    <view class="effect shadow-blur" :style="effectStyle" />
    <topbar :blur="24" :barImg="barImg" :isBack="true" :backEvent="!leftActionFlag" @left="handleClickEPAction(false)">
      <block slot="backText">{{ leftTitle }}</block>
      <block slot="content">{{ title }}</block>
      <block slot="right" v-if="(isNext && !isLoading)">
        <view @tap="handleClickEPAction(true)">
          <!-- {{ isNext }} - {{ isLoading }} -->
          {{ '下一话' }}
          <text class="cuIcon-right"></text>
        </view>
      </block>
    </topbar>
    <view v-if="isLoading" class="flex align-center justify-center" :style="loadingStyle">
      <view class="message-box">
        <image class="imageClass" :src="loadingImae" mode="aspectFit" />
        <view class="text-center text-pink text-lg">
          <text>{{ '加载中...' }}</text>
        </view>
      </view>
    </view>
    <rich-text :nodes="_nodes" />
    <view v-if="!isLoading" :style="{ maxWidth: `100%`, overflow: 'hidden' }">
      <button @tap="handleChangePicPageAction" class="cu-btn block shadow-blur" :class="[ comicData.nextPage ? 'bg-pink lg' : 'bg-grey' ]">
        <text v-if="comicData.nextPage" class="span">{{ '加载下一页(不是下一话)' }}</text>
        <text v-else class="span">{{ '没有更多了' }}</text>
      </button>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { setFullScreen } from '@/utils/uni'
import { getComicPic } from '@/api/v1'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { shareComicFace } from '@/interface'
import cssType from 'csstype'
import { readerDataFace } from '@/interface/pages'
import { _loadingImage } from '@/config/assets'
import { readerPageNumberEnum } from '@/interface/enum'
let hpjs: any = require('@/plugins/html_parse') 

export default Vue.extend({
  data(): readerDataFace {
    return {
      comicData: {
        pics: [],
        pageType: readerPageNumberEnum.frist,
        currPage: null,
        nextPage: null,
        prevPage: null,
      },
      isLoading: false,
      scrollTop: 0,
      effectW: 70,
      effectH: 70,
      effectX: 0,
      effectY: 0,
      effectDisplay: false,
      currentComicID: ""
    }
  },
  computed: {
    ...mapState('reader', [
      'currentData',
      'current_id'
    ]),
    ...mapGetters('reader', [
      'current_index'
    ]),
    imgs: {
      get(): string[] {
        const images = this.comicData.pics
        return images
      },
      set(imgs: string[]) {
        this.comicData.pics = imgs
      }
    },
    loadingImae() {
      return _loadingImage
    },
    loadingStyle(): cssType.Properties {
      const ctx = uni.getSystemInfoSync()
      return {
        width: `${ ctx.windowWidth }px`,
        height: `${ ctx.windowHeight }px`,
        background: `#fff`,
      }
    },
    effectStyle(): cssType.Properties {
      return {
        position: 'fixed',
        top: `${ this.effectY }px`,
        left: `${ this.effectX }px`,
        pointerEvents: `none`,
        width: `${ this.effectW }px`,
        height: `${ this.effectH }px`,
        zIndex: 9999,
        border: `2px solid var(-pinkLight)`,
        background: `rgba(224, 57, 151, .8)`,
        borderRadius: `50%`,
        opacity: this.effectDisplay ? 1 : 0,
        userSelect: 'none',
        transition: 'opacity .3s'
      }
    },
    /**
     * 左边标题
     */
    leftTitle(): string {
      const flag = this.leftActionFlag
      return flag ? '上一话' : '返回'
    },
    title(): string {
      const data: shareComicFace = this.currentData
      const index = this.current_index
      if (data?.episode && data.episode.length) {
        const _ep = data.episode[index]
        return `${ _ep.ep } - ${ _ep.ep_title }`
      }
      return `第一话`
    },
    /**
     * 是否显示左边操作(上一话)
     */
    leftActionFlag(): boolean {
      const top = this.scrollTop
      const max_scroll_height: number = 200
      const indexFlag = !!(this.current_index)
      const scrollFlag = top >= max_scroll_height
      return scrollFlag && indexFlag
    },
    isNext(): boolean {
      const data: shareComicFace = this.currentData
      if (!data.episode || !data.episode.length) return false
      const now_index = this.current_index + 1
      const ep = data.episode
      const nextFlag: boolean = ep.length > now_index
      return nextFlag
    },
    _nodes() {
      try {
        let result = ''
        this.comicData.pics.forEach(item=> {
          result += `
            <img src="${ item }" style="width:100%; height: auto" />
            <br/>
          `
        })
        const u = hpjs(result)
        return u
      } catch (error) {
        throw new Error(error)
      }
    },
    barImg(): string {
      const img = this.imgs
      return img[0]
    }
  },
  watch: {
    current_id(newVal: string | number) {
      // 跳转拿到下一话后, 回到顶部
      this.toTop()
      this.resetComicData()
      this.getData(newVal)
    }
  },
  methods: {
    ...mapActions('reader', [
      'changeNextReader'
    ]),
    /**
     * 重置 `data`
     */
    resetComicData() {
      this.comicData = {
        pics: [],
        pageType: readerPageNumberEnum.frist,
        currPage: null,
        nextPage: null,
        prevPage: null,
      }
    },
    async getData(id: string | number, page: number | string = 1) {
      this.currentComicID = id.toString()
      this.isLoading = true
      // console.log('id: ', id);
      // console.log('page: ', page);
      const data = await getComicPic(id, page)
      let oldImgs = this.imgs
      this.comicData.pageType = data.pageType
      this.comicData.nextPage = data.nextPage
      this.comicData.prevPage = data.prevPage
      this.comicData.currPage = data.currPage
      let resultImgs = data.pics
      if (page > 1) resultImgs = [ ...oldImgs, ...resultImgs ]
      // console.log('resultImgs: ', resultImgs);
      this.imgs = resultImgs
      this.isLoading = false
    },
    async handleClickEPAction(flag: boolean) {
      this.changeNextReader(flag)
    },
    toTop() {
      uni.pageScrollTo({
        scrollTop: 0, //距离页面顶部的距离
        duration: 300
      })
    },
    handleViewTap(e: any) {
      try {
        const _data = e.touches[0]
        const { clientX, clientY } = _data
        this.effectX = clientX - (this.effectW * .5)
        this.effectY = clientY - (this.effectH * .5)
        this.effectDisplay = true
      } catch (error) {
        throw new Error(error)
      }
    },
    handleViewTapEnd(e: any) {
      this.effectDisplay = false
    },
    handleChangePicPageAction() {
      const { nextPage } = this.comicData
      const { currentComicID: id } = this
      if (nextPage) this.getData(id, nextPage)
    }
  },
  onPageScroll(res) {
    const top = res.scrollTop    
    this.scrollTop = top
  },
  async onLoad(ops: any) {
    let { id } = ops
    id = id ? id : 195491
    this.currentComicID = id
    await this.getData(id)
  }
})
</script>

<style scoped>
.img_box {
  background: #333;
}
.imageClass {
  width: 320rpx;
  height: 320rpx;
  border-bottom-left-radius: 42rpx;
  border-bottom-right-radius: 42rpx;
}
.message-box {
  height: 820rpx;
}
</style>