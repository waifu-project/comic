/**
 * 搜索时间
 */
export enum searchOptionTimeEnum {
  /**
   * 全部
   */
  all = 'a',
  /**
   * 今天
   */
  today = 't',
  /**
   * 这周
   */
  week = 'w',
  /**
   * 这月
   */
  month = 'm'
}

/**
 * 搜索类型
 */
export enum searchOptionTypeEnum {
  /**
   * 最新
   */
  new = 'mr',
  /**
   * 最多点阅的
   */
  mostViewed = 'mv',
  /**
   * 最多图片
   */
  mostPictures = 'mp',
  /**
   * 最多点赞
   */
  mostLiked = 'tf'
}