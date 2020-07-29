<template>
  <view>
    <topbar :barImg="bgImg">
      <block slot="content">{{ '我的' }}</block>
    </topbar>
    <glass :opacity=".4" :blur="24" :bg="bgImg">
      <wrapper>
        <view class="bg-img bg-mask bg-black light flex align-center dark-remove bg-mask-overlay" :style="bgMaskImgStyle">
          <view class="padding-sm text-white dark-remove" v-if="word.hitokoto">
            <view class="padding-xs text-xl text-bold dark-remove">
              {{ word.hitokoto }}
            </view>
            <view class="padding-xs text-df dark-remove">
              - {{ word.from }}
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
import { getWord, sayWordInterface } from '@/api/share'
import cssType from 'csstype'
import Card from '@/components/card.vue'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { extType } from '@/store/modules/comic'
import { homePageInterface } from '@/interface/pages'
export default Vue.extend({
  data(): homePageInterface {
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
    ...mapState('cache', [
      'homeSayWord'
    ]),
    bgMaskImgStyle(): cssType.Properties {
      const { height: _h } = getWidthAndHeight()
      const h = Math.floor(_h * 0.333)
      return {
        backgroundImage: `url(${ bg_default_url })`,
        height: `${ h }px`
      }
    },
    word(): sayWordInterface {
      const w = this.sayWord
      if (w.hitokoto) return w
      if (this.homeSayWord) return this.homeSayWord
      return { hitokoto: '', from: '' }
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
    ...mapMutations('cache', [
      'CHANGE_HOME_SAY_WORD'
    ]),
    /**
     * 获取 `一言`
     */
    async getCurrentWord() {
      const data = await getWord()
      const hitokoto = data.hitokoto || ""
      const from = data.from || ""
      const x: sayWordInterface = {
        hitokoto,
        from
      }
      this.sayWord = x
      this.CHANGE_HOME_SAY_WORD(x)
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
/* 参考: https://www.deepin.org/zh/download/ */
.bg-mask-overlay::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url(/static/overlay.png);
}
</style>