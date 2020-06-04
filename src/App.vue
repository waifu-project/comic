<script lang="ts">
import Vue from "vue";
import { colors } from '@/const'
export default Vue.extend({
  mpType: "app",
  onLaunch() {
    try {
      uni.getSystemInfo({
        success: function(e) {
          const statusBarHeight = e.statusBarHeight || 0;
          const titleBarHeight = e.titleBarHeight || 0;
          // #ifndef MP
          Vue.prototype.StatusBar = statusBarHeight;
          if (e.platform == "android") {
            Vue.prototype.CustomBar = statusBarHeight + 50;
          } else {
            Vue.prototype.CustomBar = statusBarHeight + 45;
          }
          // #endif
          // #ifdef MP-WEIXIN || MP-QQ
          Vue.prototype.StatusBar = statusBarHeight;
          let capsule = wx.getMenuButtonBoundingClientRect();
          if (capsule) {
            Vue.prototype.Custom = capsule;
            // Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
            Vue.prototype.CustomBar =
              capsule.bottom + capsule.top - statusBarHeight;
          } else {
            Vue.prototype.CustomBar = statusBarHeight + 50;
          }
          // #endif

          // #ifdef MP-ALIPAY
          Vue.prototype.StatusBar = statusBarHeight;
          Vue.prototype.CustomBar = statusBarHeight + titleBarHeight;
          // #endif
        }
      });
      Vue.prototype.ColorList = colors
    } catch (error) {
      throw new Error("获取失败");
    }
  },
  onShow() {
    // console.log('App Show')
  },
  onHide() {
    // console.log('App Hide')
  }
});
</script>

<style>
@import url("../node_modules/colorui/colorui/main.css");
@import url("../node_modules/colorui/colorui/icon.css");
</style>
