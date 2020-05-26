<template>
  <view>
    <slot v-if="$slots['title-bar']" name="title-bar"></slot>
    <view class="cu-list menu solids-bottom line-pink fixed-bar" v-else>
      <view class="cu-item arrow">
        <view class="content">
          <text class="cuIcon-circlefill" />
          {{ titleBar.title }}
        </view>
        <view class="action text-gray">{{ titleBar.action }}</view>
      </view>
    </view>
    <view class="cu-list menu-avatar" style="margin-top: 0">
      <view
      class="cu-item flex-fix-box"
      :class="[ itemClassCp ]"
      style="height: auto;"
      v-for="(item, index) in data"
      :key="index"
      @click="handleClickItem(item, index)"
      >
        <slot name="item" :row="{ item, index }" />
      </view>
    </view>
  </view>
</template>

<script>

/*
* 列表
* @desc 封装的列表
* @author d1y<chenhonzhou@gmail.com>
* @date 2020年05月26日17:22:43
* @param {Object} [titleBar] 
* 如果 $slots['title-bar'] 不存在, 就优先使用这个对象
** { title: 标题, action: 操作标题, icon: 图片(colorui里的) }
* @param {String | Array} [itemClass] - item的class(应该要写在全局)
* @param {Array} [data] - 模板数组
* @example 调用示例
<list
:data="[]"
:titleBar="{ title: '标题', action: '操作', icon: 'home' }"
itemClass="text-white padding-sm solid-bottom" // 可以使用数组
@clickItem="clickItem({ item, index })"
>
  <template slot="title-bar">
    <view>
      // 如果存在该插槽, 会覆盖 `titleBar`
    </view>
  </template>
  <template slot="item" slot-scope="{ row }">
    <view>
    索引: {{ row.index }}
    数据: {{ row.item }}
    </view>
  </template>
</list>
  */
import { isString } from '@/utils/is'
export default {
  name: "x-list",
  props: {
    titleBar: {
      type: Object,
      default: () => ({
        title: "标题",
        action: "操作",
        icon: 'circlefill'
      })
    },
    itemClass: {
      type: [ String, Array ],
      default: ''
    },
    data: {
      type: Array,
      default: ()=> []
    }
  },
  computed: {
    itemClassCp() {
      const itemClass = this.itemClass
      if (isString(itemClass)) return itemClass
      if (Array.isArray(itemClass)) return itemClass.join(' ')
      return ""
    }
  },
  methods: {
    handleClickItem(item, index) {
      this.$emit('clickItem', {
        item,
        index
      })
    }
  }
};
</script>

<style scoped>
.flex-fix-box {
  -webkit-box-pack: start!important;
  -webkit-justify-content: flex-start!important;
  justify-content: flex-start!important;
}
</style>