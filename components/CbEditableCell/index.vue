<!-- 可编辑的单元格组件，常用于表格的单元格 -->

<template>
  <div class="cb-editable-cell">
    <template v-if="isEditable">
      <a-input
        ref="input"
        v-model="initialValue"
        class="cb-editable-cell__input"
        v-bind="$attrs"
        @pressEnter="onEditSuccess"
        @input="$emit('input', $event)"
      />
      <a-icon
        type="check"
        class="cb-editable-cell__icon"
        @click="onEditSuccess"
      />
    </template>

    <template v-else>
      {{ initialValue || ' ' }}
      <a-icon type="edit" class="cb-editable-cell__icon" @click="onEdit" />
    </template>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    // 内容
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      initialValue: this.value,
      isEditable: false // 是否是编辑状态
    }
  },

  methods: {
    // 点击编辑确认事件
    onEditSuccess() {
      this.isEditable = false
      this.$emit('confirm', this.initialValue)
    },
    // 点击编辑事件
    onEdit() {
      this.isEditable = true
    }
  }
}
</script>

<style lang="less" scoped>
.cb-editable-cell {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__input {
    width: auto;
  }

  &__icon {
    margin-left: 8px;
    color: #c5c5c5;

    &:hover {
      color: #108ee9;
    }
  }
}
</style>
