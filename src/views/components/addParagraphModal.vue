<template>
  <div class="add_class_modal">
    <el-dialog
      :append-to-body="true"
      :title="title"
      :visible.sync="isShowModal"
      width="800px"
      :before-close="handleClose"
    >
      <div class="add_class_cont" v-loading="pageLoading">
        <div class="add_class_top">
          <div class="fill_list">
            <div class="fill_name">段落名称</div>
            <div class="fill_val">
              <el-input v-model="formData.contentName" placeholder="请输入段落名称"></el-input>
            </div>
          </div>
          <div class="fill_list">
            <div class="fill_name">段落类型</div>
            <div class="fill_val">
              <el-select v-model="formData.moduleType" placeholder="请选择段落类型">
                <el-option
                  v-for="item in paragraphLists"
                  :key="item.index"
                  :label="item.name"
                  :value="item.index"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="fill_list">
            <div class="fill_name">优先级</div>
            <div class="fill_val">
              <el-input type="number" v-model="formData.priorityLevel" placeholder="请输入优先级"></el-input>
            </div>
          </div>
        </div>
        <div class="add_class_bot">
          <template v-if="formData.moduleType==0">
            <Edit :value="formData.courseContentVali.courseContent" @change="changeEidt"></Edit>
          </template>
          <template v-if="formData.moduleType==1">
            <Upload :data="formData.videoContentVali" ref="upload"></Upload>
          </template>
          <template v-if="formData.moduleType==2">
            <AddMoudle :data="formData.questionBankVali" ref="addMoudle"></AddMoudle>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="closeModal">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Edit from '@/components/edit'
import Upload from '@/components/upload'
import AddMoudle from './addMoudle'
export default {
  props: ['isShowModal', 'data'],
  data() {
    return {
      title: '新增段落',
      paragraphLists: [],
      formData: {
        moduleType: null,
        catalogId: this.$route.query.catalogId,
        contentName: '',
        courseContentVali: {
          courseContent: ''
        },
        questionBankVali: {
          partiseDesc: '',
          answer: '',
          remarksDtoList: []
        },
        videoContentVali: {
          fileName: ''
        },
        priorityLevel: null
      },
      pageLoading: false,
      loading: false
    }
  },
  components: {
    Edit,
    Upload,
    AddMoudle
  },
  watch: {
    data(val) {
      this.init(val)
    }
  },
  mounted() {
    this.getMoudleType()
  },
  methods: {
    init(val) {
      console.log('111', val)
      if (val) {
        const rowData = JSON.parse(JSON.stringify(val))
        console.log(this.formData)
        this.formData.moduleType = rowData.moduleType
        this.formData.priorityLevel = rowData.priorityLevel
        this.formData.catalogId = rowData.catalogId
        this.formData.contentName = rowData.contentName
        if (rowData.moduleType == 0) {
          this.formData.courseContentVali = JSON.parse(rowData.content)
        }
        if (rowData.moduleType == 1) {
          this.formData.videoContentVali = JSON.parse(rowData.content)
        }
        if (rowData.moduleType == 2) {
          this.formData.questionBankVali = JSON.parse(rowData.content)
        }
        if (val.id) {
          console.log(11111111111)
          this.title = '编辑段落'
          this.formData.id = val.id
        } else {
          this.title = '新增段落'
        }
      } else {
        this.formData = {
          moduleType: null,
          catalogId: this.$route.query.catalogId,
          contentName: '',
          courseContentVali: {
            courseContent: ''
          },
          questionBankVali: {
            partiseDesc: '',
            answer: '',
            remarksDtoList: []
          },
          videoContentVali: {
            fileName: ''
          },
          priorityLevel: null
        }
      }
      console.log(this.formData)
    },
    handleClose() {
      this.$emit('closeModal')
    },
    closeModal() {
      this.handleClose()
    },
    changeEidt(val) {
      this.formData.courseContentVali.courseContent = val
    },
    getMoudleType() {
      this.pageLoading = true
      this.$get({
        url: `${this.$api.commonGetList}/module_type`,
        data: {}
      })
        .then(res => {
          this.pageLoading = false
          if (res.success) {
            this.paragraphLists = res.data
            this.init(this.data)
          }
        })
        .catch(err => {
          this.pageLoading = false
        })
    },
    save() {
      let data = {
        ...this.formData
      }
      if (this.formData.moduleType == 1) {
        data = {
          ...data,
          ...this.$refs.upload.sendData()
        }
      }
      if (this.formData.moduleType == 2) {
        data = {
          ...data,
          ...this.$refs.addMoudle.sendData()
        }
      }
      console.log(data)
      if (!data.contentName) {
        this.$message.error('请填写段落名称')
        return
      }
      if (!data.moduleType && data.moduleType !== 0) {
        this.$message.error('请填写段落类型')
        return
      }
      if (!data.priorityLevel) {
        this.$message.error('请填写段落优先级')
        return
      }
      if (data.moduleType == 0) {
        if (!data.courseContentVali.courseContent) {
          this.$message.error('请填写课程内容')
          return
        }
      }
      if (data.moduleType == 1) {
        if (!data.videoContentVali.fileName) {
          this.$message.error('请上传课程视频')
          return
        }
      }
      if (data.moduleType == 2) {
        if (!data.questionBankVali.partiseDesc) {
          this.$message.error('请填写练习说明')
          return
        }
        if (!data.questionBankVali.answer) {
          this.$message.error('请填写答案')
          return
        }
        console.log(data)
        if (!data.questionBankVali.remarksDtoList.length) {
          this.$message.error('请新增备注')
          return
        }
      }
      console.log(data)
      this.loading = true
      this.$post({
        url: this.$api.courseContentModify,
        data: {
          ...data
        }
      })
        .then(res => {
          this.loading = false
          if (res.success) {
            this.$message.success(res.msg)
            this.formData = {
              moduleType: null,
              catalogId: this.$route.query.catalogId,
              contentName: '',
              courseContentVali: {
                courseContent: ''
              },
              questionBankVali: {
                partiseDesc: '',
                answer: '',
                remarksDtoList: []
              },
              videoContentVali: {
                fileName: ''
              },
              priorityLevel: null
            }
            this.$emit('refresh')
            this.handleClose()
          }
        })
        .catch(err => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.add_class_cont {
  .add_class_top {
    display: flex;
    .fill_list {
      display: flex;
      line-height: 38px;
      height: 38px;
      margin-bottom: 20px;
      padding-right: 20px;
      .fill_name {
        width: 60px;
        font-size: 12px;
        color: #404041;
      }
      .fill_val {
        width: 160px;
      }
    }
  }
}
</style>
