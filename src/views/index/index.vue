<template>
	<view>
		<topbar>
			<block slot="content">{{ '禁漫天堂🍓' }}</block>
		</topbar>

		<glass :opacity=".4" :blur="24">
			<wrapper>
				<view>
					<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
						<swiper-item v-for="(item,index) in swiperList" :key="index">
							<view class="text-lg margin-lg">
								{{ 'tips: 其实这是一个广告位' }}
							</view>
						</swiper-item>
					</swiper>
					<view class="padding-sm bg-green dark-remove">
						{{ '18comic' }}
					</view>
				</view>

				<view class="padding-bottom-lg">
					<block v-for="(item, index) in lists" :key="index">
						<Card :title="item.title" :data="item.lists" />
					</block>
				</view>

			</wrapper>
		</glass>

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

	</view>
</template>
<script lang="ts">
import Vue from 'vue'
import Card from '@/components/card.vue'
import { getIndexData } from '@/api/v1'
import { indexDataFace } from '@/interface/pages'
import { mapState } from 'vuex'
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
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: ''
				}
			],
			dotStyle: true,
			body: '',
			lists: []
		}
	},
	async created() {
		this.useIndexData()
	},
	computed: {
		...mapState('settings', [
			'showIndexAD'
		])
	},
	methods: {
		async useIndexData() {
			const data = await getIndexData()
			const { modal, lists } = data
			this.model.startup = true
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