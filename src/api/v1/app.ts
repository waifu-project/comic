import mdjs from 'marked'
import { githubReleaseProfile } from "@/config/profile"
import { get } from '@/utils/axios'
import { version } from '@/config'
import cheerio from 'cheerio'
import { updateWebviewID } from '@/const/key'

/**
 * 单个 `github-release`
 */
export interface githubReleaseItemInterface {
  /**
   * `tag-name` 用来判断版本号
   */
  tag_name: string
  /**
   * 标题(名称)
   */
  name: string
  /**
   * 说明(markdown)
   */
  body: string
  /**
   * 其他的 `key` - `value`
   */
  [propName: string]: any
}

/**
 * `github-release` 状态
 */
export enum githubReleaseStatus {
  /**
   * 已经是最新版本
   */
  last,
  /**
   * 旧版本
   */
  old,
  /**
   * 未知
   */
  unknown
}

/**
 * `github-release` 返回的结果
 */
export interface githubReleaseResultCat {
  /**
   * 状态
   */
  code: githubReleaseStatus
  /**
   * 内容
   */
  body?: string
}

/**
 * 创建 `release-api`
 */
const createRelasesApi = (user?: string, repo?: string): string=> {
  const runGithub = Object.values(githubReleaseProfile)
  let [ u, r ] = runGithub
  if (user) u = user
  if (repo) r = repo
  const api = `https://api.github.com/repos/${ u }/${ r }/releases/latest`
  return api
}

/**
 * 获取`app`最新版本
 */
export const getAppUpdate = async (): Promise<githubReleaseResultCat>=> {
  try {
    const api = createRelasesApi()
    const data: githubReleaseItemInterface = await get(api)
    const lastVersionCode = data.tag_name
    const lastBody = data.body
    const ctx = mdjs(lastBody)
    const jquery = cheerio.load(`<div class="markdown-body"></div>`)
    const closeText = `关闭`
    const closeID = `close-action`
    jquery('head').append(`<meta content="width=device-width, initial-scale=1" name="viewport">`)
    jquery('head').append(`
    <style type="text/css">
    .markdown-body {
      padding: 24px 4px 4px;
    }
    </style>
    `)
    jquery('.markdown-body').append(ctx)
    jquery('body').append(`
      <div style="text-align: center">
        <button style="
        position: relative;
        display: inline-block;
        padding: 5px 80px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid;
        border-radius: 6px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;" id="${ closeID }">${ closeText }</button>
      </div>
    `)
    jquery('body').append(`<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script>`)
    jquery('body').append(`
    <script type="text/javascript">
			document.addEventListener('UniAppJSBridgeReady', function() {
        let links = Array.from(document.querySelectorAll('a'))
        links.forEach(item=> {
          item.addEventListener('click', function(e) {
            try {
              const link = this.href
              plus.runtime.openURL(link)
              e.stopPropagation()
              e.preventDefault()
              return false
            } catch (error) {
              alert(error)
              throw new Error(error)
            }
          })
        })
        try {
          let closeEle = document.getElementById("${ closeID }")
          closeEle.addEventListener('click', ()=> {
            const current = plus.webview.getWebviewById("${ updateWebviewID }")
            current.close()
          })
        } catch (error) {
          throw new Error(error)          
        }
			});
		</script>

    `)
    const body = jquery.html()
    let code: githubReleaseStatus
    if (lastVersionCode == version) {
      code = githubReleaseStatus.last
    } else {
      code = githubReleaseStatus.old
    }
    const R: githubReleaseResultCat = {
      code
    }
    if (code == githubReleaseStatus.old) R.body = body
    return R
  } catch (error) {
    return {
      code: githubReleaseStatus.unknown
    }
  }
}