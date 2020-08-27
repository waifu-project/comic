import { colorItemInterface } from './tool';
import { readerPageNumberEnum } from './enum';

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
  bg?: colorItemInterface
}

/**
 * 主题
 */
export interface themeInterface {
  /**
   * 标题
   */
  title: string
  /**
   * 几列, 默认是 `3` 列
   */
  col: number
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
   * TODO
   * 该id是否存在
   */
  isExist?: boolean
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
  /**
   * 历史阅读的时间
   */
  reader_time?: number | string | Date
  /**
   * 历史阅读生成的时间
   */
  reader_time_text?: string
}

/**
 * 留言话题接口
 */
export interface topicResponseInterface {
  /**
   * 总数
   */
  count: number | string
  /**
   * 消息体
   */
  message: string[] // topicResponseMessageInterface[]
  /**
   * 消息
   */
  msg: string
  /**
   * 回复消息
   */
  reply_message: string
}

/**
 * 留言话题返回的数据类型
 */
export interface topicItemInterface {
  /**
   * 头像
   */
  avatar: string
  /**
   * 内容
   */
  content: string
  /**
   * 时间
   */
  date: string
  /**
   * 作品id
   */
  id: string
  /**
   * 点赞数
   */
  like_count: string | number
  /**
   * 昵称
   */
  nickname: string
  /**
   * 作品的标题
   */
  title: string
}

/**
 * 阅读器当前类型
 */
export interface readerItemInterface {
  /**
   * 当前页数类型
   */
  pageType: readerPageNumberEnum
  /**
   * 下一话(500页限制)
   */
  nextPage: number | string | null
  /**
   * 上一话(500页限制)
   */
  prevPage: number | string | null
  /**
   * 当前 `page`
   */
  currPage: number | string | null
  /**
   * 图片
   */
  pics: string[]
}