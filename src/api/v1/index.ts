import { get, post } from '@/utils/axios'
import cherrio from 'cheerio'
import { str2Data, str2Modal, detail2Data, comicPic2Data, comicTheme2Data, topicJSON2Data } from '@/utils/share'
import { shareIndexComicData, shareIndexData, themeListInterface, shareComicFace, topicResponseInterface, topicItemInterface } from '@/interface'
import { createRandomColor } from '@/utils'
import { searchOptions, searchResponseInterface } from '@/interface/tool'
import querystring from '@/utils/qs'

// 点赞某作品
export const loveVoteAlbum = (album_id: string | number)=> {
  album_id = album_id.toString()
  post({
    url: `/ajax/vote_album`,
    data: {
      album_id,
      vote: `likes`
    }
  })
}

// 获取某作品详情
export const getDetail = async (id: string | number): Promise<shareComicFace>=> {
  try {
    const data = await get(`/album/${ id }`)
    return detail2Data(data)
  } catch (error) {
    throw new Error(error)
  }
}

// 获取某作品的所有图片
export const getComicPic = async (id: number | string): Promise<any>=> {
  try {
    const data = await get(`/photo/${ id }`)
    return comicPic2Data(data)
  } catch (error) {
    throw new Error(error)
  }
}

// 获取所有主题
export const getTheme = async ()=> {
  try {
    const data = await get('/theme')
    return comicTheme2Data(data)
  } catch (error) {
    throw new Error(error)
  }
}

// 获取热门主题
export const getPopularThemes = async ()=> {
  try {
    const data = await get('/')
    const $ = cherrio.load(data)
    const arr = $('.col-lg-2.col-md-3.cloud.hidden-xs.hidden-sm a')
    const lists: themeListInterface[] = Array.from(arr).map(item=> {
      const ele = cherrio(item)
      const api = ele.attr('href') || ""
      const text = ele.text().trim()
      const bg = createRandomColor()
      const obj: themeListInterface = {
        url: api,
        text,
        bg
      }
      return obj
    })
    return lists
  } catch (error) {
    throw new Error(error)
  }
}

// 获取首页数据
export const getIndexData = async (): Promise<shareIndexData>=>{
  try {
    const data = await get('/')
    const $ = cherrio.load(data)
    const modal = str2Modal($)
    let cards = $('.row.col-lg-10.col-md-9')
    let lists: shareIndexComicData[] = Array.from(cards).map(item=> {
      let obj: shareIndexComicData = {
        title: '',
        lists: []
      }
      obj.title = $(item).find('h4').text().trim()
      let cItem = $(item).find('.well.well-sm')
      let lists = Array.from(cItem).map(item=> str2Data(item))
      obj.lists = lists
      return obj
    })
    const result: shareIndexData = {
      modal,
      lists
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

// 节点转为`text`
const node2text = (x: any): string => cherrio(x).text().trim()

// 搜索
export const getSearch = async (qs: string, options: searchOptions): Promise<searchResponseInterface>=> new Promise(async res=>{
  let result: shareComicFace[] = []
  let search_key = ''
  let current_page = options.page
  let total_page = 1
  let total = ''
  let isNext = false
  try {
    const api = querystring.mergeQueryString(qs, options)
    const data = await get(api)
    const $ = cherrio.load(data)
    const qsEle = cherrio($('.col-xs-12.col-md-9.col-sm-8 .well.well-sm')[0])
    const eles = qsEle.find('span.text-white')
    search_key = node2text(eles[0])
    // total_page = +node2text(eles[2])
    const selectEles = $('.col-xs-12.col-md-9.col-sm-8 .visible-xs .pagination.pagination-lg li select').parent()
    const temp_curr = +selectEles.find('select option[selected]').text().trim() 
    const temp_last = +selectEles.find('select').children().last().text().trim()
    if (temp_curr) current_page = temp_curr
    if (temp_last) total_page = temp_last
    if (current_page == total_page) isNext = false
    if (current_page < total_page) isNext = true
    total = node2text(eles[3])
    const lists = $('.col-xs-6.col-sm-6.col-md-4.col-lg-3.list-col')
    result = Array.from(lists).map(item=> str2Data(item))
  } catch (error) {
    console.error(error)
  }
  res({
    isNext,
    search_key,
    current_page,
    total_page,
    total,
    lists: result
  })
})

/**
 * 获取留言区内容
 */
export const getForumMore = async (count: number | string = 10): Promise<topicItemInterface[]>=> {
  try {
    const data: topicResponseInterface = await post({
      url: '/ajax/forum_more',
      data: {
        btn_more: `btn_more`,
        search: '',
        count,
        aid: '',
      },
      contentType: 'form'
    })
    const { message } = data
    const result = message.map(item=> topicJSON2Data(item))
    // debugger
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}