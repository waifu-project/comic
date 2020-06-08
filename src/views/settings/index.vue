<template>
  <view>
    <topbar :isBlur="false" :barImg="''">
      <block slot="content"> {{ '设置' }} </block>
    </topbar>
    <wrapper>

      <view class="cu-bar solid-bottom bar_box padding-bottom-xs">
        <view class="action">
          <text class="cuIcon-title text-orange" />
          {{ '阅读设置' }}
        </view>
      </view>
      <view class="cu-list menu">
        <view class="cu-item">
          <view class="content">
            夜间模式
          </view>
          <view class="action">
            <switch checked color="var(--pink)"/>
          </view>
        </view>
      </view>

      <view class="cu-bar solid-bottom bar_box padding-bottom-xs margin-top-sm">
        <view class="action">
          <text class="cuIcon-title text-orange" />
          {{ '其他设置' }}
        </view>
      </view>
      <view class="cu-list menu">
        <view class="cu-item">
          <view class="content">
            版本号
          </view>
          <view class="action">
            0.0.1
          </view>
        </view>
      </view>

    </wrapper>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import * as config from '@/config'
export default Vue.extend({
  created() {
    console.log('config: ', config);
  }
})
</script>

<style scoped>
.bar_box {
  min-height: 42rpx;
}
</style>