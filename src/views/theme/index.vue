<template>
  <view>
    <topbar ref="topbar" bgColor="bg-whitex" :diy="true">
      <view class="flex flex-wrap-box margin-bottom-lg">
				<input
          name="input"
          class="input_box text-black margin-left-sm margin-right-sm radius padding-left-lg margin-top-sm"
          :placeholder="placeholder"
          v-model="searchVal"
          :maxlength="24"
          @confirm="handleConfirmSearch"
        />
			</view>
    </topbar>
    <glass :opacity=".4" :blur="24">
      <wrapper>
        <block v-if="popularThemes.length">
          <view class="cu-bar solid-bottom">
            <view class="action">
              <text class="cuIcon-title text-pink" />
              {{ '最热主题' }}
            </view>
          </view>
          <view class="padding-sm flex flex-wrap">
            <view class="padding-xs"
            @tap="handleClickTheme(item)"
            v-for="(item, index) in popularThemes"
            :key="index"
            >
              <view class="cu-tag" :class="[ `bg-${ item.bg.name }` ]">
                {{ item.text }}
              </view>
            </view>
          </view>
        </block>
        <view class="cu-bar solid-bottom">
          <view class="action">
            <text class="cuIcon-title text-pink" />
            {{ '快上车' }}
          </view>
        </view>
        <view class="padding">
          <view class="grid col-4 grid-square">
            <view class="bg-img bg-mask text-white shadow-blur" :style="{
              backgroundImage: `url(${ blur_default_url })`
            }" v-for="(item, index) in xData" :key="item.key"
            @tap="handleClickDiyItem(item, index)" >
              <view :style="{
                position: `absolute`,
                left: `14rpx`,
                bottom: `8rpx`
              }">
                {{ item.title }}
              </view>
            </view>
          </view>
        </view>

        <block v-for="(item, index) in uData" :key="index">
          <view class="cu-bar radius solid-bottom">
            <view class="action">
              <text class="cuIcon-title text-pink" />
              {{ item.title }}
            </view>
          </view>
          <view class="grid padding-sm" :class="`col-${ item.col }`">
            <view class="padding-sm" v-for="(subItem, i) in item.lists" :key="i">
              <view :style="{
                minHeight: `120rpx`
              }" class="padding radius text-center shadow-blur flex align-center justify-center dark-remove"
              :class="`bg-${ subItem.bg.name }`"
              @tap="handleClickTheme(subItem)"
              >
                {{ subItem.text }}
              </view>
            </view>
          </view>
        </block>

      </wrapper>
    </glass>

    <dialog-box :show.sync="gotoModal" @action="handleClickGoto">
      <view class="text-bold text-xxs margin">
        {{ goto_text }}
      </view>
      <view class="flex flex-wrap-box margin-bottom-lg">
				<input
          name="input"
          type="number"
          class="input_box text-black margin-left-sm margin-right-sm radius padding-left-lg"
          :placeholder="goto_placeholder"
          :maxlength="24"
          v-model="gotoInputVal"
        />
			</view>
    </dialog-box>

  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { getTheme, getPopularThemes } from '@/api/v1'
import { blur_default_url, theme_item_max_word, theme_search_main_placeholder, theme_search_goto_placeholder, theme_search_goto_text } from '@/const'
import { mapMutations, mapState } from 'vuex'
import { themeListInterface, themeInterface } from '@/interface'
import { router } from '@/utils'
import { theme_menus } from '@/const'
import { themePageDataInterface } from '@/interface/pages'
import { createSearchUrl } from '@/utils/qs'
import { themeMenuItemInterface } from '@/interface/tool'
import { themeConcatInterface } from '@/store/types'
export default Vue.extend({
  data(): themePageDataInterface {
    return {
      goto_text: theme_search_goto_text,
      goto_placeholder: theme_search_goto_placeholder,
      placeholder: theme_search_main_placeholder,
      xData: theme_menus,
      data: [],
      popularThemes: [],
      blur_default_url,
      searchVal: '',
      gotoInputVal: '',
      gotoModal: false
    }
  },
  async onLoad() {
    try {
      const theme: null | themeConcatInterface = this.theme
      if (!!theme) {
        const { data, popular } = theme
        this.data = data
        this.popularThemes = popular
      } else {
        await this.getData()
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  computed: {
    ...mapState('cache', [
      'theme'
    ]),
    uData(): themeInterface[] {
      const data = this.data || []
      // flag: 如果文字大于 `theme_item_max_word`, 就改为 2 列
      return data.map(item=> {
        const is2col = item.lists.some(_item=> {
          let text = _item.text
          const flag = text.length >= theme_item_max_word
          return flag
        })
        if (is2col) item['col'] = 2
        return item
      })
    }
  },
  methods: {
    ...mapMutations('comic', [
      'CHANGE_SEARCH_URL',
      'CHANGE_SEARCH_BAR_TITLE'
    ]),
    ...mapMutations('cache', [
      'CHANGE_THEME_DATA'
    ]),
    async getData() {
      const popularThemes: any = await getPopularThemes()
      const data: any = await getTheme()
      this.data = data
      this.popularThemes = popularThemes
      const _typeData: themeConcatInterface = {
        data,
        popular: popularThemes
      }
      this.CHANGE_THEME_DATA(_typeData)
    },
    handleClickTheme(data: themeListInterface) {
      const { url, text } = data
      this.CHANGE_SEARCH_URL(url)
      this.CHANGE_SEARCH_BAR_TITLE(text)
      router.push('search/index')
    },
    /**
     * 搜索文本框
     */
    handleConfirmSearch() {
      const text = this.searchVal
      const url = createSearchUrl(text)
      this.handleClickTheme({
        url,
        text
      })
      // TODO 清空
      this.searchVal = ""
    },
    /**
     * GOTO
     */
    handleClickGoto(data: any) {
      const { ___line: flag } = data
      const val = this.gotoInputVal
      this.gotoInputVal = ''
      this.gotoModal = false
      if (!flag) {
        if (!val) return
        router.push('detail/index', {
          id: val
        })
      }
    },
    handleClickDiyItem(item: themeMenuItemInterface, index: number) {
      // TODO 这个方法可能有很多实现代码, 需要移植给单独的模块
      const { link, key } = item
      switch (key) {
        case 'goto':
          this.gotoModal = true
          break;
      
        default:
          // TODO
          console.log('这里来了...', (new Date).toString())
          router.push(link)
          break;
      }
    }
  }
})
</script>

<style scoped>
.flex-wrap-box {
  width: 100%;
}
.input_box {
  width: 100%;
  height: 68rpx;
  background: var(--greyLight);
  display: flex;
  box-sizing: unset;
}
.input_box:-ms-input-placeholder {
    color: #a9a9a9;
}/* Internet Explorer 10+ */

.input_box::-webkit-input-placeholder {
    color: #a9a9a9;
}/* WebKit browsers */

.input_box::-moz-placeholder {
    color: #a9a9a9;
}/* Mozilla Firefox 4 to 18 */

.input_box:-moz-placeholder {
    color: #a9a9a9;
}/* Mozilla Firefox 19+ */
</style>