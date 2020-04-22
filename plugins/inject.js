/**
 * 模块全局注入
 * https://zh.nuxtjs.org/guide/plugins/#%E5%90%8C%E6%97%B6%E6%B3%A8%E5%85%A5
 */

import moment from 'moment'
import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import constants from '@/assets/js/constants'
import * as ConfigEnv from '@/assets/js/config/env'
import * as UtilsMisc from '@/assets/js/utils/misc'
import * as UtilsValidate from '@/assets/js/utils/validate'
import { permissionCheckGenerator } from '@/assets/js/permission'

storage.addPlugin(expirePlugin)

const configs = {
  ...ConfigEnv
}

const utils = {
  moment,
  storage,
  ...UtilsMisc,
  ...UtilsValidate
}

export default (context, inject) => {
  inject('utils', utils)
  inject('configs', configs)
  inject('constants', constants)
  inject('checkPermission', permissionCheckGenerator(context))
}
