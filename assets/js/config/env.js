let _isProd = false // 是否为线上正服

if (process.env.NODE_ENV === 'development') {
  // 本地环境
} else if (window.location.hostname.includes('dev-')) {
  // 测服环境
} else {
  // 正服环境
  _isProd = true
}

// 是否为线上正服
export const isProd = _isProd
