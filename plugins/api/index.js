// 先按照 common.js 中的规范写好的模块 API 后再统一自动引入

export default ({ $axios }, inject) => {
  const api = {}

  const requireApiModules = require.context(
    // 当前目录
    '.',
    // 是否查询其子目录
    false,
    // 匹配 API 模块文件名的正则表达式
    /\.\/(?!index).*\.js$/
  )

  // 自动导入
  requireApiModules.keys().forEach(fileName => {
    // 获取模块对象
    const module = requireApiModules(fileName)
    // 通过路径获取模块名
    const moduleName = fileName
      .split('/')
      .pop()
      .split('.')
      .shift()

    api[moduleName] = (module.default || module)($axios)
  })

  inject('api', api)
}
