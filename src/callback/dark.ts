/**
 * 暗色模式匹配
 */

import store from '@/store'
import { isDev } from '@/config'

const _b = (s: string): boolean => {
  if('dark'== s) return true
  return false
}

/**
 * 拿到当前颜色主题
 */
const getUiStyle = (): boolean=> {
  try {
    const wrapper = plus.navigator as any
    const style = wrapper.getUiStyle();
    return _b(style)
  } catch (error) {
    return false
  }
}

try {
  // TODO
  if (!isDev) {
    const now_flag = getUiStyle()
    store.commit('settings/CHANGE_UI_THEME', now_flag)
  }
  const _uni = uni as any
  _uni.onUIStyleChange((res: any)=> {
    const flag = _b(res.style)
    store.commit('settings/CHANGE_UI_THEME', flag)
  })
} catch (error) {
  console.error('监听系统主题变化失败..', error)
}