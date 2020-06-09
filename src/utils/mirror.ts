// 镜像站

import { io } from "./fs"
import { mirror_default_key } from '@/const'

const main = `18comic`

// 合成
const fusionDomain = (ext: string): string=> `https://${ main }.${ ext }`

export const setMirror = (ext: string = mirror_default_key) => {
  return io.setMirror(ext)
}

export const getMirror = (): string=> {
  const ext = io.getMirror()
  const fullapi = fusionDomain(ext)
  return fullapi
}