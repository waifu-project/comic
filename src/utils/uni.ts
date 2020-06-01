export const setTitle = (title: string) => {
  uni.setNavigationBarTitle({
    title
  })
}

export const setFullScreen = (flag: boolean = true): void=> {
  plus.navigator.setFullscreen(true)
}