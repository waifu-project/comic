<template>
  <image
  class="test-image-box"
  :src="src"
  @load="handleEvent(true)"
  @error="handleEvent(false)"
  />
</template>

<script lang="ts">

/**
* 测试图片是否加载完成
* @desc 测试图片是否加载完成
* @author d1y<chenhonzhou@gmail.com>
* @date 2020年05月25日17:22:43
* @param {String} [src]    - 背景
* @example 调用示例
*  <test-image :src="" @change="changeEvent(flag)"/>
 */
import Vue from 'vue'
export default Vue.extend({
  name: 'test-image',
  props: {
    src: {
      required: true,
      type: String
    }
  },
  methods: {
    handleEvent(flag: boolean) {
      this.$emit('change', flag)
    }
  }
})
</script>

<style scoped>
.test-image-box {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-100vw) translateX(-100vh);
}
</style>