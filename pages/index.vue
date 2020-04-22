<!-- 首页 -->

<template>
  <div class="page-index">
    <a-form :form="form" @submit.prevent="onSubmit">
      <a-card title="编辑大赛">
        <a-form-item label="内容" v-bind="formItemLayout">
          <cb-editor
            v-decorator="[
              'rule',
              {
                rules: [{ required: true, message: '请输入内容' }],
                initialValue: ''
              }
            ]"
            @ready="
              () => {
                editloaded = true
              }
            "
          />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-card>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      form: this.$form.createForm(this)
    }
  }
}
</script>
