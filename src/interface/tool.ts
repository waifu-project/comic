import { searchOptionTimeEnum, searchOptionTypeEnum } from './enum'
import { searchOptionTimeType, searchOptionsTypeByType } from './types'
import { shareComicFace } from '.'
import csstype from 'csstype'

// post 默认请求体
export interface postBodyFace {
  url: string
  data: any
  contentType?: string
}

/**
 * 颜色单个主题接口
 */
export interface colorItemInterface {
  /**
   * 标题
   */
  title: string
  /**
   * 名称
   * bg-${ name }
   */
  name: string
  /**
   * 颜色值, hex
   */
  color: string
}

/**
 * 搜索参数
 */
export interface searchOptions {
  /**
   * 搜索页数, 默认为 `1`
   */
  page: number
  /**
   * 搜索时间
   */
  t: searchOptionTimeEnum | searchOptionTimeType
  /**
   * 类型
   */
  o: searchOptionTypeEnum | searchOptionsTypeByType
}

/**
 * 搜索接口返回数据
 */
export interface searchResponseInterface {
  /**
   * 搜索的文字
   */
  search_key: string
  /**
   * 当前页数
   */
  current_page: string | number
  /**
   * 所有页数
   */
  total_page: string | number
  /**
   * 是否有下一页
   */
  isNext: boolean
  /**
   * 漫画总数
   */
  total: string | number
  /**
   * 列表
   */
  lists: shareComicFace[]
}

/**
 * 单个主题菜单列表
 */
export interface themeMenuItemInterface {
  /**
   * 标题
   */
  title: string
  /**
   * 跳转链接
   */
  link: string
  /**
   * 唯一的 `key`
   */
  key: string
  /**
   * 背景图片
   */
  bg?: string
}

export interface devInsDataPageItemInterface {
  /**
   * 路径
   */
  path: string
  /**
   * TODO 样式
   */
  style: any
  /**
   * 介绍, 说明
   */
  description: string
}

/**
 * 注入的 `page.json` 文件接口类型
 * TODO: uniapp里应该有接口类型的
 */
export interface devInsDataInterface {
  pages: devInsDataPageItemInterface[]
}

/**
 * 引导页接口类型
 */
export interface guideDataItemInterface {
  /**
   * 标题
   */
  title: string
  /**
   * 内容
   */
  content: string
  /**
   * 图片
   */
  img?: string
  /**
   * 标题背景颜色, 颜色值参考 colorui
   */
  titleBg?: string
  /**
   * 是否全屏
   */
  isFull?: boolean
  /**
   * 样式
   */
  style?: csstype.Properties
  /**
   * 是否结束
   */
  isEnd?: boolean
}

/**
 * 镜像站接口类型
 */
export interface mirrorItemInterface {
  /**
   * 标题
   */
  title: string
  /**
   * 域名后缀
   */
  ext: string
  /**
   * 完整的 `url`
   */
  full_url: string
}