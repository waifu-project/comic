<template>
  <view>
    <rich-text :nodes="_nodes" />
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { setFullScreen } from '@/utils/uni'
import { getIndexData } from '@/api/v1'
let hpjs: any
try {
  hpjs = require('@/plugins/html_parse')
} catch (error) {
  throw new Error(error)
}

export default Vue.extend({
  data() {
    return {
      imgs: [
        'https://cdn-msp.18comic.biz/media/photos/104333/00017.jpg',
        'https://cdn-msp.18comic.biz/media/photos/104333/00067.jpg',
        'https://cdn-msp.18comic.biz/media/photos/104333/00012.jpg'
      ]
    }
  },
  computed: {
    _nodes() {
      let result = ''
      this.imgs.forEach(item=> {
        result += `<img src="${ item }" style="width:100%; height: auto" /> <br/>`
      })
      return hpjs(result)
    }
  },
  onShow() {
    setFullScreen(true)
  },
  onHide() {
    setFullScreen(false)
  },
  async created() {
		
	},
})
</script>

<style scoped>
.img_box {
  background: #333;
}
</style>