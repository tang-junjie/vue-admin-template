// 常量模块自动化导入导出

const requireConstants = require.context(
  // 当前目录
  '.',
  // 是否查询其子目录
  false,
  // 匹配常量模块文件名的正则表达式
  /\.\/(?!index).*\.js$/
)

const constants = {}

// 自动导入
requireConstants.keys().forEach(fileName => {
  // 获取模块对象
  const constant = requireConstants(fileName)
  // 通过路径获取模块名
  const constantName = fileName
    .split('/')
    .pop()
    .split('.')
    .shift()

  constants[constantName] = constant.default || constant
})

export default constants
