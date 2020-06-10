<template>
  <view>
    <topbar :isBack="true" :fixEvent="false">
      <block slot="content">
        <view>
          {{ '开发者相关' }}
        </view>
      </block>
    </topbar>
    <glass :blur="14">
      <wrapper ref="wrapper">
        <view class="cu-card dynamic">
          <view class="cu-item shadow x" @click="handleClick(item)" v-for="(item, index) in data.pages" :key="index">
            <view class="cu-bar bg-white x">
              <view class="action sub-title">
                <text class="text-xl text-bold text-pink">{{ item.path }}</text>
                <text class="bg-blue"></text>
              </view>
            </view>
            <view class="text-content margin-top-sm">
              {{ item.description }}
            </view>
          </view>
        </view>
      </wrapper>
    </glass>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { devInsData } from '@/const'
import { devInsDataPageItemInterface } from '@/interface/tool'
import { router } from '@/utils'
export default Vue.extend({
  data() {
    return {
      data: devInsData
    }
  },
  methods: {
    handleClick(item: devInsDataPageItemInterface) {
      const { path } = item
      router.push(path, {}, true)
    }
  }
})
</script>

<style scope>
.x {
  background-color: rgba(255, 255, 255, .4) !important;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
</style>