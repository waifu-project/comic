<template>
  <view>
    <topbar :isBack="true">
      <block slot="content">
        <view @tap="handleClickBarText">
          {{ barTitle }}
        </view>
      </block>
      <block slot="right">
        <view>
          {{ barRightText }}
          </view>
      </block>
    </topbar>
    <glass :blur="14">
      <wrapper ref="wrapper" @scroll="handleScrollBottom" :isScrollbar="true">
        <block v-for="(item, index) in _lists" :key="index">
          <card-preview @clickBox="handleClickCardItem(item)" :data="item" :showActionBar="false" tagPosition="inside" />
        </block>
        <block v-if="!isLoading">
          <view v-if="isNext">
            <!-- TODO -->
          </view>
          <view v-else class="cu-load over radius text-center light bg-grey" />
        </block>
      </wrapper>
    </glass>
  </view>
</template>

<script lang="ts" src="./index.ts" />

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { getSearch } from '@/api/v1'
import { searchPageInterface } from '@/interface/pages'
import { shareComicFace } from '@/interface'
import { _coverSearchItem } from '@/utils/map'
import cardPreview from '@/components/card-preview.vue'
import { searchOptionTimeEnum, searchOptionTypeEnum } from '@/interface/enum'
import { router } from '@/utils'
export default Vue.extend({
  data(): searchPageInterface {
    return {
      lists: [],
      isNext: false,
      isLoading: true,
      current_page: 1,
      total_page: 1,
      query: {
        page: 1,
        t: searchOptionTimeEnum.all,
        o: searchOptionTypeEnum.new
      },
      touchStartTime: 0
    }
  },
  components: {
    cardPreview
  },
  computed: {
    ...mapState('comic', {
      barTitle: (state: any): string=> {
        return state.searchData.barTitle
      },
      api: (state: any): string=> {
        return state.searchData.url
      }
    }),
    _lists(): shareComicFace[] {
      return _coverSearchItem(this.lists)
    },
    barRightText(): string {
      const c = this.current_page
      const t = this.total_page
      return `${ c }/${ t }`
    }
  },
  async onLoad() {
    await this.getData()
  },
  methods: {
    /**
     * 获取数据
     * @param {Boolean} [isAppend] - 是否添加到列表
     */
    async getData(isAppend: boolean = false) {
      this.isLoading = true
      const api = this.api
      const qs = this.query
      const res = await getSearch(api, qs)
      this.isLoading = false
      let { lists, isNext, current_page, total_page } = res
      this.current_page = current_page
      this.total_page = total_page
      const oldLists = this.lists
      if (isAppend) lists = [ ...oldLists, ...lists ]
      this.lists = lists
      this.isNext = isNext
    },
    /**
     * 重置查询字段
     */
    resetQuery() {
      // TODO 重置
      this.query = {
        page: 1,
        t: searchOptionTimeEnum.all,
        o: searchOptionTypeEnum.new
      }
    },
    async handleScrollBottom(data: any) {
      const { position } = data
      if (position == 'top') {
        // TODO
        return
      }
      const isNext = this.isNext
      // flag: 如果在加载就不允许
      const isLoading = this.isLoading
      if (!isNext || isLoading) return
      this.query.page++
      await this.getData(true)
    },
    /**
     * `bar` 中间文字的双击事件
     */
    async handleClickBarText() {
      // flag: 判断是否是双击
      const flag = await new Promise(res=> {
        if (this.touchStartTime == 0) {
          this.touchStartTime = new Date().getTime()
          res(false)
        } else {
          if (new Date().getTime() - this.touchStartTime <= 300) {
            res(true)
          }
          this.touchStartTime = 0
        }
      })
      if (!flag) return
      await this.$nextTick()
      const _box = (this.$refs['wrapper'] as any)
      _box.goTop()
    },
    /**
     * 每个 `card-item` 的点击事件
     */
    handleClickCardItem(data: any) {
      const { id } = data
      router.push(`reader/index`, {
        id
      })
    }
  }
})
</script>

<style>

</style>