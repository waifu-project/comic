/**
 * 暗色模式匹配
 */

import store from '@/store'

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

  // TODO 获取当前主题错误
  // const now_flag = getUiStyle()
  // store.commit('settings/CHANGE_UI_THEME', now_flag)

  const startupThemeFlag: boolean = (store.state as any).settings.isDark
  if (startupThemeFlag) {
    setTimeout(()=> {
      uni.setTabBarStyle({
        backgroundColor: 'rgba(0, 0, 0, .8)',
        color: '#fff',
        selectedColor: 'rgb(60, 197, 31)'
      })
    }, 50)
  }
  const _uni = uni as any
  _uni.onUIStyleChange((res: any)=> {
    const flag = _b(res.style)
    uni.showModal({
      title: `主题已修改..${ flag }`
    })
    store.commit('settings/CHANGE_UI_THEME', flag)
  })
} catch (error) {
  console.error('监听系统主题变化失败..', error)
}