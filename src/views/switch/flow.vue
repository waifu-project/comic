<template>
  <view>

    <glass :blur="flowBgBlur" :dark="flowBgDark">

      <view class="next top" :class="{ show: (current_mirror_index != null) }" :style="{ height: `124rpx`, top: `${ CustomBar * .5 }px` }">
        <button class="cu-btn round bg-pink btn-x right light text-pink" @tap="handleClickLink('home')">
          <i class="text-gray cuIcon-home text-df-wp" />
          {{ '首页' }}
        </button>
        <button class="cu-btn round bg-pink btn-x light" @tap="handleClickLink('back')">
          <i class="text-gray cuIcon-back text-df-wp" />
          {{ '回到上一页' }}
        </button>
      </view>

      <view class="cu-modal show bg-unset" v-if="setup == 1">
        <view class="cu-dialog bg-unset text-black" v-if="!isLoading">
          <view class="text-xxl">{{ '请选择分流' }}</view>
          <view class="text-sm margin-bottom-lg text-pink">{{ '墙裂建议开启`vpn`之后在使用该应用' }}</view>
          <view class="padding flex flex-direction">
            <button
              v-for="(item, index) in flows"
              :key="index"
              class="cu-btn bg-white margin-bottom-sm text-lg padding-top-sm padding-bottom-sm"
              :class="[ current_mirror_index == index ? 'bg-gradual-pink shadow-blur text-bold active-item' : '' ]"
              style="height: auto"
              @tap="handleTapFlow(item, index)"
            >{{ item.title }}</button>
          </view>
        </view>
      </view>

      <!-- flag: 2020-07-03 更新: 由于接口的一些问题, 现在不测试接口了, 直接选择 -->
      <view class="text-center margin-top-lg" v-else-if="setup == 2">
        <view :style="{
          marginTop: `${ CustomBar * 2 }px`
        }">
          <view class="text-sl padding margin-top-lg">
            <text>{{ logoText }}</text>
          </view>
        </view>
        <view class="margin-top margin-bottom">{{ current_mirror && current_mirror.title }}</view>
        <view class="text-blue">{{ loadingTitle }}</view>
        <view class="margin-top-lg">
          <button class="cu-btn round bg-pink margin-right-lg" @tap="setupPrevious">{{ '继续换源' }}</button>
          <button class="cu-btn round bg-green" v-if="testStatus" @tap="bindMirrorCurrent(current_mirror)">{{ '选定源' }}</button>
        </view>
        <view class="showVersion text-gray">{{ version }}</view>
      </view>

    </glass>

    <view class="margin-tb-sm text-center next" :class="{ show: (current_mirror_index != null) }">
			<button class="cu-btn round bg-pink" :style="{ width: `420rpx` }" @tap="handleSelect">
        <i class="cuIcon-lock margin-right-xs" />
        {{ '重新获取' && `选定` }}
      </button>
		</view>

  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { flowDataFace } from "@/interface/pages"
import { getAllMirror, handleTestApi } from '@/api/v1';
import { blur_default_url } from '@/const';
import { version } from '@/config';
import { mirrorItemInterface } from '@/interface/tool';
import { router } from '@/utils';
import { setMirror, getMirror } from '@/utils/mirror';
import { setFullScreen } from '../../utils/uni';

export default Vue.extend({
  data(): flowDataFace {
    return {
      flowBg: blur_default_url,
      flowBgBlur: 24,
      flowBgDark: false,
      isLoading: false,
      isTestLoading: false,
      testStatus: false,
      flows: [],
      setup: 1,
      logoText: '18comic',
      current_mirror: null,
      current_mirror_index: null
    };
  },
  computed: {
    version(): string {
      return version
    },
    loadingTitle(): string {
      const flag = this.isTestLoading
      const testFlag = this.testStatus
      if (flag) return '测试连接中...'
      return testFlag ? '连接成功' : '连接成功'
    }
  },
  onLoad() {
   this._getAllMirror()
   setFullScreen(true)
  },
  onUnload() {
    setFullScreen(false)
  },
  methods: {
    /**
     * 获取数据
     */
    async _getAllMirror() {
      this.isLoading = true
      const data = await getAllMirror()
      this.flows = data
      this.isLoading = false
    },
    /**
     * 返回上一步
     */
    setupPrevious() {
      // this._getAllMirror()
      this.setup = 1
      this.isLoading = false
    },
    bindMirrorCurrent(data: mirrorItemInterface) {
      const now = setMirror(data.ext)
      uni.showModal({
        title: '提示',
        content: '设置成功',
        showCancel: false,
        confirmText: '我知道了'
      })
    },
    async handleTapFlow(item: mirrorItemInterface, index: number) {     
      this.current_mirror_index = index
      this.current_mirror = item
      // this.setup = 2
      // this.testStatus = false
      // this.isLoading = true
      // this.isTestLoading = true
      // const flag = await handleTestApi(item.full_url)
      // this.isTestLoading = false
      // this.testStatus = flag
    },
    /**
     * 选定接口
     */
    async handleSelect() {
      try {
        const item = this.current_mirror
        if (!item) return
        const { full_url } = item
        setMirror(full_url)
        plus.nativeUI.toast(`设置成功: ${ full_url }`) 
      } catch (error) {
        throw new Error(error)
      }
    },
    /**
     * 跳转链接
     */
    handleClickLink(type: string) {
      if (type === 'back') {
        router.back()
      } else if (type === 'home') {
        router.tab('index/index')
      }
    }
  }
});
</script>

<style scoped>
.nowBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 24;
}
.big-bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-unset {
  background: unset;
}
.showVersion {
  position: fixed;
  bottom: 3%;
  right: 5%;
}
.next {
	position: fixed;
	bottom: 10%;
	left: 0;
	width: 100%;
	transform: translateY(40vh);
	/* opacity: 0; */
	transition: all .4s;
	z-index: 9999;
}
.next.top {
  left: unset;
  top: 0;
  transform: translateY(-40vh);
}
.next.show {
	transform: translateY(0);
	/* opacity: 1; */
}
.btn-x {
  position: absolute;
  top: 24rpx;
  left: 22rpx;
}
.btn-x.right {
  left: unset;
  right : 22rpx;
}
.text-df-wp {
  font-size: 36rpx;
  color: var(--pink);
  margin-right: 6rpx;
}
.active-item {
  transform: scale(1.1);
  transition: all .4s;
}
</style>