<template>
  <view>
    <topbar :isBack="true" :fixEvent="true">
      <block slot="content">
        <view @tap="handleClickBarText">
          {{ '话题' }}
        </view>
      </block>
      <block slot="right">
        <view>
          {{ '' }}
          </view>
      </block>
    </topbar>
    <glass :blur="14">
      <wrapper ref="wrapper" @scroll="handleScroll" :isScrollbar="true">
        <view class="cu-card dynamic">
          <view class="cu-item shadow x" v-for="(item, index) in messages" :key="index">
            <view class="cu-list menu-avatar">
              <view class="cu-item y">
                <view class="cu-avatar round lg" :style="{
                  backgroundImage: `url(${ item.avatar })`
                }" />
                <view class="content flex-sub">
                  <view>{{ item.nickname }}</view>
                  <view class="text-gray text-sm flex justify-between">
                    {{ item.date }}
                  </view>
                </view>
              </view>
            </view>
            <view class="text-content margin-top-sm">
              {{ item.content }}
            </view>
            <view
              v-if="item.title"
              @tap="handleClickCardItem(item)"
              class="margin-top-sm flex justify-between padding-left padding-right margin-bottom-lg"
            >
              <view class="text-pink text-cut">
                {{ item.title }}
              </view>
            </view>
            <view class="diy text-lg">
              <text class="cuIcon-appreciatefill text-red margin-right-xs" />
              {{ item.like_count }}
            </view>
          </view>
        </view>
      </wrapper>
    </glass>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { getForumMore } from '@/api/v1'
import { topicResponseInterface } from '@/interface'
import { topicDataInterface } from '@/interface/pages'
import { router } from '@/utils'
export default Vue.extend({
  data(): topicDataInterface {
    return {
      messages: [],
      page: 1
    }
  },
  computed: {
    
  },
  methods: {
    handleScroll(data: any) {
      const { position } = data
      if (position === 'bottom') {
        this.page += 1
        this.getData(true)
      }
    },
    async getData(isAppend: boolean = false) {
      const page = this.page
      const data = await getForumMore(page)
      const old = this.messages
      let result = data
      if (isAppend) result = [ ...old, ...data ]
      this.messages = result
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
    }
  },
  onLoad() {
    this.getData()
  }
})
</script>

<style scoped>
.y {
  background-color: rgba(255,255,255, .6) !important;
}
.x {
  position: relative;
  background-color: rgba(255,255,255, .6) !important;
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
}
.diy {
  position: absolute;
  top: 40rpx;
  right: 36rpx;
}
</style>