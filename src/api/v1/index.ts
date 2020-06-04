import { get, _post } from '@/utils/axios'
import cherrio from 'cheerio'
import { str2Data, str2Modal, detail2Data, comicPic2Data, comicTheme2Data } from '@/utils/share'
import { shareIndexComicData, shareIndexData } from '@/interface'
import { isDev } from '@/config'
import { createRandomColor } from '@/utils'

// 点赞某作品
export const loveVoteAlbum = (album_id: string | number)=> {
  album_id = album_id.toString()
  _post({
    url: `/ajax/vote_album`,
    data: {
      album_id,
      vote: `likes`
    }
  })
}

// 获取某作品详情
export const getDetail = async (id: string | number): Promise<any>=> {
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
    const lists = Array.from(arr).map(item=> {
      const ele = cherrio(item)
      const api = ele.attr('href')
      const text = ele.text().trim()
      const bg = `bg-${ createRandomColor().name }`
      return {
        api,
        text,
        bg
      }
    })
    return lists
  } catch (error) {
    throw new Error(error)
  }
}

// 获取首页数据
export const getIndexData = async (): Promise<shareIndexData>=>{
  try {
    let devUrl = `http://192.168.1.190:8081`
    let nowUrl = (isDev && true) ? devUrl : `/`
    const data = await get(nowUrl)
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