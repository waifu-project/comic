<template>
	<view>
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

		<x-list v-if="false" :data="swiperList" itemClass="text-white padding-sm solid-bottom">
			<template slot="item" slot-scope="{ row }">
				<view class="cu-avatar xl diy-cover margin-right-sm" :style="{ backgroundImage: `url(${ cover })` }" />
        <view class="content diy-cover">
          <view class="text-lg text-black">{{ row.index }}</view>
          <view class="text-gray text-sm flex">
            <view class="text-cut">
              {{ row.item.imagee }}
            </view>
          </view>
        </view>
			</template>
		</x-list>

		<Card title="本子神推荐" :data="tempList" />

		<dialog-box
		:show.sync="model.startup"
		:showTitleBar="false"
		:buttons="dialogButtons"
		:footerStyle="footerButtonStyle"
		@action="handleDialogAction"
		>
			<image style="width: 100%" :src="tempUrl" mode="scaleToFill" />
			<view class="text-center">
				<view class="text-lg text-pink">{{ 'waifu 新面孔' }}</view>
				<view class="text-center text-gray text-sm">{{ '2020年12月10日 23:00' }}</view>
			</view>
			<view class="margin-top-sm">
				{{ '文本哦' }}
			</view>
    </dialog-box>

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
			tempUrl: require('@/static/index-bg.jpg'),
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
				tempList: []
		}
	},
	async created() {
		const data = await getIndexData()
		this.tempList = data
	},
	methods: {
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