<template>
  <glass :blur="24" :dark="!isRainBox">

    <view class="next top show" :style="{ height: `124rpx`, top: `${ CustomBar * .5 }px` }">
      <button v-if="false" class="cu-btn round bg-pink btn-x right light text-pink" @tap="handleClickLink('home')">
        <i class="text-gray cuIcon-home text-df-wp" />
        {{ '首页' }}
      </button>
      <button class="cu-btn round bg-pink btn-x light" @tap="handleClickLink('back')">
        <i class="text-gray cuIcon-back text-df-wp" />
        {{ '回到上一页' }}
      </button>
    </view>

    <wrapper>

      <view class="flex align-center justify-center" :style="{
        width: `${ ctx.x }px`,
        height: `${ ctx.y - 124 }px`
      }">
        <image :src="logoImg" :mode="'aspectFit'" />
      </view>

    </wrapper>

    <view class="login-box padding-lg">

      <view class="cu-form-group margin-top radius line-pink">
        <view class="title">账号:</view>
        <input type="text" v-model="username" />
      </view>

      <view class="text-pink text-lg" v-if="!isUsername && username.length">* 填写错误</view>

      <view class="cu-form-group margin-top radius line-pink">
        <view class="title">密码:</view>
        <input type="password" v-model="password" />
      </view>

      <view class="text-pink text-lg" v-if="!isPassword && password.length">* 填写错误</view>

      <view v-if="isUsername && isPassword" class="padding-left padding-right margin-top-sm flex flex-direction">
        <button :disabled="loadingNetwork" @tap="handleLogin" class="cu-btn bg-red lg shadow-blur">
          {{ '登录' }}
        </button>
      </view>

    </view>

    <view class="cu-load load-modal" v-if="loadingNetwork">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/miku_loading.gif" mode="aspectFit"></image>
			<view class="gray-text">登录中...</view>
		</view>

  </glass>
</template>

<script lang="ts">
import Vue from 'vue'
import { router } from '@/utils'
import { createMirrorStaticFile } from '@/utils/mirror'
import { handleLogin } from '@/api/v1'
import { setFullScreen } from '../../utils/uni'
import { mapMutations } from 'vuex'
export default Vue.extend({
  data() {
    return {
      username: '',
      password: '',
      loadingNetwork: false
    }
  },
  computed: {
    isRainBox(): boolean {
      const _u = this.username
      const _p = this.password
      return !!(_u && _p)
    },
    /**
     * 内容宽高
     */
    ctx(): any {
      const _ctx = uni.getSystemInfoSync()
      return {
        x: _ctx.windowWidth,
        y: _ctx.windowHeight
      }
    },
    /**
     * `logo` 图片
     */
    logoImg() {
      const R = createMirrorStaticFile("media/logo/new_logo.png")
      return R
    },
    isUsername(): boolean {
      const ctx = this.username
      const userReg = /^[a-zA-Z0-9_-]{4,16}$/
      return userReg.test(ctx)
    },
    isPassword(): boolean {
      const ctx = this.password
      const pawReg = /^[-_a-zA-Z0-9]{4,16}$/
      return pawReg.test(ctx)
    }
  },
  onLoad() {
    setFullScreen(true)
  },
  onUnload() {
    setFullScreen(false)
  },
  methods: {
    ...mapMutations('user', [
      'CHANGE_LOGIN_STATUS'
    ]),
    handleClickLink(type: string) {
      if (type === 'back') {
        router.back()
      } else if (type === 'home') {
        router.tab('index/index')
      }
    },
    async handleLogin() {
      const { username, password} = this
      if (username && password) {
        this.loadingNetwork = true
        const Token = await handleLogin({
          username,
          password
        })
        if (!!Token) {
          this.CHANGE_LOGIN_STATUS(Token)
          plus.nativeUI.alert("登录成功")
          this.username = ""
          this.password = ""
          router.back()
        }
        this.loadingNetwork = false
      }
    }
  }
})
</script>

<style scoped>
/* TODO: 这里的 `css` 和 `switch/flow` 重叠了 */
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
.login-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, .4);
  backdrop-filter: blur(32px);
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  transition: all .2s;
}
</style>