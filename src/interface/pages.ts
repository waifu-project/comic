import css from 'csstype'

interface flowDataArrayFace {
  text: string
  url: string
}

export interface flowDataFace {
  flowBg: string // 背景
  flowBgBlur: number // 模糊尺寸
  flowBgDark: boolean // 背景是否黑白, 用于判断是否有网络
  flows: flowDataArrayFace[] // 流列表
  setup: number // 步骤
  logoText: string // logo文字
}

export interface indexDataFace {
  footerButtonStyle: css.Properties
  model: any
  dialogButtons: any[]
  swiperList: any[]
  dotStyle: boolean
  lists: any[]
  cover?: string
  body?: string
}