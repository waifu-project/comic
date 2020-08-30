<template>
  <view>
    <topbar :isBack="true" :fixEvent="true">
      <block slot="content">
        <view @tap="handleClickBarText">
          {{ '涨姿势' }}
        </view>
      </block>
      <block slot="right">
        <view>
          {{ '' }}
          </view>
      </block>
    </topbar>
    <glass :blur="14">
      <wrapper ref="wrapper" @scroll="handleScroll" :isScrollbar="true" :isLoading="loadingState">

        <view class="cu-card case" @tap="handleTapItem(item.id)" v-for="(item, index) in lists" :key="index">
          <view class="cu-item shadow">
            <view class="image">
              <image :src="item.bg" mode="widthFix"></image>
              <!-- TODO -->
              <!-- <view class="cu-tag bg-blue">史诗</view> -->
              <view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{ item.title }}</text></view>
            </view>
            <view class="padding-sm">
              {{ item.time }}
            </view>
          </view>
        </view>

      </wrapper>
    </glass>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { getBlog } from '@/api/v1'
import { blogDataInterface } from '@/interface/pages'
import { router } from '@/utils'
import { createMirrorStaticFile } from '@/utils/mirror'
export default Vue.extend({
  data(): blogDataInterface {
    return {
      lists: [],
      page: 1,
      isNext: false,
      isLoading: false,
    }
  },
  computed: {
    loadingState(): boolean {
      const lists = this.lists
      return lists.length == 0 && this.isLoading == true
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    handleScroll(data: any) {
      const { position } = data
      if (position === 'bottom' && this.isNext && !this.isLoading) {
        this.page += 1
        this.getData(true)
      }
    },
    async getData(isAppend: boolean = false) {
      this.isLoading = true
      const page = this.page
      const data = await getBlog(page)
      const { isNext, lists } = data
      this.isNext = isNext
      this.isLoading = false
      const old = this.lists
      let result = lists
      if (isAppend) result = [ ...old, ...result ]
      this.lists = result
    },
    handleClickCardItem(data: any) {
      const { id } = data
      router.push(`detail/index`, {
        id
      })
    },
    async handleClickBarText() {
      try {
        await this.$nextTick()
        ;(this.$refs['wrapper'] as any).goTop()
      } catch (error) {
        throw new Error(error)
      }
    },
    handleTapItem(api: string) {
      try {
        const url = createMirrorStaticFile(api)
        console.log('url: ', url);
        plus.runtime.openWeb(url)
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})
</script>

<style>

</style>