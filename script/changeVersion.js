/**
 * 参考: https://github. com/long-hai-yang/change-version/blob/master/index.js
 * create by d1y<chenhonzhou@gmail.com>
 */
const fs = require('fs')
const path = require('path')

const localFile = require('../package.json')

const versionWord = `versionCode`

/**
 * 获取标签
 */
const getTag = ()=> {
  const arr = process.argv
  if (arr.length < 3) {
    console.log('请传递参数..')
    proces.exit(3)
  }
  return arr[2]
}

/**
 * 修改版本号
 */
const changeVersion = (version)=> {
  localFile[versionWord] = version
}

/**
 * 将拿到的`json`转为字符串
 */
const version2string = (str)=> {
  try {
    const r = JSON.stringify(str, null, 2)
    return r
  } catch (error) {
    console.error(error)
    process.exit(2)
  }
  
}

/**
 * 写入文件
 */
const writePackageFile = (str)=> {
  const dir = process.cwd()
  const writeFile = path.join(dir, '../package.json')
  console.log('write file: ', writeFile)
  fs.writeFileSync(writeFile, str)
  console.log('write file is success')
}

;(async ()=> {
  const tag = getTag()
  changeVersion(tag)
  const filestr = version2string(localFile)
  writePackageFile(filestr)
})()