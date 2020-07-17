import { shareComicFace, shareIndexComicData, themeListInterface, themeInterface } from '@/interface';
import { searchOptions } from '@/interface/tool';

export interface searchDataInterface {
  /**
   * `title-bar` 文字
   */
  barTitle: string
  /**
   * 搜索的接口
   */
  url: string
  /**
   * 查询字段
   */
  query: searchOptions
  /**
   * 页数(废弃)
   */
  page?: number
  /**
   * 全部页数
   */
  total_page?: number
  /**
   * 是否还有下一页
   */
  isNext?: boolean
}

/**
 * 漫画接口
 */
export interface comicInterface {
  /**
   * 搜索数据
   */
  searchData: searchDataInterface
  /**
   * 历史观看
   */
  history_views: shareComicFace[]
  /**
   * 收藏
   */
  collect_lists: shareComicFace[]
}

/**
 * 主题数据
 */
export interface themeConcatInterface {

  /**
   * 热门
   */
  popular: themeListInterface[]

  /**
   * 主题数据
   */
  data: themeInterface[]

}

/**
 * 缓存接口类型
 */
export interface cacheInterface {

  /**
   * 首页数据
   */
  index: null | shareIndexComicData[]

  /**
   * 主题数据
   */
  theme: null | themeConcatInterface

}

/**
 * 卡片几等分枚举
 */
export enum cardColEnum {

  /**
   * 默认
   */
  df = "默认",

  /**
   * 大
   */
  lg = "较大",

  /**
   * 超大
   */
  xl = "超大",

}

/**
 * 设置接口
 */
export interface settingsFace {
  /**
   * 是否显示开发者菜单
   */
  showDev:  boolean
  /**
   * 是否开始暗色主题
   */
  isDark: boolean
  /**
   * 首页广告
   */
  showIndexAD: boolean
  /**
   * 首次启动引导页
   */
  firstRun: boolean
  /**
   * 卡片几等分
   */
  cardCol: cardColEnum
}

/**
 * 用户数据
 */
export interface userFace {
  /**
   * 是否登录
   */
  hasLogin: boolean
  /**
   * 登录 `token`
   */
  token: string
}

/**
 * 阅读器接口
 */
export interface readerFace {
  /**
   * 当前数据
   */
  currentData: shareComicFace | null
  /**
   * 当前 `id` 可用来做索引判断
   */
  current_id: string | number
}

export default interface RootState {
  comic: comicInterface,
  settings: settingsFace,
  reader: readerFace
}