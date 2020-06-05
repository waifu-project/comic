<template>
	<view>
		<topbar>
			<block slot="content">{{ '禁漫天堂🍓' }}</block>
		</topbar>
		<wrapper>
			<view>
				<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
				<view class="padding-sm bg-green">
					{{ '18comic' }}
				</view>
			</view>

			<block v-for="(item, index) in lists" :key="index">
				<Card :title="item.title" :data="item.lists" />
			</block>

			<dialog-box
			:show.sync="model.startup"
			:showTitleBar="false"
			:buttons="dialogButtons"
			:footerStyle="footerButtonStyle"
			@action="handleDialogAction"
			>
				<scroll-view scroll-y :style="{
					height: `100%`
				}">
					<rich-text :nodes="body" />
				</scroll-view>
			</dialog-box>

		</wrapper>
	</view>
</template>
<script lang="ts">
import Vue from 'vue'
import Card from '@/components/card.vue'
import { getIndexData } from '@/api/v1'
import { indexDataFace } from '@/interface/pages'
export default Vue.extend({
	components: {
		Card
	},
	data(): indexDataFace {
		return {
			footerButtonStyle: {
				color: 'var(--pink)'
			},
			cover: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
			model: {
        startup: false
			},
			dialogButtons: [
				{
					text: '知道了~',
					flag: false
				},
				{
					text: '不要再说了!',
					flag: true
				}
			],
			swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}],
				dotStyle: true,
				body: '',
				lists: []
		}
	},
	async created() {
		this.useIndexData()
	},
	methods: {
		async useIndexData() {
			const data = await getIndexData()
			const { modal, lists } = data
			this.body = modal.body
			this.lists = lists
		},
		handleDialogAction(item: any) {
			try {
				// TODO
				this.model.startup = false
			} catch (error) {
				throw new Error(error)
			}
		}
	}
})
</script>

<style scoped>
.diy-cover {
  position: unset !important;
}
</style>