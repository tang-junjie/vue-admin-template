<!-- 组件：二维码生成弹窗 -->

<template>
  <a-modal
    v-model="isVisible"
    class="cb-qrcode-preview"
    :title="title"
    :footer="null"
    centered
    :width="560"
  >
    <div class="qrcode-area">
      <div class="qrcode-wrap">
        <cb-icon class="top-left" name="right" />
        <cb-icon class="top-right" name="right" />
        <cb-icon class="bottom-right" name="right" />
        <cb-icon class="bottom-left" name="right" />
        <vue-qr
          class="qrcode"
          :dot-scale="0.8"
          :margin="0"
          :size="256"
          :text="rawData"
          :correct-level="2"
          :callback="qrcodeCallback"
          @click.native="saveMatchQrcodeImage"
        />
      </div>
      <p class="download-hint">点击图片可保存二维码</p>
    </div>

    <div class="hint">
      <div class="hint__main">
        <a-icon type="check-circle" />
        <div class="desc">
          <div class="desc__main">
            二维码生成成功
          </div>
          <div class="desc__vice">
            请使用微信扫码打开查看吧
          </div>
        </div>
      </div>
      <div v-if="isShowCopyButton" class="hint__data-copyer">
        <a-input size="small" read-only :value="rawData" />
        <a-button
          v-clipboard:copy="rawData"
          v-clipboard:success="onCopy"
          size="small"
          type="primary"
        >
          复制链接
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      rawData: '', // 待编码成二维码的原始数据
      title: '查看二维码', // 弹窗标题
      isShowCopyButton: true, // 是否显示拷贝按钮
      isVisible: false, // 控制弹窗可见与否
      qrcodeDataURI: '' // 二维码图片 Data URI
    }
  },

  methods: {
    // 二维码生成回调
    qrcodeCallback(dataURI) {
      // 保存二维码图片的 DataURI
      this.qrcodeDataURI = dataURI
    },

    // 拷贝成功回调
    onCopy() {
      this.$message.success('链接已成功复制到剪贴板')
    },

    // 保存大赛 H5 二维码图片
    saveMatchQrcodeImage() {
      saveAs(this.qrcodeDataURI, `二维码.png`)
    }
  }
}
</script>

<style lang="less">
.cb-qrcode-preview {
  /deep/ .ant-modal-body {
    padding: 40px 48px 24px;
    .flex;

    .qrcode-area {
      flex: none;
      .flex(center, center, column);

      .qrcode-wrap {
        position: relative;

        & > .icon {
          position: absolute;
          font-size: 24px;

          &.top-left {
            top: -20px;
            left: -20px;
            transform: rotate(-135deg);
          }

          &.top-right {
            top: -20px;
            right: -20px;
            transform: rotate(-45deg);
          }

          &.bottom-right {
            bottom: -16px;
            right: -20px;
            transform: rotate(45deg);
          }

          &.bottom-left {
            bottom: -16px;
            left: -20px;
            transform: rotate(135deg);
          }
        }

        .qrcode {
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
      }

      .download-hint {
        margin-top: 16px;
        font-size: 12px;
      }
    }

    .hint {
      flex: 1;
      margin-left: 40px;

      &__main {
        display: flex;
        margin-top: -32px;

        .anticon {
          font-size: 56px;
          color: @color-green;
        }

        .desc {
          margin-left: 12px;

          &__main {
            margin-top: 2px;
            font-size: 20px;
            font-weight: bold;
          }

          &__vice {
            margin-top: 2px;
          }
        }
      }

      &__data-copyer {
        display: flex;
        margin-top: 20px;

        .ant-input {
          flex: 1;
        }

        .ant-btn {
          flex: none;
          margin-left: 8px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
