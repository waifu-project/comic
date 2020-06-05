// post 默认请求体
export interface postBodyFace {
  url: string
  data: any
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