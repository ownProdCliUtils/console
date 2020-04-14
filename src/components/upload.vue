<template>
  <div class="upload_com">
    <el-upload
      class="avatar-uploader"
      :action="$api.fileUploadFile"
      :on-success="bannerSuccess"
      :before-upload="beforeUpload"
      name="fileName"
      :disabled="!!formData.videoContentVali.fileName"
      v-if="!formData.videoContentVali.fileName"
    >
      <el-button :disabled="!!formData.videoContentVali.fileName" size="small" type="primary">点击上传视频</el-button>
    </el-upload>
    <div v-else>
      <el-button style="margin-bottom:20px;" size="small" type="primary" @click="remove">删除</el-button>
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  data() {
    return {
      formData: {
        videoContentVali: {
          fileName: ''
        }
      },
      playerOptions: {}
    }
  },
  components: {},
  watch: {
    data(val) {
      this.init(val)
    }
  },
  mounted() {
    this.init(this.data)
  },
  methods: {
    init(val) {
      console.log('val: ', val)
      if (val) {
        this.formData.videoContentVali = val
        this.playerOptions = {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              type: '',
              src: `${this.$api.fileVideo}?fileName=${val.fileName}` //url地址
              // src: "" //url地址
            }
          ],
          poster: '', //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        }
      } else {
        this.formData.videoContentVali = {
          fileName: ''
        }
        this.playerOptions = {}
      }
    },
    remove() {
      this.formData.videoContentVali = {
        fileName: ''
      }
    },
    bannerSuccess(res, file, fileList) {
      if (res.success) {
        this.formData.videoContentVali.fileName = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeUpload(file) {
      //   const isLt2M = file.size / 1024 / 1024 < 2
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!')
      //   }
      //   return isLt2M
    },
    sendData() {
      return this.formData
    }
  }
}
</script>
<style lang="scss">
// .upload_com {
//   .el-upload {
//     border: 1px dashed #d9d9d9;
//     border-radius: 6px;
//     cursor: pointer;
//     position: relative;
//     overflow: hidden;
//     width: 120px;
//     height: 120px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &:hover {
//       border-color: #409eff;
//     }
//   }
//   .el-upload-list--picture-card {
//     .el-upload-list__item {
//       .el-upload-list__item-actions {
//         i {
//           color: #fff;
//           font-size: 20px;
//         }
//       }
//     }
//   }
// }
</style>
