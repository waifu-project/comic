<template>
	<view class="wrapper bg-white flex align-center justify-center" :style="wrapperStyle">
		<swiper
		class="screen-swiper square-dot shadow"
		:style="guideWrapperStyle"
		indicator-dots="true"
		:circular="true"
		:autoplay="false"
		interval="5000"
		duration="500"
		indicator-color="#8799a3"
		indicator-active-color="#0081ff"
		@change="handleChangeCurrent"
		:current="currentIndex"
		>
			<swiper-item class="flex align-center justify-center" v-for="(item, index) in lists" :key="index">
				 <scroll-view scroll-y :style="item.style">
					 <view class="padding-lg">
						<view class="cu-bar light" :class="item.titleBg ? ('bg-' + item.titleBg) : ''">
								<view class="action border-title">
									<text class="text-xl text-bold">{{ item.title }}</text>
									<text class="bg-pink" style="width:2rem"></text>
									<!-- 底部样式 last-child选择器-->
								</view>
							</view>
							<view class="padding markdown-body" style="min-height: 20vh">
								<rich-text :nodes="item.content" />
							</view>
						</view>
				 </scroll-view>
			</swiper-item>
		</swiper>
		<view class="margin-tb-sm text-center next" :class="{ show: isEnd }">
			<button class="cu-btn round bg-red" :style="{
				width: `420rpx`
			}" @tap="openApp">{{ '进入应用' }}</button>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from 'vue'
import { setFullScreen } from '@/utils/uni'
import cssType from 'csstype'
import { guideDatas, blur_default_url } from '@/const'
import { router } from '@/utils'
const hpjs = require('@/plugins/html_parse')
export default Vue.extend({
	data() {
		return {
			currentIndex: 0
		}
	},
	computed: {
		guideWrapperStyle(): cssType.Properties {
			const res = uni.getSystemInfoSync()
			const h = (res.windowHeight || 0) - 20 - 240
			return {
				width: `88%`,
				height: `${ h }px`,
				borderRadius: `42rpx`,
				backgroundColor: `rgba(255, 255, 255, .5)`,
				backdropFilter: `blur(42px)`,
				overflow: `hidden`
			}
		},
		wrapperStyle(): cssType.Properties {
			const res = uni.getSystemInfoSync()
			return {
				width: `${ res.windowWidth }px`,
				height: `${ res.windowHeight }px`,
				backgroundImage: `url(${ blur_default_url })`
			}
		},
		lists() {
			return guideDatas.map(item=> {
				const ctx = item.content
				if (typeof ctx == 'string') {
					item.content = hpjs(item.content)
				}
				const style = {
					width: `100%`,
				}
				if (item.isFull) {
					const x = this.guideWrapperStyle
					Object.assign(style, x)
				}
				item.style = style
				return item
			})
		},
		isEnd(): boolean {
			try {
				const index = this.currentIndex
				const now = guideDatas[index]
				return ('isEnd' in now)
			} catch (error) {
				return false
			}
		}
	},
	methods: {
		handleChangeCurrent(e: any) {
			const { current } = e.detail
			this.currentIndex = current
		},
		openApp() {
			uni.redirectTo({ url: '/views/switch/flow'})
		}
	},
	onLoad() {
		setFullScreen(true)
	},
	onUnload() {
		setFullScreen(false)
	}
})
</script>

<style scoped>
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
.next.show {
	transform: translateY(5vh);
	/* opacity: 1; */
}
</style>