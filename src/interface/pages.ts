import css from 'csstype'
import { shareComicFace, themeInterface, themeListInterface, topicItemInterface, readerItemInterface } from '.';
import { searchOptions, themeMenuItemInterface, mirrorItemInterface } from './tool';
import { searchOptionTimeEnum, searchOptionTypeEnum } from './enum';
import { sayWordInterface } from '@/api/share';

// flag: 旧的流列表数据
interface flowDataArrayFace {
  text: string
  url: string
}

/**
 * flow页面数据
 */
export interface flowDataFace {
  flowBg: string // 背景
  flowBgBlur: number // 模糊尺寸
  flowBgDark: boolean // 背景是否黑白, 用于判断是否有网络
  flows: mirrorItemInterface[] // 流列表
  setup: number // 步骤
  logoText: string // logo文字
  /**
   * 加载状态
   */
  isLoading: boolean
  /**
   * 测试接口状态
   */
  isTestLoading: boolean
  /**
   * 测试是否连接成功
   */
  testStatus: boolean
  /**
   * 当前镜像
   */
  current_mirror: null | mirrorItemInterface
  /**
   * 当前镜像索引
   */
  current_mirror_index: null | number
}

/**
 * 首页接口数据
 */
export interface indexDataFace {
  footerButtonStyle: css.Properties
  model: any
  dialogButtons: any[]
  swiperList: any[]
  dotStyle: boolean
  lists: any[]
  cover?: string
  body?: string
  isLoading: boolean
}

/**
 * 阅读器接口数据
 */
export interface readerDataFace {

  /**
   * 漫画内容
   */
  comicData: readerItemInterface

  /**
   * 漫画 `id`
   */
  currentComicID: string

  /**
   * 图片(已废弃)
   */
  imgs?: string[]

  /**
   * 是否在加载中
   */
  isLoading: boolean

  /**
   * 该字段主要是用来判断 `scroll-view` 的高度的
   */
  scrollTop: number

  /**
   * 点击后的高亮效果 `x`
   */
  effectX: number

  /**
   * 点击后的高亮效果 `y`
   */
  effectY: number

  /**
   * 高亮显示 `flag`
   */
  effectDisplay: boolean

  /**
   * `box` 宽度
   */
  effectW: number

  /**
   * `box` 高度
   */
  effectH: number

}

/**
 * 搜索页面`data`
 */
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
   * 是否显示 `loading` 动画
   */
  showLoading: boolean
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
  /**
   * 返回顶部的标识
   */
  back2topFlag: boolean
  /**
   * 搜索界面数据为空时的文字
   */
  search_empty_text: string
}

export interface themePageDataInterface {
  /**
   * 搜索框提示文本
   */
  placeholder: string
  /**
   * goto id-input
   */
  goto_placeholder: string
  /**
   * 列表数据
   */
  data: themeInterface[]
  /**
   * 自定义的主题菜单
   */
  xData: themeMenuItemInterface[]
  /**
   * 最热主题
   */
  popularThemes: themeListInterface[]
  /**
   * 默认毛玻璃背景图片
   */
  blur_default_url: string
  /**
   * 搜索的文本
   */
  searchVal: string
  /**
   * go-to 文本
   */
  goto_text: string
  /**
   * go-to input
   */
  gotoInputVal: string
  /**
   * go-to 模态框flag
   */
  gotoModal: boolean
  /**
   * 是否加载中
   */
  isLoading: boolean
}

export interface topicDataInterface {
  messages: topicItemInterface[]
  /**
   * 作为分页
   */
  count: number
}

export interface settingsDataInterface {
  /**
   * 点击次数
   */
  count: number
  /**
   * 检测更新 `flag`
   */
  checkUpdateIsLoading: boolean
}

export interface detailDataInterface {

  /**
   * 本地拿到的 `id`
   */
  id: string | number

  /**
   * 数据
   */
  data: shareComicFace

  /**
   * 加载状态
   */
  isLoading: boolean

  /**
   * 是否显示漫画完整信息
   */
  showComicInfoBox: boolean

}

/**
 * `filter` page data interface
 */
export interface filterDataInterface {
  /**
   * 时间
   */
  time?: null | searchOptionTimeEnum
  /**
   * 类型
   */
  type?: null | searchOptionTypeEnum
}

export interface homePageInterface {

  /**
   * 一句话
   */
  sayWord: sayWordInterface

  /**
   * 随机背景图
   */
  bgImg: string

}