import { shareComicFace } from '@/interface';

interface searchDataInterface {
  /**
   * `title-bar` 文字
   */
  barTitle: string
  /**
   * 搜索的接口
   */
  url: string
  /**
   * 页数
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

// 漫画接口
export interface comicInterface {
  /**
   * 搜索数据
   */
  searchData: searchDataInterface
  /**
   * 历史观看
   */
  history_aviews: shareComicFace[]
  /**
   * 收藏
   */
  collect_lists: shareComicFace[]
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
}

export default interface RootState {
  comic: comicInterface
}