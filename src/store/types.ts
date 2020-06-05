// 漫画接口
export interface comicInterface {
  history_visit: any[]
  collect: any[]
}

export default interface RootState {
  comic: comicInterface
}