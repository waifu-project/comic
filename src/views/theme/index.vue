<template>
  <view>
    <topbar ref="topbar" bgColor="bg-white" :diy="true">
      <view class="flex flex-wrap-box margin-bottom-lg">
				<input name="input" class="input_box text-black margin-left-sm margin-right-sm radius padding-left-lg margin-top-sm" :placeholder="placeholder" />
			</view>
    </topbar>
    <glass :opacity=".4" :blur="24">
      <wrapper>

        <view class="cu-bar solid-bottom">
          <view class="action">
            <text class="cuIcon-title text-pink" />
            {{ '最热主题' }}
          </view>
        </view>
        <view class="padding-sm flex flex-wrap">
          <view class="padding-xs" v-for="(item, index) in popularThemes" :key="index">
            <view class="cu-tag" :class="[ item.bg ]">
              {{ item.text }}
            </view>
          </view>
        </view>

        <block v-for="(item, index) in data" :key="index">
          <view class="cu-bar radius solid-bottom">
            <view class="action">
              <text class="cuIcon-title text-pink" />
              {{ item.title }}
            </view>
          </view>
          <view class="grid col-3 padding-sm">
            <view class="padding-sm" v-for="(subItem, i) in item.lists" :key="i">
              <view :style="{
                minHeight: `120rpx`
              }" class="padding radius text-center shadow-blur flex align-center justify-center" :class="`bg-${ subItem.bg.name }`">
                {{ subItem.text }}
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
import { getTheme, getPopularThemes } from '@/api/v1'
export default Vue.extend({
  data() {
    return {
      placeholder: 'bilibili干杯🍻, 请搜索',
      data: [],
      popularThemes: []
    }
  },
  async onLoad() {
    await this.getData()
  },
  methods: {
    async getData() {
      const popularThemes: any = await getPopularThemes()
      const data: any = await getTheme()
      this.data = data
      this.popularThemes = popularThemes
    }
  }
})
</script>

<style scoped>
.flex-wrap-box {
  width: 100%;
  -webkit-backdrop-filter: saturate(180%) blur(5px);
  backdrop-filter: saturate(180%) blur(5px);
}
.input_box {
  width: 100%;
  height: 68rpx;
  background: var(--greyLight);
  display: flex;
  box-sizing: unset;
}
.input_box:-ms-input-placeholder {
    color: #a9a9a9;
}/* Internet Explorer 10+ */

.input_box::-webkit-input-placeholder {
    color: #a9a9a9;
}/* WebKit browsers */

.input_box::-moz-placeholder {
    color: #a9a9a9;
}/* Mozilla Firefox 4 to 18 */

.input_box:-moz-placeholder {
    color: #a9a9a9;
}/* Mozilla Firefox 19+ */
</style>