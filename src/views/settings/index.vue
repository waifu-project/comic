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

      <view class="cu-list menu bg-white dark-remove">

        <view class="cu-item bg-white dark-remove">
          <view class="content text-black dark-remove">
            夜间模式
          </view>
          <view class="action bg-white dark-remove">
            <switch class="bg-white dark-remove" @change="handleChangeUI" :checked="isDark" color="var(--pink)"/>
          </view>
        </view>

        <view class="cu-form-group bg-white dark-remove">
          <view class="title text-black dark-remove">卡片布局</view>
          <picker class="dark-remove bg-white" :value="cardCol" @change="handleChangeIndexCol" :range="Cols">
            <view class="picker text-gray dark-remove">
              {{ cardCol | cardColFormat }}
            </view>
          </picker>
        </view>

        <view class="cu-form-group bg-white dark-remove">
          <view class="title text-black dark-remove">{{ '看板自动打开' }}</view>
          <view class="action bg-white dark-remove">
            <switch class="bg-white dark-remove" @change="handleChangeKanBanFlag" :checked="detailKanBanInfoShow" color="var(--pink)"/>
          </view>
        </view>

      </view>

      <view class="cu-bar solid-bottom bar_box padding-bottom-xs margin-top-sm">
        <view class="action text-black dark-remove">
          <text class="cuIcon-title text-orange" />
          {{ '其他设置' }}
        </view>
      </view>

      <view class="cu-list menu">

        <view class="cu-item dark-remove" @tap="handleOpenMirror">
          <view class="content text-black dark-remove">
            {{ '切换镜像站' }}
          </view>
        </view>

        <!-- TODO -->
        <!-- <view class="cu-item dark-remove" @tap="handleOpenMirror">
          <view class="content text-black dark-remove">
            {{ '检测接口可用' }}
          </view>
        </view> -->

        <view class="cu-item dark-remove" :class="{ 'text-gray': checkUpdateIsLoading }" @tap="handleCheckAppUpdate">
          <view class="content text-black dark-remove">
            {{ '检查更新(需要翻墙)' }}
          </view>
          <view class="action text-gray dark-remove" v-if="checkUpdateIsLoading">
            {{ '正在检测版本' }}
          </view>
        </view>

        <view class="cu-item dark-remove" @tap="handleOpenSource">
          <view class="content text-black dark-remove">
            {{ '开源地址' }}
          </view>
        </view>

        <view class="cu-item dark-remove" @tap="handleJoinQQGroup">
          <view class="content text-black dark-remove">
            {{ '加入QQ交流群' }}
          </view>
        </view>

        <!-- TODO -->
        <view class="cu-item dark-remove" v-if="false">
          <view class="content text-black dark-remove">
            {{ '推荐VPN' }}
          </view>
          <view class="action text-gray dark-remove">
            {{ version }}
          </view>
        </view>

        <view class="cu-item dark-remove" @click="handleClickOpenDev">
          <view class="content text-black dark-remove">
            {{ '版本号' }}
          </view>
          <view class="action text-gray dark-remove">
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

          <view class="cu-item arrow dark-remove" @click="handleClickDevList">
            <view class="content text-black dark-remove">
              路由菜单列表
            </view>
          </view>

          <view class="cu-item dark-remove" @click="handleCleanStorage">
            <view class="content text-pink dark-remove">
              清除所有设置和记录 <span class="cuIcon-footprint margin-left-xs" />
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
import { settings_click_max_count, updateIsLastVersion, updateVersionNetWorkError, joinQQGroup, openSourceRepo } from '@/const'
import { router } from '@/utils'
import { version } from '@/config'
import { cardColEnum } from '@/store/types'
import { getAppUpdate, githubReleaseResultCat, githubReleaseStatus } from '@/api/v1/app'
import { updateWebviewID } from '@/const/key'

export default Vue.extend({
  data(): settingsDataInterface {
    return {
      count: 0,
      checkUpdateIsLoading: false
    }
  },
  computed: {
    ...mapState('settings', [
      'showDev',
      'isDark',
      'cardCol',
      'detailKanBanInfoShow'
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
      'CHANGE_CARD_COL',
      'CHANGE_DETAIL_KANBAN_FLAG'
    ]),
    /**
     * 检查版本更新
     */
    async handleCheckAppUpdate() {
      if (this.checkUpdateIsLoading) return
      this.checkUpdateIsLoading = true
      const data: githubReleaseResultCat = await getAppUpdate()
      const { code, body } = data
      switch (code) {
        case githubReleaseStatus.last:
          plus.nativeUI.alert(updateIsLastVersion)
          break;
        case githubReleaseStatus.old:
          const webview = plus.webview.create("", updateWebviewID)
          webview.show()
          setTimeout(()=> {
            webview.loadData(body)
          })
          break;
        case githubReleaseStatus.unknown:
          plus.nativeUI.alert(updateVersionNetWorkError)
          break;
      }
      this.checkUpdateIsLoading = false
    },
    /**
     * 打开开发者模式
     */
    handleClickOpenDev() {
      this.count ++
      const count = this.count
      if (count == settings_click_max_count) {
        this.REVERRSE_DEV_FLAG()
        this.count = 0
      }
    },
    /**
     * 切换到开发者模式列表
     */
    handleClickDevList() {
      router.push('dev/index')
    },
    /**
     * 改变主题
     */
    handleChangeUI(e:any) {
      const value = e.detail.value
      this.CHANGE_UI_THEME(value)
    },
    /**
     * 设置详情页看板
     */
    handleChangeKanBanFlag(e: any) {
      const { value } = e.detail
      this.CHANGE_DETAIL_KANBAN_FLAG(value)
    },
    /**
     * 设置 `card` 的布局
     */
    handleChangeIndexCol(event: any) {
      const { value } = event.detail
      const _class = Object.keys(cardColEnum)[value]
      this.CHANGE_CARD_COL(_class)
    },
    /**
     * 清除所有设置和记录
     */
    async handleCleanStorage() {
      const title = "这将会清除所有设置和记录, 请确认"
      const content = "想好了就确认呗,哼.*."
      const confirmText = "我确定"
      const cancelText = "容我再想想"
      const flag = await new Promise(res=> {
        uni.showModal({
        title,
        content,
        confirmText,
        cancelText,
          success({ confirm, cancel }) {
            res(confirm)
          },
          fail() {
            res(false)
          }
        })
      })
      if (flag) {
        try {
          uni.clearStorageSync()
          plus.runtime.restart();
        } catch (error) {
          throw new Error(error)
        }
      }
    },
    /*
    * 加入QQ群
    */
    handleJoinQQGroup() {
      try {
        plus.runtime.openURL(joinQQGroup)
      } catch (error) {
        throw new Error(error) 
      }
    },
    /**
     * 切换镜像站
     */
    handleOpenMirror() {
      router.push("views/switch/flow", {}, true)
    },
    /**
     * 开源地址
     */
    handleOpenSource() {
      try {
        plus.runtime.openURL(openSourceRepo)
      } catch (error) {
        throw new Error(error) 
      }
    }
  }
})
</script>

<style scoped>
.bar_box {
  min-height: 42rpx;
}
</style>