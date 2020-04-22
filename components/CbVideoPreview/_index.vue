<!-- 组件：视频预览组件 -->

<template>
  <div v-if="isVisible" class="cb-video-preview">
    <div class="button-close" @click="isVisible = false">
      <a-icon type="close" />
    </div>

    <div class="video-container">
      <video ref="video" preload="none" :src="src" />
      <div class="play-control-container">
        <div class="play-btn" @click="playVideo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false, // 是否可见
      src: '' // 视频源
    }
  },

  methods: {
    // 播放视频
    playVideo() {
      event.currentTarget.parentNode.style.display = 'none'
      this.$refs.video.play()
      this.$refs.video.setAttribute('controls', 'controls')
    }
  }
}
</script>

<style lang="less" scoped>
.cb-video-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.5);

  .button-close {
    overflow: hidden;
    position: absolute;
    top: -40px;
    right: -40px;
    width: 80px;
    height: 80px;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    .transition(background-color);

    &:hover {
      background-color: rgba(0, 0, 0, 0.65);
    }

    .anticon {
      position: absolute;
      top: 46px;
      right: 46px;
      color: #fff;
    }
  }

  .video-container {
    width: 800px;
    height: 640px;
    .absolute-center(absolute, -50%, -55%);

    video {
      margin: 0 auto;
      width: 100%;
      height: 100%;
      outline: none;
      background-color: #222;
    }

    .play-control-container {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      .absolute-center;
      .flex;

      .play-btn {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 2px solid #fff;
        cursor: pointer;
        opacity: 1;
        .transition;
        .flex;

        &:hover {
          opacity: 0.75;

          :before {
            opacity: 0.75;
          }
        }

        &:before {
          content: '';
          margin-left: 24px;
          border-left: 25px solid #fff;
          border-top: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 15px solid transparent;
          opacity: 1;
          .transition;
        }
      }
    }
  }
}
</style>
