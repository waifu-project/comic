import url from 'url-parse'
import cherrio from 'cheerio'
import { shareComicFace, shareIndexModal } from '@/interface'
import fs from './fs'
import { createRandomColor } from '.'

const hpjs = require('@/plugins/html_parse')

export const comicTheme2Data = (str: string)=> {
  const $ = cherrio.load(str)
  const lists = Array.from($('#wrapper .row')).filter(item=> {
    let checkH4 = cherrio(item).find('h4').length
    let checkListLife = cherrio(item).find('.list-unstyled').length
    return (checkH4 && !checkListLife)
  })
  const obj = lists.map(item=> {
    const now = cherrio(item)
    const title = now.find('h4').text().trim()
    const lists = Array.from(now.find('a')).map(subItem=> {
      const ele = cherrio(subItem)
      let url =  ele.attr('href')
      let text = ele.text().trim()
      let bg = createRandomColor()
      if (bg.name == 'white') bg = createRandomColor()
      return {
        url,
        text,
        bg
      }
    })
    return {
      title,
      lists
    }
  })
  return obj
}

export const comicPic2Data = (str: string)=> {
  const $ = cherrio.load(str)
  let R = $('#wrapper .row .panel.panel-default .panel-body .row div[id]')
  const r = Array.from(R).filter(item=> {
    let id = cherrio(item).attr('id')
    if (id?.endsWith('.jpg')) return item
  })
  const Rx = r.map(item=> {
    const ele = cherrio(item).find('img[data-page]')
    return pxComicImg(ele)
  })
  return Rx
}

export const detail2Data = (str: string)=> {
  const $ = cherrio.load(str)
  const id = $('#album_id').val()
  const title = $('.panel-heading .pull-left').text().trim()
  const coverBox = $('#album_photo_cover.col-lg-5')
  let previews: string[] = [], cover: string = ''
  const tempImgs = coverBox.find('img')
  Array.from(tempImgs).forEach(item=> {
    const ele = cherrio(item)
    const result = pxComicImg(ele)
    if (!result) return
    if (!ele.attr('data-page')) {
      cover = result
    } else {
      previews.push(result)
    }
  })
  let tags: string[] = []
  let authors: string[] = []
  let desc: string = ''
  let page_count: string | number = 0
  let date: string | number | Date = ''
  let review: string | number = 0
  let like_count: string | number = 0
  let comment_count: string | number = 0
  Array.from($('.col-lg-7 .tag-block')).forEach(item=> {
    let span = cherrio(item).find('span')
    let flag = span.attr('itemprop')
    const __lists = Array.from(span.children('a')).map(__item=> {
      return $(__item).text().trim()
    })
    // 标签
    if (flag == 'genre') tags = __lists
    const currentItemText = $(item).text()
    if (currentItemText.search('作者') >= 0) {
      authors = __lists
    }
  })
  let dataInfo = $('.col-lg-7 .p-t-5.p-b-5')
  desc = cherrio(dataInfo[0]).text().trim()
  if (desc.startsWith('叙述：')) desc = desc.substring(3)
  page_count = cherrio(dataInfo[1]).text().trim()
  if (page_count.startsWith('页数：')) page_count = page_count.substring(3)
  let tempMoreInfo = cherrio(dataInfo[2])
  date = tempMoreInfo.children('span[content]').attr('content') || ""
  review = Number.parseInt(tempMoreInfo.children('span[itemscope]').text().trim())
  like_count = tempMoreInfo.find('.p-t-5.p-b-5').text().trim()
  comment_count = $('.forum-open.btn.btn-primary.dropdown-toggle span').text().trim()

  const episode: any[] = Array.from($('.episode ul a')).map(item=> {
    const id = getCoverItemID($(item).attr('href'))
    const temp = cherrio(item).text().trim().split(' ').filter(subItem=> {
      if (subItem) {
        if (subItem.endsWith('\n')) subItem = subItem.slice(0, -1)
        return subItem
      }
    })
    return {
      id,
      ep: temp[0],
      ep_title: temp[1],
      ep_date: temp[2]
    }
  })

  const recommends = Array.from($('.col-xs-6.col-sm-4.col-md-3.col-lg-2.list-col')).map(item=> {
    return str2Data(item)
  })

  return {
    id,
    title, // 标题
    cover, // 封面图
    tags, // 标签
    authors, // 作者
    desc, // 介绍
    page_count, // 页数
    date, // 创建时间
    review, // 浏览量
    like_count, // 点赞数
    comment_count, // 评论
    previews, // 预览
    episode, // 选集
    recommends, // 推荐
  }

}

export const str2Modal = ($: any): shareIndexModal => {
  const billboard = $('#billboard-modal')
  const title = billboard.find('.modal-title').text().trim()
  let body = billboard.find('.modal-body').html() || ""
  if (body) body = body.trim()
  const modal = {
    title,
    body
  }
  let html = cherrio.load(body, {
    xmlMode: true
  })
  let __src = html('img').attr('src') || ""
  html('img').attr('src', fs.Join(__src))
  let resultBody = `
  <h1 style="background: rgba(224, 57, 151, 0.76);color: #fff;font-size: 16px;word-break: keep-all;">${ title }</h1>
  ${ html.html() }
  `
  const b = hpjs(resultBody)
  modal.body = b
  return modal
}

export const str2Data = (ele: any): shareComicFace => {

  const cItem = cherrio(ele)
  let subItem = cItem.find('.thumb-overlay-albums')
  let itemIdStr = subItem.find('a').attr('href')
  let itemImgEle = subItem.find('img')
  let loveCountEle = subItem.find('.label-loveicon')
  let sub = subItem.find('.label-sub')

  let spEles = cItem.find('.title-truncate')
  const spEleLength = spEles.length
  let authorEle = spEles[1]
  let tagsEle = spEles[2]
  // TODO 详情页获取
  if (spEleLength == 2) {
    authorEle = spEles[0]
    tagsEle = spEles[1]
  }
  let tempTags = cherrio(tagsEle).find('a')

  let id = getCoverItemID(itemIdStr)
  let cover = pxComicImg(itemImgEle)

  // let cdr = $(item).children(), cdrLength = cdr.length
  // if (cdrLength === 2) {
  //   // 本周新書推薦 (✪ω✪)
  //   let titleEle = $(item).find('.row')[0]
  //   let titleText = $(titleEle).find('h4').text().trim()
  //   obj.title = titleText
  // } else if (cdrLength === 3) {
  //   // 最新上传A漫
  //   obj.title = $(item).find('h4').text().trim()
  // }

  let title = itemImgEle.attr('title') || ""

  // 点赞数
  let like_count = loveCountEle.text().trim()
  // 类型(汉化 | 日文)
  let sub_text = sub.text().trim()
  // 作者
  let author = cherrio(authorEle).find('a').text()
  // 标签
  let tags = Array.from(tempTags).map(item => {
    return cherrio(item).text()
  })

  let time: string = cItem.find('.video-views.pull-left').text().trim()
  if (new Date(time).toString() === 'Invalid Date') {
    const tempArr = time.split(' ').filter((item: any)=> {
      if (item) return item
    })
    time = tempArr.pop() || ""
    time = time.trim()
  }

  return {
    id,
    cover,
    title,
    like_count,
    sub_text,
    author,
    tags,
    time,
  }

}

// 获取 `url` 中的 `id`
export const getCoverItemID = (src: string | undefined): string => {
  if (!src) return "0"
  let ctx = new url(src)
  let arr = ctx.pathname.split('/')
  let trg = arr[2]
  // TODO 隐式判断一下是不是 `int`
  return trg
}

// 拿到正确的 `url`
export const pxComicImg = (ele: Cheerio): string=> {
  let x = ele.attr('src') || ""
  let y = ele.attr('data-original') || ""
  return y ? y : x
}