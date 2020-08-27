<template>
  <view class="cu-modal" :class="show ? 'show' : ''">
    <view class="cu-dialog dialog-jsx">
      <view class="cu-bar bg-white justify-end" v-if="titleBarStatus">
        <view class="content">{{ title }}</view>
        <view class="action" @tap="hideModal">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view v-else>
        <slot name="header" />
      </view>
      <slot name="default" />
      <slot v-if="$slots['footer']" name="footer" />
      <view v-else class="cu-bar bg-white">
        <view
        v-for="item in _buttons"
        :key="item.id"
        @click="handleAction(item)"
        class="action margin-0 flex-sub"
        :class="item.___line ? 'solid-right' : ''"
        :style="footerStyle"
        >
          {{ item.text }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">

/**
* 对话框
* @desc 对话框
* @author d1y<chenhonzhou@gmail.com>
* @date 2020年05月25日17:22:43
* @param {String} [bg]
* @example 调用示例
* <dialog-box :show.sync="showModal" @action="handlePrev" :buttons="[ {text: '我知道了', id: 0 } ]">
*   <view class="text-bold text-xxs margin">
*     {{ detailIDNotExist }}
*   </view>
* </dialog-box>
 */
import Vue from 'vue'
import cssType from 'csstype'
export default Vue.extend({
  name: 'dialog-box',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    showTitleBar: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "提示"
    },
    buttons: {
      type: Array,
      default: (): any[]=> [
        {
          text: '取消',
          id: 0
        },
        {
          text: '确定',
          id: 1
        }
      ]
    },
    footerStyle: {
      type: Object,
      default: (): any=> {}
    }
  },
  computed: {
    titleBarStatus(): boolean {
      const bar = this.showTitleBar
      const header = this.$slots['header']
      if (header) return false
      if (bar) return true
      return false
    },
    _buttons(): any[] {
      const btns = this.buttons
      const maxIndex = btns.length - 1
      return btns.map((item, index)=> {
        let result = true
        if (maxIndex === index) {
          result = false
        }
        ;(item as any)['___line'] = result
        return item
      })
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false)
    },
    handleAction(item: any) {
      this.$emit('action', item)
    }
  }
})
</script>

<style scoped>
.dialog-jsx {
  max-width: 92vw;
}
</style>