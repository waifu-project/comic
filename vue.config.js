const path = require('path')
const fs = require('fs')

const resolve = _p => path.join(__dirname, _p)

const package = require('./package.json')

const README = fs.readFileSync('./README.md', {
  encoding: 'utf-8',
})

// TODO 将 `version` 注入到 `process.env` 中
module.exports = {
  chainWebpack: config=> {
    config.resolve.alias.set('_p', resolve('components'))
    config.plugin('define').tap(args => {
      let version = package.version
      args[0]['VERSION'] = JSON.stringify(version)
      args[0]['README'] = JSON.stringify(README)
      return args
    })
    return config
  }
}