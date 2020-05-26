<template>
  <view>
    <glass :bg="flowBg" :blur="flowBgBlur" :dark="flowBgDark">
      <view class="cu-modal show bg-unset" v-if="setup == 1">
        <view class="cu-dialog bg-unset text-white">
          <view class="text-lg margin-bottom-lg">{{ '请选择分流' }}</view>
          <view class="margin-bottom-lg">{{ '这是提示' }}</view>
          <view class="padding flex flex-direction">
            <button
              v-for="(item, index) in flows"
              :key="index"
              class="cu-btn bg-white margin-bottom-sm text-lg padding-top-sm padding-bottom-sm"
              style="height: auto"
            >{{ item.text }}</button>
          </view>
        </view>
      </view>
      <view class="text-center margin-top-lg" v-else-if="setup == 2">
        <view class="text-sl padding">
          <text>{{ logoText }}</text>
        </view>
        <view class="text-blue">{{ '加载中。。。' }}</view>
        <view class="showVersion text-gray">{{ '0.0.0.1' }}</view>
      </view>
    </glass>

  </view>
</template>

<script lang="ts">
import Vue from "vue"
import { flowDataFace } from "@/interface/pages"
// import glass from '@/components/glass.vue'

export default Vue.extend({
  // components: { glass },
  data(): flowDataFace {
    return {
      flowBg: "https://i.loli.net/2020/05/25/ynGRv1z5s7OCtw9.png",
      flowBgBlur: 12,
      flowBgDark: false,
      flows: [
        {
          text: "流1",
          url: ""
        },
        {
          text: "流2",
          url: ""
        },
        {
          text: "流3",
          url: ""
        }
      ],
      setup: 1,
      logoText: '18comic'
    };
  },
  computed: {},
  onLoad() {},
  methods: {}
});
</script>

<style scoped>
.nowBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 24;
}
.big-bg {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.bg-unset {
  background: unset;
}
.showVersion {
  position: fixed;
  bottom: 3%;
  right: 5%;
}
</style>