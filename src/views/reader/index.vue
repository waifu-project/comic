<template>
  <view>
    <topbar :blur="24" :barImg="barImg" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">18comic</block>
    </topbar>
    <rich-text :nodes="_nodes" />
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { setFullScreen } from '@/utils/uni'
import { getComicPic } from '@/api/v1'
let hpjs: any = require('@/plugins/html_parse') 

export default Vue.extend({
  data() {
    return {
      imgs: [],
    }
  },
  computed: {
    _nodes() {
      let result = ''
      this.imgs.forEach(item=> {
        result += `<img src="${ item }" style="width:100%; height: auto" /> <br/>`
      })
      return hpjs(result)
    },
    barImg(): string {
      const img = this.imgs
      return img[0]
    }
  },
  methods: {
    async getData(id: string | number, page?: number) {
      const data = await getComicPic(id)
      this.imgs = data
    },
  },
  async onLoad(ops: any) {
    let { id } = ops
    id = id ? id : 195491
    await this.getData(id)
  }
})
</script>

<style scoped>
.img_box {
  background: #333;
}
</style>