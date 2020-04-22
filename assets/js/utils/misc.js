import moment from 'moment'

/**
 * 安全地获取嵌套对象的属性
 * 特别注意：为了简化判断流程，undefined 和 null 均返回 undefined
 * @param {object} target - 目标对象
 * @param {string} path - 属性路径
 * @param {any} defaultValue - 默认值
 * @return {any} 目标属性
 */
export function path(target, path, defaultValue) {
  // 判断是否为无值，即 undefined 或者 null
  const isNil = value => value === null || value === undefined
  const value = path
    .split('.')
    .reduce(
      (last, key) => (key && last && !isNil(last[key]) ? last[key] : undefined),
      target
    )

  return isNil(value) ? defaultValue : value
}

/**
 * 七牛图片尺寸缩放
 * @param {string} url - 七牛链接
 * @param {number} width - 设置宽
 * @param {number} height - 设置高
 * @return {string} 瘦身后的 url
 */
export const imageSlim = (url, width = 1920, height) => {
  // 不是七牛链接不瘦身
  if (!url || !url.includes('cdn.')) {
    return url
  }

  // 已经经过图片基础处理的不瘦身
  if (url.indexOf('imageView2') !== -1) {
    return url
  }

  // Data URL 不瘦身
  if (/^data:/.test(url)) {
    return url
  }

  // 判断参数追加方式
  if (url.indexOf('?') !== -1) {
    url = url + `&`
  } else {
    url = url + `?`
  }

  // 设置宽
  if (width && !height) {
    return url + `imageView2/2/w/${width}`
  }
  // 设置高
  if (!width && height) {
    return url + `imageView2/2/h/${height}`
  }
  // 设置宽高
  if (width && height) {
    return url + `imageView2/2/w/${width}/h/${height}`
  }
}

/**
 * 函数去抖
 * @param {function} fn - 需要去抖的函数
 * @param {number} delay - 延迟时间，单位：ms
 * @return {function} 封装后的去抖函数
 */
export function debounce(fn, delay = 500) {
  // 定时器
  let timer

  return function() {
    // 保存函数调用时的上下文和参数，用于传递给 fn
    const context = this
    const args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 函数节流
 * @param {function} fn - 需要节流的函数
 * @param {number} threshold - 执行间隔阈值，单位：ms
 * @return {function} 封装后的节流函数
 */
export function throttle(fn, threshold = 500) {
  // 定时器
  let timer
  // 记录上次执行的时间
  let last = +new Date()

  return function() {
    // 保存函数调用时的上下文和参数，用于传递给 fn
    const context = this
    const args = arguments
    // 记录函数的调用时间
    const now = +new Date()
    clearTimeout(timer)

    // 如果距离上次执行 fn 函数的时间小于 threshold，那么就放弃执行 fn，并重新计时
    if (now - last < threshold) {
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(() => {
        last = now
        fn.apply(context, args)
      }, threshold)
    } else {
      // 在大于指定时间阈值后执行一次 fn
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * 以 JSON 序列化方式克隆对象，注意 Function 和 Error 对象不能被克隆
 * @param {object} obj - 需要被克隆的对象
 * @return {object} 克隆后的新对象
 */
export function clonePlainObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 生成随机字符串
 * @param {boolean} numberOnly - 是否只生成纯数字
 * @param {boolean} randomLength - 是否任意长度，为 true 则生成长度区间为 [min, max] 的字符串，否则生成以 min 为固定长度的字符串
 * @param {number} min - 任意长度最小位（固定长度）
 * @param {number} max - 任意长度最大位
 * @return {string} 随机字符串
 */
export const randomString = (
  numberOnly = true,
  randomLength = true,
  min = 10,
  max = 16
) => {
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ...(!numberOnly
      ? [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ]
      : [])
  ]

  let str = ''
  let pos = ''
  let range = min

  // 随机产生
  if (randomLength) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

/**
 * 低阶组件 props 合成
 * @param {object} sourceComponent - 低阶组件的 props
 * @param {object} currentInstance - 延迟时间，单位：ms
 * @param {boolean} isDeniedOuterProps - 是否阻止外部传进来的同名 prop
 * @return {object} 合并好的 props 集合
 */
export function propsMerge(
  sourceProps,
  currentInstance,
  isDeniedOuterProps = true
) {
  const props = {}
  /**
   * 获取当前组件实例 data 的所有属性名
   * 注意，所有要传到低阶组件的属性都要以 local 开头，并写在高阶组件实例的 data 上
   * 放在 data 里是为了降低与实例上其他字段重名的概率
   */
  const dataKeys = Object.keys(currentInstance.$data)

  Object.keys(sourceProps).forEach(key => {
    // 合成与低阶组件的 props 里以 `local` 开头的且同名的属性名
    const localDataKey = `local${key
      .substring(0, 1)
      .toUpperCase()}${key.substring(1)}`

    if (dataKeys.includes(localDataKey)) {
      props[key] = currentInstance[localDataKey]

      // 当为 true 时可以避免当前组件实例里定义的属性被外面传进来的 props 覆盖
      if (isDeniedOuterProps) {
        return
      }
    }

    /**
     * 因为组件挂载后 props 上所有属性都会自动地被挂载到当前组件实例下，所以可以通过
     * 当前组件实例来获取外部传进来的所有与 a-upload 的 props 同名的属性，并加入准
     * 备传入 a-upload 的 props 集合中
     */
    if (currentInstance[key] !== undefined) {
      props[key] = currentInstance[key]
    }
  })

  return props
}

/**
 * 格式化化 moment 对象
 * @param {object} momentObj - moment 实例对象
 * @return {string} 格式化后的字符串
 */
export function stringifyMoment(momentObj) {
  return momentObj instanceof moment
    ? momentObj.format('YYYY-MM-DD HH:mm:ss')
    : ''
}

/**
 * 解决使用 moment.js 格式化本地时间戳时多出了 8 小时问题，这 8 小时是本地时间与格林威治标准时间 (GMT) 的时差
 * 例如：moment(5 * 60 * 1000)，将 5 分钟的本地时间戳转为日期，结果会多出 8 小时，就是解决此问题
 * @param {Number} time 本地时间戳
 */
export const fixTimezoneOffset = time => {
  const date = new Date(time)

  // 当前时间 = 包含时差的当前时间 + 时差时间，getTimezoneOffset() 获取时差（以分钟为单位），转为小时需要除以 60
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60)

  return date.getTime()
}
