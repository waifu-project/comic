import { colorItemInterface, themeMenuItemInterface, devInsDataInterface } from '@/interface/tool'
import { createStaticByCDN } from '@/utils/map'

const injection = require('@/plugins/injection')

/**
 * 镜像默认的域名后缀
 */
export const mirror_default_key = 'one'

/**
 * 滤镜默认背景
 */
export let blur_default_url = "https://i.loli.net/2020/05/25/ynGRv1z5s7OCtw9.png"

blur_default_url = createStaticByCDN('resources/tiny_blur.png')

export let empty_default_url = "https://i.loli.net/2020/06/09/LnB24yeIwxs8p1g.png"

empty_default_url = createStaticByCDN('resources/empty.png')

/**
 * 主题默认列
 */
export const theme_default_col = 3

/**
 * 主题默认的最大文字(将会变为 `2` 列)
 */
export const theme_item_max_word = 8

/**
 * 设置里的开发者相关默认最大点击次数
 * 才会打开开发者相关功能
 */
export const settings_click_max_count = 8


/**
 * 默认背景
 */
export const bg_default_url = "http://www.dmoe.cc/random.php"

/**
 * 搜索界面数据为空时的文字
 */
export const search_empty_text = "没有数据哦"

/**
 * 主题搜索区 `placeholder`
 */
export const theme_search_main_placeholder = 'bilibili干杯🍻, 请搜索'

/**
 * goto id-input
 */
export const theme_search_goto_placeholder = '请输入id'

export const theme_search_goto_text = '如果你知道某个作品的id话....'

/**
 * 历史记录的最大长度
 */
export const history_views_max_length = 24

/**
 * 颜色列表
 */
export const colors: colorItemInterface[] = [
  {
    title: "嫣红",
    name: "red",
    color: "#e54d42"
  },
  {
    title: "桔橙",
    name: "orange",
    color: "#f37b1d"
  },
  {
    title: "明黄",
    name: "yellow",
    color: "#fbbd08"
  },
  {
    title: "橄榄",
    name: "olive",
    color: "#8dc63f"
  },
  {
    title: "森绿",
    name: "green",
    color: "#39b54a"
  },
  {
    title: "天青",
    name: "cyan",
    color: "#1cbbb4"
  },
  {
    title: "海蓝",
    name: "blue",
    color: "#0081ff"
  },
  {
    title: "姹紫",
    name: "purple",
    color: "#6739b6"
  },
  {
    title: "木槿",
    name: "mauve",
    color: "#9c26b0"
  },
  {
    title: "桃粉",
    name: "pink",
    color: "#e03997"
  },
  {
    title: "棕褐",
    name: "brown",
    color: "#a5673f"
  },
  {
    title: "玄灰",
    name: "grey",
    color: "#8799a3"
  },
  {
    title: "草灰",
    name: "gray",
    color: "#aaaaaa"
  },
  {
    title: "墨黑",
    name: "black",
    color: "#333333"
  },
  {
    title: "雅白",
    name: "white",
    color: "#ffffff"
  }
]

/**
 * 主题菜单
 */
export const theme_menus: themeMenuItemInterface[] = [
  {
    title: "GOTO",
    link: 'detail/index',
    key: 'goto',
  },
  {
    title: "留言板",
    link: 'topic/index',
    key: 'bbs',
  },
  {
    title: "涨姿势",
    link: 'blogs/index',
    key: 'blogs'
  },
  {
    title: '插件开发',
    link: 'webview/index',
    key: 'plugin_development'
  }
]

/**
 * 注入的 `pages.json` 文件
 */
export const devInsData: devInsDataInterface = injection.pagejson