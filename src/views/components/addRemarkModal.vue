<template>
  <div class="add_remark_modal">
    <el-dialog
      :append-to-body="true"
      :title="title"
      :visible.sync="isShowModal"
      width="700px"
      :before-close="handleClose"
      custom-class="add_remark_modal"
    >
      <div class="add_class_cont">
        <div class="fill_list">
          <div class="fill_name">标题</div>
          <div class="fill_val">
            <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
          </div>
        </div>
        <div class="fill_list">
          <div class="fill_name">答案</div>
          <div class="fill_val">
            <Edit :height="200" :value="formData.content" @change="changeEidt"></Edit>
          </div>
        </div>
        <div class="fill_list">
          <div class="fill_name">优先级</div>
          <div class="fill_val">
            <el-input type="number" v-model="formData.priorityLevel" placeholder="请输入优先级"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Edit from '@/components/edit'
export default {
  props: ['isShowModal', 'data'],
  data() {
    return {
      title: '新增备注',
      personLists: [],
      formData: {
        title: '',
        content: '',
        priorityLevel: null
      }
    }
  },
  components: {
    Edit
  },
  watch: {
    data(val) {
      console.log(val)
      if (val) {
        this.formData = JSON.parse(JSON.stringify(val))
        this.title = '编辑备注'
      } else {
        this.formData = {
          title: '',
          content: '',
          priorityLevel: null
        }
        this.title = '新增备注'
      }
    }
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('closeModal')
    },
    closeModal() {
      this.handleClose()
    },
    changeEidt(val) {
      this.formData.content = val
    },
    save() {
      if (!this.formData.title) {
        this.$message.error('请填写备注的标题')
        return
      }
      if (!this.formData.content) {
        this.$message.error('请填写备注的答案')
        return
      }
      if (!this.formData.priorityLevel) {
        this.$message.error('请填写备注的优先级')
        return
      }
      if (this.title === '编辑备注') {
        this.$emit('getData', {
          type: 'eidt',
          data: this.formData
        })
      } else {
        this.$emit('getData', {
          type: 'add',
          data: this.formData
        })
      }
      this.handleClose()
    }
  }
}
</script>
<style lang="scss" scoped>
.add_remark_modal {
  .fill_list {
    display: flex;
    line-height: 38px;
    // height: 38px;
    margin-bottom: 20px;
    .fill_name {
      width: 120px;
      font-size: 12px;
      color: #404041;
    }
    .fill_val {
      //   width: 300px;
    }
  }
}
</style>
