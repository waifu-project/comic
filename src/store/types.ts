import { shareComicFace } from '@/interface';

interface searchDataInterface {
  url: string
  page: number
  total_page: number
  isNext: boolean
}

// 漫画接口
export interface comicInterface {
  searchData: searchDataInterface
  history_aviews: shareComicFace[]
  collect_lists: shareComicFace[]
}

export default interface RootState {
  comic: comicInterface
}