import css from 'csstype'
import { shareComicFace } from '.';
import { searchOptions } from './tool';

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

// 首页接口数据
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

export interface searchPageInterface {
  /**
   * 数据列表
   */
  lists: shareComicFace[]
  /**
   * 是否有下一页
   */
  isNext: boolean
  /**
   * loading状态
   */
  isLoading: boolean
  /**
   * 查询字段
   */
  query: searchOptions
  /**
   * 当前页数
   */
  current_page: string | number
  /**
   * 总页数
   */
  total_page: string | number
  /**
   * 不重要!(只是用来判断是否是双击)
   * https://blog.csdn.net/qq_45515863/article/details/104361322
   */
  touchStartTime: number
}