<template>
  <view>
    <topbar>
      <block slot="content">{{ '我的' }}</block>
    </topbar>
    <glass :opacity=".4" :blur="24" :bg="bgImg">
      <wrapper>
        <view class="bg-img bg-mask bg-black light flex align-center shadow-blur" :style="bgMaskImgStyle">
          <view class="padding-sm text-white">
            <view class="padding-xs text-xl text-bold">
              {{ sayWord.hitokoto }}
            </view>
            <view class="padding-xs text-df">
              - {{ sayWord.from }}
            </view>
          </view>
        </view>
        <view>
          <card title="最近观看" lineColor="pink" />
          <card title="已收藏" lineColor="pink" />
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
    async getCurrentWord() {
      const data = await getWord()
      const hitokoto = data.hitokoto || ""
      const from = data.from || ""
      this.sayWord = {
        hitokoto,
        from
      }
    }
  }
})
</script>

<style>

</style>