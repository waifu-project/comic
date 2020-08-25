export const setTitle = (title: string) => {
  uni.setNavigationBarTitle({
    title
  })
}

export const setFullScreen = (flag: boolean = true): void => {
  try {
    plus.navigator.setFullscreen(flag)
  } catch (error) {
    throw new Error(`设置错误: ${error}`)
  }
}