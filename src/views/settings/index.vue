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

        <view class="cu-form-group">
          <view class="title">卡片布局</view>
          <picker :value="cardCol" @change="handleChangeIndexCol" :range="Cols">
            <view class="picker">
              {{ cardCol | cardColFormat }}
            </view>
          </picker>
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
            {{ '版本号' }}
          </view>
          <view class="action">
            {{ version }}
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
import { version } from '@/config'
import { cardColEnum } from '@/store/types'
export default Vue.extend({
  data(): settingsDataInterface {
    return {
      count: 0
    }
  },
  computed: {
    ...mapState('settings', [
      'showDev',
      'isDark',
      'cardCol'
    ]),
    version() {
      return version
    },
    Cols() {
      let arr = Object.values(cardColEnum).filter((item: any)=> isNaN(item))
      return arr
    }
  },
  filters: {
    cardColFormat(str: string): string {
      if (str == cardColEnum.df) return "默认"
      const keys = Object.keys(cardColEnum)
      const arr = Object.values(cardColEnum).filter((item: any)=> isNaN(item))
      let result = ""
      keys.forEach((item, index)=> {
        if (str == item) result  = arr[index]
      })
      return result
    }
  },
  methods: {
    ...mapMutations('settings', [
      'REVERRSE_DEV_FLAG',
      'CHANGE_UI_THEME',
      'CHANGE_CARD_COL'
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
    },
    handleChangeIndexCol(event: any) {
      const { value } = event.detail
      const _class = Object.keys(cardColEnum)[value]
      this.CHANGE_CARD_COL(_class)
    }
  }
})
</script>

<style scoped>
.bar_box {
  min-height: 42rpx;
}
</style>