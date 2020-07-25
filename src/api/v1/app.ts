import { githubReleaseProfile } from "@/config/profile"
import { get } from '@/utils/axios'
import { version } from '@/config'

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
  const api = `https://api.github.com/repos/${ u }/${ r }/releases`
  return api
}

/**
 * 获取`app`最新版本
 */
export const getAppUpdate = async (): Promise<githubReleaseResultCat>=> {
  try {
    const api = createRelasesApi()
    const data: githubReleaseItemInterface[] = await get(api)
    const lastData = data[0]
    const lastVersionCode = lastData.tag_name
    const lastBody = lastData.body
    console.log(lastBody)
    let code: githubReleaseStatus
    if (lastVersionCode == version) {
      code = githubReleaseStatus.last
    } else {
      code = githubReleaseStatus.old
    }
    const R: githubReleaseResultCat = {
      code
    }
    if (code == githubReleaseStatus.old) R.body = lastBody
    return R
  } catch (error) {
    console.error(error)
    return {
      code: githubReleaseStatus.unknown
    }
  }
}