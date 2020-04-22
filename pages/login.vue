<!-- 登录注册页 -->

<template>
  <div class="page-login">
    <a href="/" class="logo">
      <img :src="$store.state.env.oem.vice_logo" />
    </a>

    <div class="login-wrap">
      <div class="login-wrap__cover">
        <a-carousel autoplay>
          <img
            v-for="(item, index) in carouselList"
            :key="index"
            class="slide-image"
            :src="item"
          />
        </a-carousel>
      </div>

      <div class="login-wrap__panel">
        <a-tabs v-model="currentFormPanel" :tab-bar-style="{ display: 'none' }">
          <a-tab-pane key="login" tab="登录">
            <div class="panel-title">
              登录
            </div>

            <div class="panel-desc">
              无纸化赛事、活动一站式运营工具
            </div>

            <a-form :form="loginForm">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'mobile',
                    {
                      rules: [{ required: true, message: '请输入登录账号' }]
                    }
                  ]"
                  v-focus="'input#mobile'"
                  size="large"
                  placeholder="注册时填写的手机号"
                  @keyup.enter="onLoginFormSubmit"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    {
                      rules: [{ required: true, message: '请输入登录密码' }]
                    }
                  ]"
                  size="large"
                  type="password"
                  placeholder="请输入登录密码"
                  @keyup.enter="onLoginFormSubmit"
                >
                  <a-icon slot="prefix" type="lock" />
                </a-input>
              </a-form-item>

              <div class="login-option">
                <a-checkbox default-checked @click="onAutoLoginCheckboxChange">
                  自动登录
                </a-checkbox>
                <a href="javascript:;" @click="switchToForgetPasswordPanel">
                  忘记密码
                </a>
              </div>

              <a-form-item class="button-submit">
                <a-button
                  block
                  size="large"
                  type="primary"
                  :loading="isLogining"
                  @click="onLoginFormSubmit"
                >
                  登录
                </a-button>
              </a-form-item>

              <div class="login-functional">
                <a
                  class="tip"
                  href="javascript:;"
                  @click="switchToRegisterPanel"
                >
                  免费注册
                </a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a
                  class="tip"
                  href="javascript:;"
                  @click="isShowMoreLoginMethods = !isShowMoreLoginMethods"
                >
                  其他登录方式
                </a>
                <div
                  class="login-types"
                  :class="{ visible: isShowMoreLoginMethods }"
                >
                  <a-tooltip>
                    <template slot="title">
                      敬请期待
                    </template>
                    <a-icon type="wechat" />
                  </a-tooltip>
                </div>
              </div>
            </a-form>
          </a-tab-pane>

          <a-tab-pane key="register" tab="注册">
            <div class="panel-title">
              {{ isPasswordResetMode ? '找回密码' : '注册' }}
            </div>

            <div class="panel-desc">
              {{
                isPasswordResetMode
                  ? '密码忘记不用慌，短信验证响当当'
                  : '免费注册账号，即可开启数字化大赛'
              }}
            </div>

            <a-form :form="registerForm">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'mobile',
                    {
                      rules: [
                        { required: true, message: '请输入手机号码' },
                        { pattern: /^1\d{10}$/, message: '手机号码格式不正确' }
                      ]
                    }
                  ]"
                  size="large"
                  placeholder="请输入手机号"
                >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    {
                      rules: [{ validator: registerFormPasswordValidator }]
                    }
                  ]"
                  :type="registerFormPasswordFieldType"
                  size="large"
                  placeholder="请设置登录密码"
                >
                  <a-icon slot="prefix" type="lock" />
                  <a-icon
                    slot="suffix"
                    style="cursor: pointer;"
                    :type="registerFormPasswordFieldSuffixIcon"
                    @click="
                      isRegisterFormPasswordFieldVisible = !isRegisterFormPasswordFieldVisible
                    "
                  />
                </a-input>
              </a-form-item>

              <a-form-item>
                <a-input
                  v-decorator="[
                    'code',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请输入短信验证码'
                        }
                      ]
                    }
                  ]"
                  size="large"
                  placeholder="请输入短信验证码"
                >
                  <a-icon slot="prefix" type="mail" />
                  <a-button
                    slot="suffix"
                    class="btn-get-code"
                    size="small"
                    type="primary"
                    ghost
                    :disabled="!isEnabledGetCode"
                    @click="onGetCodeButtonClick"
                    v-text="getCodeButtonText"
                  />
                </a-input>
              </a-form-item>

              <a-form-item class="button-submit register">
                <a-button
                  block
                  size="large"
                  type="primary"
                  :disabled="!isAgreedUserAgreement"
                  :loading="isRegistering"
                  @click="onRegisterFormSubmit"
                >
                  {{ isPasswordResetMode ? '重置密码' : '注册' }}
                </a-button>
              </a-form-item>

              <div
                class="register-functional"
                :class="{ center: isPasswordResetMode }"
              >
                <a-checkbox
                  v-if="!isPasswordResetMode"
                  default-checked
                  @change="onAgreementCheckboxChange"
                >
                  已阅读并同意
                  <a href="/agreement" target="__blank">《用户协议》</a>
                </a-checkbox>
                <a
                  v-if="!isPasswordResetMode"
                  class="change-panel"
                  href="javascript:;"
                  @click="currentFormPanel = 'login'"
                >
                  已有账号，立即登录
                </a>
                <a
                  v-if="isPasswordResetMode"
                  class="change-panel"
                  href="javascript:;"
                  @click="currentFormPanel = 'login'"
                >
                  返回登录
                </a>
              </div>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>

      <cb-copyright bottom="-48" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'empty',

  data() {
    return {
      carouselList: [
        '//cdn.haosailei.cn/frontend/dashboard/resource/image/login/carousel_1.png',
        '//cdn.haosailei.cn/frontend/dashboard/resource/image/login/carousel_2.png',
        '//cdn.haosailei.cn/frontend/dashboard/resource/image/login/carousel_3.png'
      ],
      currentFormPanel: 'login', // 当前表单类型：login-登录，register-注册
      loginForm: this.$form.createForm(this), // 登录表单
      registerForm: this.$form.createForm(this), // 注册表单
      isEnableAutoLogin: true, // 是否允许自动登录
      isLogining: false, // 正在发送登录请求标志
      isShowMoreLoginMethods: false, // 是否显示更多登录方式
      isRegisterFormPasswordFieldVisible: false, // 是否显示注册表单密码域的内容
      isRegistering: false, // 正在发送注册请求标志
      isAgreedUserAgreement: true, // 是否同意用户协议
      isEnabledGetCode: true, // 是否允许获取短信验证码
      getCodeButtonText: '获取验证码', // 短信验证码获取按钮文案
      isPasswordResetMode: 'false' // 是否处于密码重置模式
    }
  },

  computed: {
    // 登录密码设置输入框的类型
    registerFormPasswordFieldType() {
      return this.isRegisterFormPasswordFieldVisible ? 'text' : 'password'
    },

    // 登录密码设置输入框尾部图标类型
    registerFormPasswordFieldSuffixIcon() {
      return this.isRegisterFormPasswordFieldVisible ? 'eye-invisible' : 'eye'
    }
  },

  methods: {
    ...mapActions('user', ['saveAuthInfo']),

    // 自动登录选项框改变
    onAutoLoginCheckboxChange(e) {
      this.isEnableAutoLogin = e.target.checked
    },

    // 提交登录表单
    onLoginFormSubmit() {
      this.loginForm.validateFieldsAndScroll((error, values) => {
        if (!error) {
          // 禁用登录按钮，避免反复点击
          this.isLogining = true

          this.$api.common
            .login({
              mobile: values.mobile,
              password: values.password
            })
            .then(({ data }) => {
              // 调用 Vuex User 模块的 Action 保存登录态
              this.saveAuthInfo({
                authInfo: data,
                isEnableAutoLogin: this.isEnableAutoLogin
              })

              // 检测是否有页面需要跳回
              let callback = this.$route.query.fe_router_callback
              if (callback) {
                callback = decodeURIComponent(callback)

                if (callback.indexOf('http') === 0) {
                  // 完整链接就直接跳转
                  window.location.href = callback
                } else {
                  // 其他链接通过 router 跳转
                  this.$router.push(callback)
                }
              } else {
                this.$router.push('/')
              }
            })
            .catch(({ error, hideToast }) => {
              if (hideToast) {
                // 如果错误来源是请求流程
                hideToast()
                // 设置错误信息
                this.loginForm.setFields({
                  password: {
                    errors: [{ message: error.error_message || error.message }]
                  }
                })
              } else {
                // 如果错误来源是上方的 then 流程
                this.$message.error(error.message)
              }
            })
            .finally(() => {
              this.isLogining = false
            })
        }
      })
    },

    // 注册表单密码自定义校验
    registerFormPasswordValidator(rule, value, callback) {
      if (!value || !this.$utils.validator(value, 'password')) {
        callback('密码要求 6-16 位，且只能包含字母、数字和特殊字符 @#%&')
      }
      callback()
    },

    // 获取验证码
    onGetCodeButtonClick() {
      const mobile = this.registerForm.getFieldValue('mobile')

      if (!/^1\d{10}$/.test(mobile)) {
        // 设置错误信息
        return this.registerForm.setFields({
          mobile: {
            errors: [{ message: '手机号格式不正确' }]
          }
        })
      }

      // 60 秒倒计时
      let count = 60
      const timer = setInterval(() => {
        count--
        this.getCodeButtonText = `重新获取 (${count}s)`
        if (count === 0) {
          clearInterval(timer)
          this.getCodeButtonText = '获取验证码'
          this.isEnabledGetCode = true
        }
      }, 1000)

      this.isEnabledGetCode = false

      this.$api.common
        .sendSmsCode({
          mobile
        })
        .then(() => {
          this.$message.info('验证码发送成功，请留意短信')
        })
        .catch(() => {
          clearInterval(timer)
          this.getCodeButtonText = '获取验证码'
          this.isEnabledGetCode = true
        })
    },

    // 是否同意用户协议选项框改变
    onAgreementCheckboxChange(e) {
      this.isAgreedUserAgreement = e.target.checked
    },

    // 提交注册表单
    onRegisterFormSubmit() {
      this.registerForm.validateFieldsAndScroll((error, values) => {
        if (!error) {
          // 禁用注册按钮，避免反复点击
          this.isRegistering = true

          const apiName = this.isPasswordResetMode
            ? 'resetPassword'
            : 'register'

          this.$api.common[apiName]({
            mobile: values.mobile,
            password: values.password,
            code: values.code
          })
            .then(() => {
              this.$message.success(
                (this.isPasswordResetMode ? '重置' : '注册') +
                  '成功，马上登陆吧'
              )
              this.currentFormPanel = 'login'
            })
            .catch(({ error, hideToast }) => {
              hideToast && hideToast()

              // 设置错误信息
              this.registerForm.setFields({
                code: {
                  errors: [
                    {
                      message:
                        error.error_message ||
                        '抱歉，无法完成操作，建议稍后重试'
                    }
                  ]
                }
              })
            })
            .finally(() => {
              this.isRegistering = false
            })
        }
      })
    },

    // 切换到注册界面
    switchToRegisterPanel() {
      this.currentFormPanel = 'register'
      this.isPasswordResetMode = false
    },

    // 切换到忘记密码界面
    switchToForgetPasswordPanel() {
      this.currentFormPanel = 'register'
      this.isPasswordResetMode = true
    }
  }
}
</script>

<style lang="less" scoped>
.page-login {
  overflow: hidden;
  height: 100%;
  min-width: 1200px;
  background: url(//cdn.haosailei.cn/frontend/dashboard/resource/image/login/bg.png)
    left top / cover no-repeat;

  .logo {
    position: absolute;
    left: 48px;
    top: 32px;

    img {
      width: 128px;
    }
  }

  .login-wrap {
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 560px;
    width: 960px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 5px 20px 5px rgba(64, 158, 255, 0.1),
      0 15px 25px 2px rgba(0, 0, 0, 0.05);

    &__cover {
      overflow: hidden;
      width: 440px;
      height: 100%;
      background: linear-gradient(180deg, #69b1fb, @color-primary);
      box-shadow: 2px 0 10px 0px rgba(20, 110, 255, 0.7);
      border-radius: 8px 0 0 8px;

      /deep/ .ant-carousel {
        height: 100%;

        .slick-slider {
          height: 100%;

          .slick-list {
            height: 100%;

            .slick-track {
              height: 100%;

              .slick-slide {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;

                > div {
                  height: 100%;
                }

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }

    &__panel {
      overflow: hidden;
      position: relative;
      padding: 64px;
      width: 520px;
      height: 100%;
      border-radius: 0 8px 8px 0;

      .panel-illustration {
        position: absolute;
        top: -25px;
        right: -55px;
        width: 200px;
        opacity: 0.8;
      }

      .panel-title {
        margin-bottom: 8px;
        font-size: 36px;
        font-weight: bold;
        text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
        color: @color-primary;
      }

      .panel-desc {
        margin-bottom: 40px;
        color: rgba(0, 0, 0, 0.4);
      }

      /deep/ .ant-form-item {
        .anticon {
          color: rgba(0, 0, 0, 0.4);
        }

        .ant-input {
          padding-left: 35px;
          border-top: none;
          border-left: none;
          border-right: none;
          border-radius: 0;

          &:hover {
            border-top: none;
            border-left: none;
            border-right: none;
          }

          &:focus {
            box-shadow: none;
          }
        }

        .ant-form-explain {
          padding-left: 12px;
        }
      }

      .button-submit {
        margin-top: 48px;

        /deep/ button {
          border-radius: 24px;
        }

        &.register {
          margin-top: 40px;
        }
      }

      .login-option {
        margin-top: 8px;
        padding-left: 12px;
        -webkit-user-select: none;
        .flex(space-between, center);

        a {
          text-decoration: none;
        }
      }

      .login-functional {
        position: relative;
        margin-top: 40px;
        padding: 0 12px;
        .flex(center, center);

        .tip {
          color: rgba(0, 0, 0, 0.65);
          text-decoration: none;
          cursor: pointer;
          .transition(color);

          &:hover {
            color: @color-primary;
          }
        }

        .login-types {
          position: absolute;
          top: 0;
          right: 80px;
          opacity: 0;
          .transition(opacity);

          &.visible {
            opacity: 1;
          }

          i {
            font-size: 20px;
            color: #a5b2cc;
            cursor: pointer;
            .transition(color);

            &:hover {
              color: #889abb;
            }
          }
        }
      }

      .register-functional {
        margin-top: 32px;
        padding: 0 12px;
        -webkit-user-select: none;
        .flex(space-between, center);

        &.center {
          justify-content: center;
        }

        a {
          text-decoration: none;
        }

        .change-panel {
          color: rgba(0, 0, 0, 0.65);
          .transition(color);

          &:hover {
            color: @color-primary;
          }
        }
      }

      .btn-get-code {
        font-size: 13px;
      }
    }
  }
}
</style>
