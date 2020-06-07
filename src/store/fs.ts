// 本地持久化
// 参考文档: https://blog.csdn.net/kouryoushine/article/details/103762147
// 官方文档: https://ask.dcloud.net.cn/article/166

import createPersistedState from "vuex-persistedstate";

export default ()=> createPersistedState({
  storage: {
    getItem: key => uni.getStorageSync(key),
    setItem: (key, value) => uni.setStorageSync(key, value),
    removeItem: key => uni.removeStorageSync(key)
  }
})