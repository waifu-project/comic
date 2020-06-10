<template>
  <view>
    <topbar :isBlur="false" :barImg="''">
      <block slot="content"> {{ '设置' }} </block>
    </topbar>
    <wrapper>

      <view class="cu-bar solid-bottom bar_box padding-bottom-xs margin-top-lg">
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
            <switch @change="handleChangeUI" :checked="isDark" color="var(--pink)"/>
          </view>
        </view>
      </view>

      <view class="cu-bar solid-bottom bar_box padding-bottom-xs margin-top-sm">
        <view class="action">
          <text class="cuIcon-title text-orange" />
          {{ '其他设置' }}
        </view>
      </view>

      <view class="cu-list menu" @click="handleClickOpenDev">
        <view class="cu-item">
          <view class="content">
            版本号
          </view>
          <view class="action">
            0.0.1
          </view>
        </view>
      </view>

      <block v-if="showDev">

        <view class="cu-bar solid-bottom bar_box padding-bottom-xs margin-top-sm">
          <view class="action">
            <text class="cuIcon-title text-orange" />
            {{ '开发者相关' }}
          </view>
        </view>

        <view class="cu-list menu">
          <view class="cu-item arrow" @click="handleClickDevList">
            <view class="content">
              路由菜单列表
            </view>
          </view>
        </view>

      </block>

    </wrapper>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import * as config from '@/config'
import { mapState, mapMutations } from 'vuex'
import { settingsDataInterface } from '@/interface/pages'
import { settings_click_max_count } from '@/const'
import { router } from '@/utils'
export default Vue.extend({
  data(): settingsDataInterface {
    return {
      count: 0
    }
  },
  computed: {
    ...mapState('settings', [
      'showDev',
      'isDark'
    ])
  },
  methods: {
    ...mapMutations('settings', [
      'REVERRSE_DEV_FLAG',
      'CHANGE_UI_THEME'
    ]),
    handleClickOpenDev() {
      this.count ++
      const count = this.count
      if (count == settings_click_max_count) {
        this.REVERRSE_DEV_FLAG()
        this.count = 0
      }
    },
    handleClickDevList() {
      router.push('dev/index')
    },
    handleChangeUI(e:any) {
      const value = e.detail.value
      this.CHANGE_UI_THEME(value)
    }
  }
})
</script>

<style scoped>
.bar_box {
  min-height: 42rpx;
}
</style>