import css from 'csstype'
import { shareComicFace, themeInterface, themeListInterface, topicItemInterface } from '.';
import { searchOptions, themeMenuItemInterface } from './tool';

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
  flows: flowDataArrayFace[] // 流列表
  setup: number // 步骤
  logoText: string // logo文字
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
}