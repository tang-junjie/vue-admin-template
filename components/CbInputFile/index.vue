<!--

组件：基于 FormData 的文件上传

注意：
1. 该组件提供了 value 和 emit 了 change 事件好让 a-form 组件能够接管数据，所有的
   v-decorator 的行为都和 a-form 中定义的一一致。
2. 该组件存在的意义是为了兼容要求用 multipart/form-data 编码方式提交的表单。

-->

<template>
  <div class="cb-input-file">
    <a-input-search
      v-model="inputText"
      read-only
      :placeholder="placeholder"
      :size="size"
      @search="
        () => {
          $refs.file.click()
        }
      "
    >
      <a-button slot="enterButton" icon="folder-open" type="primary">
        浏览
      </a-button>
    </a-input-search>

    <input ref="file" type="file" :accept="accept" @change="onSelectFile" />
  </div>
</template>

<script>
export default {
  props: {
    // 设置 value 这个 prop 是为了能被 Form 组件接管
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: File
    },

    // 接受上传的文件类型，详见 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
    accept: {
      type: String,
      default: '.gif,.jpg,.jpeg,.png'
    },

    // 控件大小
    size: {
      type: String,
      default: 'default'
    },

    // 输入提示
    placeholder: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      inputText: '' // 文本框内容
    }
  },

  methods: {
    // 选择文件
    onSelectFile(event) {
      const file = event.target.files[0]

      // 显示当前所选文件名到文本框
      this.inputText = file.name

      // 向父组件 emit 所选的文件对象
      this.$emit('change', file)
    }
  }
}
</script>

<style lang="less" scoped>
.cb-input-file {
  input[type='file'] {
    display: none;
  }
}
</style>
