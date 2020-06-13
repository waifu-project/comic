// 镜像站

import { io } from "./fs"
import { mirror_default_key } from '@/const/key'

const main = `18comic`

// 合成
const fusionDomain = (ext: string): string=> `https://${ main }.${ ext }`

export const setMirror = (ext: string = mirror_default_key) => {
  return io.setMirror(ext)
}

export const getMirror = (): string=> {
  // flag: 临时改变为对象
  const cpp = io.getMirror()
  const fullapi = fusionDomain(cpp.value)
  return fullapi
}