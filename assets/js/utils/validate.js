/**
 * 常用正则校验集合
 */

const validateRule = {
  // 密码校验：允许 6-16 位，且只能包含字母、数字和特殊字符 @#%&
  password: /^[A-Za-z0-9@#%&*]{6,16}$/
}

/**
 * 校验器结果工厂
 * @param {string} str - 待校验字符串
 * @param {number} ruleName - 校验规则，取自上方的 validateRule
 * @return {bool} 返回校验结果
 */
export function validator(str, ruleName) {
  const validator = validateRule[ruleName]

  if (typeof validator === 'function') {
    // 如果是非正则对象的校验器
    return validator(str)
  } else if (typeof validator === 'object') {
    // 如果是正则类型的校验器
    return validator.test(str)
  }
}
