// 首页 `modal`
export interface shareIndexModal {
  title: string // 标题
  body: string // html标签
}

// 首页数据
export interface shareIndexData {
  modal: shareIndexModal
  lists: shareIndexComicData[]
}

export  interface shareIndexComicData {
  title: string // 标题
  lists: shareComicFace[] // 列表
}

// 漫画接口类型
export interface shareComicFace {
  id: string | number
  cover: string
  title: string
  like_count: string | number // 点赞数
  sub_text: string // 类型(汉化 | 日文)
  author: string // 作者
  tags: string[] // 标签
  time: string
}