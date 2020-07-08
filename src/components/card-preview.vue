<template>
  <view @tap="handleClickBox">

    <!-- 信息 -->
    <view class="flex solid-bottom padding-sm justify-between bg-white">
      <view class="flex justify-start">
        <view class="bg-img bg-cover-box bg-mask radius shadow-blur"
          @tap.stop="handlePreview(data.cover)"
          :style="{ backgroundImage: `url(${ data.cover })` }"
        />
        <view class="padding-left-sm padding-right-sm text-left">
          <view class="text-df text-black margin-bottom" :style="{
            maxWidth: `42vw`
          }">{{ data.title }}</view>
          <!-- <view class="text-pink">{{ data.authors && data.authors[0] }}</view> -->
          <!-- <view class="padding-xs bg-white">
            <text class="text-cut" style="width: 420rpx">{{ data.desc }}</text>
          </view> -->
          <!-- 标签 -->
          <view class="flex flex-wrap bg-white" v-if="isBarInside">
            <view class="padding-right-xs padding-bottom-xs" v-for="(item, index) in data.tags" :key="index">
              <view class="cu-tag line-pink round">{{ item }}</view>
            </view>
          </view>
        </view>
      </view>
      <view class="flex align-center justify-center" v-if="isFavorite" @tap="handleClickFavorite(data)">
        <text style="font-size: 60rpx" class="padding-sm" :class="FavClass" />
      </view>
    </view>

    <!-- 标签 -->
    <view class="padding-xs flex flex-wrap bg-white" v-if="isBarBottom">
      <view class="padding-xs" v-for="(item, index) in data.tags" :key="index">
        <view @tap="handleSearchTag(item)" class="cu-tag line-pink round">{{ item }}</view>
      </view>
    </view>

  </view>
</template>

<script lang="ts">

/**
 * `card-preview` 预览
 * @desc 主要是 `card`
 * @author d1y<chenhonzhou@gmail.com>
 * @param {Array} [data] - 数据数组
 * @param {Boolean} [showActionBar] - 显示操作 [开始阅读 | 预览] <2020-07-08>已废弃
 * @param {Stirng} [tagPosition] - 标签位置 **可选值[ bottom | inside ]**
 * @param {Boolean} [isFavorite] - 是否显示收藏图标
 * @event clickBox()=> void - 无返回值, 触发了中间内容区的事件
 * @example 调用示例
 *  <card-preview :data="" :tagPosition="bottom" />
 */
import Vue from "vue";
import { router } from '@/utils';
import { shareComicFace } from '@/interface';
import { mapMutations, mapGetters } from 'vuex'
import { createSearchUrl } from '@/utils/qs';
export default Vue.extend({
  name: 'card-preview',
  props: {
    /**
     * 数据
     */
    data: {
      required: true,
      type: Object
    },
    /**
     * 显示操作 [开始阅读 | 预览] <2020-07-08 | 已废弃>
     */
    // showActionBar: {
    //   default: true,
    //   type: Boolean
    // },
    /**
     * 标签位置
     * 可选值[ bottom | inside ]
     */
    tagPosition: {
      default: 'bottom',
      type: String
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * 收藏 class
       */
      favoriteClass: ''
    }
  },
  computed: {
    ...mapGetters('comic', [
      'checkFavorite'
    ]),
    isBarBottom(): boolean {
      return this.tagPosition == 'bottom'
    },
    isBarInside(): boolean {
      return this.tagPosition == 'inside'
    },
    /**
     * 图标
     */
    FavClass(): string {
      const test = this.checkFavorite
      const _t = test ? 'favorfill' : 'favor'
      return `cuIcon-${ _t }`
    }
  },
  methods: {
    ...mapMutations('comic', [
      'CHECK_ID',
      'CHANGE_HISTORY_VIEWS',
      'CHANGE_COLLECT_LISTS',
      'CHANGE_SEARCH_URL',
      'CHANGE_SEARCH_BAR_TITLE'
    ]),
    ...mapMutations('reader', [
      'SET_CURRENT_READER_DATA',
      'SET_CURRENT_READER_DATA_ID'
    ]),
    /**
     * TODO: `预览图片` 会直接闪退
     */
    handlePreview(...imgs: any[]) {
      return
      try {
        if (!imgs) return
        uni.previewImage({
          urls: imgs,
          current: ""
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 触发收藏
     */
    handleClickFavorite(data: shareComicFace) {
      this.CHANGE_COLLECT_LISTS(data)
    },
    /**
     * 阅读相关
     */
    handleReader(id: string | number, data: shareComicFace) {
      this.SET_CURRENT_READER_DATA(data)
      this.SET_CURRENT_READER_DATA_ID(id)
      this.CHANGE_HISTORY_VIEWS(data)
      router.push(`reader/index`, {
        id
      })
    },
    /**
     * 触发点击整个盒子
     */
    handleClickBox() {
      this.$emit('clickBox')
    },
    /**
     * 触发 `tag` 搜索
     */
    handleSearchTag(searchText: string = "人妻") {
      const url = createSearchUrl(searchText)
      this.CHANGE_SEARCH_URL(url)
      this.CHANGE_SEARCH_BAR_TITLE(searchText)
      router.push(`search/index`)
    }
  }
});
</script>

<style scoped>
.bg-cover-box {
  width: 200rpx;
  max-width: 50vw;
  height: 240upx;
  padding: 12rpx;
}
</style>