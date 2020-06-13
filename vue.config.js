const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const resolve = _p => path.join(__dirname, _p)

/**
 * 拿到 `pages.json` 参考: https://www.npmjs.com/package/uni-vue-router
 * @returns {string}
 */
const readPagesJSON = () => {
  const jsonFilePath = resolve('./src/pages.json')
  if (!fs.existsSync(jsonFilePath)) {
    throw new Error(jsonFilePath + ' 不存在')
  }
  return fs.readFileSync(jsonFilePath, 'utf8')
}

/**
 * 读取 `package.json` 文件
 */
const readPackageJson = () => {
  return fs.readFileSync(resolve('./package.json'), 'utf-8')
}

const FAQ = fs.readFileSync(resolve('./FAQ.md'), 'utf-8')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        PAGES_JSON: JSON.stringify(readPagesJSON()),
        PACKAGES_JSON: JSON.stringify(readPackageJson()),
        FAQ: JSON.stringify({
          ctx: FAQ,
          dev: false
        })
      })
    ]
  }
}