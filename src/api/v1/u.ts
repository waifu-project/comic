import { get } from '@/utils/axios'
import cheerio from 'cheerio'
import { createMirrorStaticFile } from '@/utils/mirror'

const profile2Number = (ele: Cheerio): number=> {
  let _n = ele.find('span').text().trim()
  let _result = Number.parseInt(_n)
  if (isNaN(_result)) {
    if (_n == '男') return 1
    if (_n == '女') return 0
  }
  return _result
}

/**
 * 获取用户信息
 */
export const getUserProfile = async ()=> {
  try {
    const data = await get(`/user`)
    const $ = cheerio.load(data)
    const bodyWrapper = $('.panel-body')
    let img = bodyWrapper.find('img').attr('src') || ""
    img = createMirrorStaticFile(img)
    const profileList = Array.from(bodyWrapper.find('li'))

    // 人气
    let popularity: number = 0
    
    // 活动
    let activity: number = 0

    // 性别
    let gender: number = 1 // 1 男 0 女

    // 加入时间
    let joinTime: number = 0

    profileList.forEach((item, index)=> {
      const ele = $(item)
      const result = profile2Number(ele)
      switch (index) {
        case 0:
          // 人气
          popularity = result
          break;

        case 1:
          // 活动
          activity = result
          break;

        case 2:
          // 性别
          gender = result
          break;

        case 3:
          // 加入时间
          joinTime = result
          break;
      }
    })
    const x = {
      avatar: img,
      popularity,
      activity,
      gender,
      joinTime
    }
    return x
  } catch (error) {
    throw new Error(error)
  }
}