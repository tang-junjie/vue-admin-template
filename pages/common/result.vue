<!--

信息结果页

在进入此页面前可以先 commit 一个配置对象，具体请参照 store\result.js 下的 toResultPage

-->

<template>
  <div class="page-common-result">
    <a-card>
      <cb-result :type="type" :title="title" :description="description">
        <template #action>
          <a-button
            v-for="(item, index) in actions"
            :key="index"
            :type="item.primary ? 'primary' : 'default'"
            @click="item.action"
            v-text="item.title"
          />
        </template>
      </cb-result>
    </a-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('result', ['type', 'title', 'description', 'actions'])
  }

  // asyncData({ store, redirect }) {
  //   // 当没有类型时自动跳转到首页
  //   if (!store.state.result.type) {
  //     redirect('/')
  //   }
  // }
}
</script>

<style lang="less">
.page-common-result {
  .ant-card-body {
    padding: 144px 32px;
    min-height: 400px;
    .flex;

    /deep/ .cb-result {
      max-width: 800px;

      &__action {
        .ant-btn:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
