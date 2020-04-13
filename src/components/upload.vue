<template>
  <div class="upload_com">
    <el-upload
      class="avatar-uploader"
      :action="$api.fileUploadFile"
      :on-success="bannerSuccess"
      :before-upload="beforeUpload"
      name="fileName"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: [],
  data() {
    return {
      formData: {
        videoContentVali: {
          fileName: ''
        }
      }
    }
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    bannerSuccess(response, file, fileList) {
      //   console.log(response)
      //   console.log(file)
      //   console.log(fileList)
      //   console.log(this.bannerLists)
      //   file.id = response.data.id
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
.upload_com {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-color: #409eff;
    }
  }
  .el-upload-list--picture-card {
    .el-upload-list__item {
      .el-upload-list__item-actions {
        i {
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
