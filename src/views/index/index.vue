<template>
	<view>
		<topbar>
			<block slot="content">{{ '禁漫天堂🍓' }}</block>
		</topbar>

		<glass :opacity=".4" :blur="24">
			<wrapper :isLoading="isLoading" @scroll="handleScroll">

				<view v-if="false">
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
					<reload-button @click="handleReloadData" />
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
			<scroll-view scroll-y :style="{ height: `100%` }">
				<rich-text :nodes="body" />
			</scroll-view>
		</dialog-box>

	</view>
</template>
<script lang="ts">
import Vue from 'vue'
import Card from '@/components/card.vue'
import { getIndexData } from '@/api/v1'
import { mapState, mapMutations } from 'vuex'
import { indexDataFace } from '@/interface/pages'
import reloadButton from '@/components/reload-button.vue'
export default Vue.extend({
	components: {
		Card,
		reloadButton
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
			lists: [],
			isLoading: true
		}
	},
	async onLoad() {
		const _datas = this.indexData
		if (!_datas) {
			this.useIndexData()
		} else {
			if (Array.isArray(_datas)) {
				this.isLoading = false
				this.lists = _datas
			}
		}
	},
	computed: {
		...mapState('cache', {
			indexData: (state: any) => {
				return state.index
			}
		}),
		...mapState('settings', [
			'showIndexAD'
		])
	},
	methods: {
		...mapMutations('cache', [
			'CHANGE_INDEX_DATA',
		]),
		handleScroll(data: any) {
			if (this.isLoading) return
			const { position } = data
			if (position == 'top') {
				// this.useIndexData()
			}
		},
		async useIndexData() {
			this.isLoading = true
			const data = await getIndexData()
			const { modal, lists } = data
			this.model.startup = true
			this.body = modal.body
			this.lists = lists
			this.CHANGE_INDEX_DATA(lists)
			this.isLoading = false
		},
		handleDialogAction(item: any) {
			try {
				this.model.startup = false
			} catch (error) {
				throw new Error(error)
			}
		},
		handleReloadData() {
			this.useIndexData()
		}
	},
})
</script>

<style scoped>
.diy-cover {
  position: unset !important;
}
</style>