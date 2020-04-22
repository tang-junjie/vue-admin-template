<!-- 个人中心 - 账户设置页 -->

<template>
  <div class="page-user-setting-account">
    <div class="content-wrapper">
      <div class="content-title">
        账户设置
      </div>
      <div class="content-body">
        <div class="body-item">
          <a-icon class="body-item__icon" type="lock" />
          <div class="body-item__text">
            <div class="item-title">
              帐号密码
            </div>
            <div class="item-description">
              用于保护帐号信息和登录安全
            </div>
          </div>
          <div
            class="body-item__button"
            @click="isShowPassWordSettingModal = true"
          >
            更改
          </div>
        </div>
      </div>
    </div>

    <!-- 修改密码对话框 -->
    <a-modal
      title="修改密码"
      :centered="true"
      :footer="null"
      :mask-closable="false"
      :visible="isShowPassWordSettingModal"
      :width="480"
      destroy-on-close
      wrap-class-name="password-setting-modal"
      @cancel="isShowPassWordSettingModal = false"
    >
      <div class="password-setting-modal">
        <div class="tip">
          为了你的账户安全，需要通过手机 {{ desensitizedMobile }} 验证你的身份。
        </div>

        <a-form :form="passwordSettingForm">
          <a-form-item>
            <a-row :gutter="8">
              <a-col :span="10">
                <a-input
                  v-decorator="[
                    'code',
                    {
                      rules: [{ required: true, message: '验证码不能为空' }]
                    }
                  ]"
                  placeholder="请输入短信验证码"
                />
              </a-col>
              <a-col :span="8">
                <a-button
                  :disabled="!isEnabledGetCode"
                  @click="onGetCodeButtonClick"
                  v-text="codeGetterButtonText"
                />
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item label="设置新密码">
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ validator: passwordValidator }]
                }
              ]"
              :type="passwordFieldType"
              autocomplete="new-password"
              class="new-password"
              placeholder="请输入新密码"
            >
              <a-icon
                slot="suffix"
                style="cursor: pointer;"
                :type="passwordFieldSuffixIcon"
                @click="isPasswordFieldVisible = !isPasswordFieldVisible"
              />
            </a-input>
          </a-form-item>

          <a-form-item class="btn-submit">
            <a-button
              type="primary"
              :disabled="isModifyingPassword"
              @click="onPassWordSettingFormSubmit"
            >
              更改密码
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isShowPassWordSettingModal: false, // 密码模态框可见与否
      passwordSettingForm: this.$form.createForm(this), // 密码设置表单
      isEnabledGetCode: true, // 验证码获取按钮的可点击状态
      codeGetterButtonText: '获取验证码', // 验证码获取按钮的文案
      isModifyingPassword: false, // 是否正在重置密码
      isPasswordFieldVisible: false // 是否显示新密码设置输入框的内容
    }
  },

  computed: {
    // 脱敏的手机号码
    desensitizedMobile() {
      // return this.__global__user.mobile.replace(/^(\d{3})\d{5}(\d{3})$/, '$1*****$2')
      return this.__global__user.mobile
    },

    // 新密码设置输入框的类型
    passwordFieldType() {
      return this.isPasswordFieldVisible ? 'text' : 'password'
    },

    // 新密码设置输入框的尾部图标类型
    passwordFieldSuffixIcon() {
      return this.isPasswordFieldVisible ? 'eye-invisible' : 'eye'
    }
  },

  methods: {
    ...mapActions('user', ['logout']),
    ...mapActions('match', ['removeCurrentMatch']),

    // 获取验证码
    onGetCodeButtonClick() {
      // 60 秒倒计时
      let count = 60
      const timer = setInterval(() => {
        count--
        this.codeGetterButtonText = `重新获取 (${count}s)`
        if (count === 0) {
          clearInterval(timer)
          this.codeGetterButtonText = '获取验证码'
          this.isEnabledGetCode = true
        }
      }, 1000)

      this.isEnabledGetCode = false

      this.$api.common
        .sendSmsCode({
          mobile: this.__global__user.mobile
        })
        .then(() => {
          this.$message.info('验证码发送成功，请留意短信')
        })
        .catch(() => {
          clearInterval(timer)
          this.codeGetterButtonText = '获取验证码'
          this.isEnabledGetCode = true
        })
    },

    // 密码修改表单密码自定义校验
    passwordValidator(rule, value, callback) {
      if (!value || !this.$utils.validator(value, 'password')) {
        callback('密码要求 6-16 位，且只能包含字母、数字和特殊字符 @#%&')
      }
      callback()
    },

    // 密码修改模态框确认事件
    onPassWordSettingFormSubmit() {
      this.passwordSettingForm.validateFieldsAndScroll((error, values) => {
        if (!error) {
          // 禁用按钮，避免反复点击
          this.isModifyingPassword = true

          this.$api.common
            .resetPassword({
              mobile: this.__global__user.mobile,
              password: values.password,
              code: values.code
            })
            .then(() => {
              this.$message.success(
                '修改成功，系统将于 3 秒后退出登录，请你重新登录'
              )
              this.isShowPassWordSettingModal = false
              setTimeout(() => {
                this.removeCurrentMatch()
                this.logout()
              }, 3000)
            })
            .catch(({ error, hideToast }) => {
              hideToast & hideToast()

              // 设置错误信息
              this.passwordSettingForm.setFields({
                password: {
                  errors: [
                    {
                      message:
                        error.error_message || '抱歉，无法完成修改，请联系客服'
                    }
                  ]
                }
              })
            })
            .finally(() => {
              this.isModifyingPassword = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-user-setting-account {
  padding: 16px 24px 0 0;

  .content-wrapper {
    .content-title {
      font-size: 18px;
      line-height: 2.5;
    }

    .content-body {
      margin-top: 8px;

      .body-item {
        padding: 0 16px;
        border-radius: 5px;
        border: 1px solid #e8e8e8;
        .flex(space-between);

        .body-item__icon {
          flex: none;
          margin-left: 4px;
          font-size: 24px;
          color: @text-color-2;
        }

        .body-item__text {
          margin-left: 16px;
          padding: 16px 0;
          flex: 1;

          .item-title {
            margin-bottom: 2px;
          }

          .item-description {
            font-size: 12px;
            color: @text-color-2;
          }
        }

        .body-item__button {
          flex: none;
          width: 40px;
          color: @text-color-2;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}

.password-setting-modal {
  .ant-form {
    margin-top: 8px;

    /deep/ .ant-form-item {
      margin-bottom: 0;
    }

    .new-password {
      width: 269px;
    }

    /deep/ .btn-submit {
      margin: 12px 0 8px;
    }
  }
}
</style>
