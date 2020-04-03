<template>
  <div class="home">
    <div class="log_main">
      <div class="title">Logo 设置</div>
      <div class="log_cont">
        <el-upload
          class="avatar-uploader"
          :action="$api.uploadLogo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUpload"
          name="files"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="banner_main">
      <div class="title">Banner 设置</div>
      <div class="banner_cont">
        <el-upload
          class="avatar-uploader"
          :action="$api.uploadBanner"
          :on-success="bannerSuccess"
          :before-upload="beforeUpload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-preview="showPic"
          name="files"
          :file-list="bannerLists"
          multiple
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
    </div>
    <el-dialog :visible.sync="isShowModal">
      <img width="100%" :src="showImg" alt />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      bannerLists: [],
      showImg: '',
      isShowModal: false
    }
  },
  components: {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    bannerSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      console.log(this.bannerLists)
      file.id = response.data.id
    },
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      if (file.id) {
        this.$post({
          url: this.$api.removeFileById,
          data: {
            id: file.id,
            type: 'banner'
          }
        }).then(res => {
          if (res.success) {
          }
        })
      }
    },
    homeBanner() {
      this.$get({
        url: this.$api.homeBanner,
        data: {}
      }).then(res => {
        if (res.success) {
          this.bannerLists = res.data.map(i => {
            return {
              url: this.baseUrl + i.url,
              name: i.name,
              id: i.id
            }
          })
          console.log(this.bannerLists)
        }
      })
    },
    getLogo() {
      this.$get({
        url: this.$api.getLogo,
        data: {}
      }).then(res => {
        if (res.success) {
          this.imageUrl = this.baseUrl + res.data.url
        }
      })
    },
    showPic(file) {
      this.showImg = file.url
      this.isShowModal = true
    }
  },
  mounted() {
    this.homeBanner()
    this.getLogo()
  }
}
</script>
<style lang="scss">
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
</style>
<style lang="scss" scoped>
.home {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .log_cont {
    padding-top: 10px;
  }
  .banner_main {
    padding-top: 10px;
  }
}
</style>
 