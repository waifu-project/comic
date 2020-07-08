<template>
  <view>
    <topbar :isBack="true" :fixEvent="true">
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
      <wrapper :isLoading="isLoading" ref="wrapper" @scroll="handleScroll" :isScrollbar="true">
        <block v-for="(item, index) in _lists" :key="index">
          <card-preview @clickBox="handleClickCardItem(item)" :data="item" tagPosition="inside" />
        </block>
        <block v-if="!isLoading">
          <view v-if="isNext">
            <!-- TODO -->
          </view>
          <view v-else>
            <view v-if="_lists.length" class="cu-load over radius text-center light bg-grey" />
            <view class="flex flex-wrap justify-center" :style="{
              marginTop: '30%'
            }" v-else>
              <view class="basis-xl margin-xs padding-sm radius">
                <empty :boxStyle="emptyStyle">
                  <text class="text-xxl text-pink margin-left-sm">
                    {{ search_empty_text }}
                  </text>
                </empty>
              </view>
            </view>
          </view>
        </block>
      </wrapper>
    </glass>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import cssType from 'csstype'
import { mapState } from 'vuex'
import { getSearch } from '@/api/v1'
import { searchPageInterface } from '@/interface/pages'
import { shareComicFace } from '@/interface'
import { _coverSearchItem } from '@/utils/map'
import cardPreview from '@/components/card-preview.vue'
import empty from '@/components/empty.vue'
import { searchOptionTimeEnum, searchOptionTypeEnum } from '@/interface/enum'
import { router } from '@/utils'
import { search_empty_text } from '@/const'
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
      touchStartTime: 0,
      back2topFlag: false,
      search_empty_text
    }
  },
  components: {
    cardPreview,
    empty
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
      const isLoading = this.isLoading
      if (isLoading) return `加载中。`
      const c = this.current_page
      const t = this.total_page
      return `${ c }/${ t }`
    },
    isDoubleClick(): boolean {
      return (new Date().getTime() - this.touchStartTime) <= 300
    },
    emptyStyle(): cssType.Properties {
      return {
        backgroundColor: `rgba(255, 255, 255, .2)`,
        WebkitBackdropFilter: `blur(42px)`,
        backdropFilter: `blur(42px)`,
        borderRadius: `24px`
      }
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
    async handleScroll(data: any) {
      const { position } = data
      if (position == 'top') {
        // TODO `top` 刷新
        const flag = !this.back2topFlag
        if (flag) return
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
          this.back2topFlag = false
          res(false)
        } else {
          if (this.isDoubleClick) {
            res(true)
          }
          this.back2topFlag = true
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
      router.push(`detail/index`, {
        id
      })
    }
  }
})
</script>

<style>

</style>