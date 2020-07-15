<template>
  <view>
    <topbar :barImg="bgImg">
      <block slot="content">{{ '我的' }}</block>
    </topbar>
    <glass :opacity=".4" :blur="24" :bg="bgImg">
      <wrapper>
        <view class="bg-img bg-mask bg-black light flex align-center dark-remove" :style="bgMaskImgStyle">
          <view class="padding-sm text-white dark-remove">
            <view class="padding-xs text-xl text-bold dark-remove">
              {{ sayWord.hitokoto }}
            </view>
            <view class="padding-xs text-df dark-remove">
              - {{ sayWord.from }}
            </view>
          </view>
        </view>
        <view class="padding-bottom-lg">
          <card v-if="historyViews.length" :data="historyViews" title="最近观看" lineColor="pink">
            <template slot="bar" slot-scope="{ row }">
              <view class="action">
                <text class="cuIcon-titles" :class="`text-${ row.lineColor }`" />
                <text class="text-xl text-bold">{{ row.title }}</text>
              </view>
              <view class="action" @tap="clearAllCacheData(1)">
                {{ row.data.length }}
                <text class="cuIcon-right" />
              </view>
            </template>
          </card>
          <card v-if="collectLists.length" :data="collectLists" title="已收藏" lineColor="pink">
            <template slot="bar" slot-scope="{ row }">
              <view class="action">
                <text class="cuIcon-titles" :class="`text-${ row.lineColor }`" />
                <text class="text-xl text-bold">{{ row.title }}</text>
              </view>
              <view class="action" @tap="clearAllCacheData(0)">
                {{ row.data.length }}
                <text class="cuIcon-right" />
              </view>
            </template>
          </card>
        </view>
      </wrapper>
    </glass>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { getWidthAndHeight } from '@/utils'
import { bg_default_url } from '@/const'
import { getWord } from '@/api/share'
import cssType from 'csstype'
import Card from '@/components/card.vue'
import { mapGetters, mapMutations } from 'vuex'
import { extType } from '@/store/modules/comic'
export default Vue.extend({
  data() {
    return {
      sayWord: {
        hitokoto: '',
        from: ''
      },
      bgImg: bg_default_url
    }
  },
  components: {
    Card
  },
  computed: {
    ...mapGetters('comic', [
      'historyViews',
      'collectLists'
    ]),
    bgMaskImgStyle(): cssType.Properties {
      const { height: _h } = getWidthAndHeight()
      const h = Math.floor(_h * 0.333)
      return {
        backgroundImage: `url(${ bg_default_url })`,
        height: `${ h }px`
      }
    }
  },
  async onLoad() {
    await this.getCurrentWord()
  },
  methods: {
    ...mapMutations('comic', [
      'CLEAN_HISTORY_VIEWS',
      'CLEAN_COLLECT_LISTS'
    ]),
    /**
     * 获取 `一言`
     */
    async getCurrentWord() {
      const data = await getWord()
      const hitokoto = data.hitokoto || ""
      const from = data.from || ""
      this.sayWord = {
        hitokoto,
        from
      }
    },
    /**
     * 清除历史记录和收藏
     */
    clearAllCacheData(clearType: extType) {
      const isCollect = clearType == extType.collect
      let title = isCollect ? '收藏' : '历史记录'
      title = `这将清空${ title }`
      const buttons = [
        "取消",
        "我确定"
      ]
      plus.nativeUI.confirm(title, (args: any)=> {
        try {
          const { index } = args
          if (index == 1) {
            if (isCollect) {
              this.CLEAN_COLLECT_LISTS()
            } else {
              this.CLEAN_HISTORY_VIEWS()
            }
          } else {
            plus.nativeUI.toast('已取消..')
          }
        } catch (error) {
          throw new Error(error)
        }
      }, { buttons, verticalAlign: 'bottom' })
    }
  }
})
</script>

<style>

</style>