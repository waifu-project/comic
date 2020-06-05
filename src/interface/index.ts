import { colorItemInterface } from './tool';

/**
 * 首页 `modal`
 */
export interface shareIndexModal {
  /**
   * 标题
   */
  title: string
  /**
   * html标签
   */
  body: string
}

/**
 * 首页数据
 */
export interface shareIndexData {
  modal: shareIndexModal
  lists: shareIndexComicData[]
}

/**
 * `card` 用到的数据
 */
export  interface shareIndexComicData {
  /**
   * 标题
   */
  title: string
  /**
   * 列表
   */
  lists: shareComicFace[]
}

/**
 * 主题列表 `item`
 */
export interface themeListInterface {
  /**
   * 搜索的 `url`
   */
  url: string
  /**
   * 标题文本
   */
  text: string
  /**
   * 背景颜色
   */
  bg: colorItemInterface
}

/**
 * 主题
 */
export interface themeInterface {
  /**
   * 标题
   */
  title: string
  lists: themeListInterface[]
}

export interface episodeInterface {
  id: string | number
  /**
   * eq
   */
  ep: string
  /**
   * ep标题
   */
  ep_title: string
  /**
   * ep时间
   */
  ep_date: string
}

/**
 * 漫画公共的接口
 */
export interface shareComicFace {
  /**
   * 设备id
   */
  id: string | number
  /**
   * 封面
   */
  cover: string
  /**
   * 标题
   */
  title: string
  /**
   * 标签
   */
  tags: string[]
  /**
   * 作者
   */
  authors: string[]
  /**
   * 介绍
   */
  desc?: string
  /**
   * 页数
   */
  page_count?: string | number
  /**
   * 点赞数
   */
  like_count?: string | number
  /**
   * 类型(汉化 | 日文)
   */
  sub_text?: string
  /**
   * 创建时间
   */
  date?: string
  /**
   * 浏览量
   */
  review?: number | string
  /**
   * 评论数
   */
  comment_count?: number | string
  /**
   * 预览图片, 数组
   */
  previews?: string[]
  /**
   * 选集
   */
  episode?: episodeInterface[]
  /**
   * 推荐
   */
  recommends?: shareComicFace[]
}