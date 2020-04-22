<!--

组件：标签编辑器

注意：
1. 该组件提供了 value 和 emit 了 change 事件好让 a-form 组件能够接管数据，所有的
   v-decorator 的行为都和 a-form 中定义的一一致。

-->

<template>
  <div class="cb-tag-input">
    <template v-for="(tag, index) in tags">
      <a-tooltip
        v-if="tag.length > maxVisibleCharacters"
        :key="index"
        :title="tag"
      >
        <a-tag closable :after-close="() => onRemoveTag(index)">
          {{ `${tag.slice(0, maxVisibleCharacters)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag
        v-else
        :key="index"
        closable
        :after-close="() => onRemoveTag(index)"
      >
        {{ tag }}
      </a-tag>
    </template>

    <a-input
      v-if="isInputVisible"
      ref="input"
      v-model="inputValue"
      type="text"
      size="small"
      :style="{ width: `${maxVisibleCharacters * 16}px` }"
      @blur="onConfirmInput"
      @keyup.enter="onConfirmInput"
    />
    <a-tag
      v-else
      style="background: #fff; borderStyle: dashed;"
      @click="onShowInput"
    >
      <a-icon type="plus" /> 添加标签
    </a-tag>
  </div>
</template>

<script>
export default {
  props: {
    // 设置 value 这个 prop 是为了能被 Form 组件接管
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array
    },

    // 最多显示的字数
    maxVisibleCharacters: {
      type: Number,
      default: 12
    }
  },

  data() {
    return {
      tags: [], // 标签集合
      isInputVisible: false, // 标签新建输入框可见性
      inputValue: '' // 标签新建输入框值
    }
  },

  watch: {
    // v-model 语法糖
    value: {
      handler(value) {
        if (value instanceof Array) {
          this.tags = value
        }
      },
      immediate: true
    }
  },

  methods: {
    // 显示标签新建输入框
    onShowInput() {
      this.isInputVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },

    // 确认添加新标签
    onConfirmInput() {
      const inputValue = this.inputValue

      if (inputValue && this.tags.indexOf(inputValue) === -1) {
        this.tags.push(inputValue)
      }
      this.$emit('change', this.tags)

      this.isInputVisible = false
      this.inputValue = ''
    },

    // 删除标签
    onRemoveTag(index) {
      this.tags.splice(index, 1)
      this.$emit('change', this.tags)
    }
  }
}
</script>
