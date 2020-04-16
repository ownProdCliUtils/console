<template>
  <div class="add_chapter_modal">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="title"
      :visible.sync="isShowModal"
      width="600"
      :before-close="handleClose"
    >
      <div class="add_chapter_cont">
        <div class="fill_list">
          <div class="fill_name">章节名称</div>
          <div class="fill_val">
            <el-input v-model="formData.catalogName" placeholder="请输入课程名称"></el-input>
          </div>
        </div>
        <div class="fill_list">
          <div class="fill_name">章节等级</div>
          <div class="fill_val">
            <el-input v-model="formData.sameLevelOrder" placeholder="请输入章节等级"></el-input>
            <!-- <el-select placeholder="请选择" style="width:300px">
              <el-option
                v-for="item in personLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
        </div>
        <div class="fill_list">
          <div class="fill_name">章节价格</div>
          <div class="fill_val">
            <el-input type="number" v-model="formData.price" placeholder="请输入章节价格"></el-input>
          </div>
        </div>
        <!-- <div class="fill_list">
          <div class="fill_name">归属章节</div>
          <div class="fill_val">
            <el-select placeholder="请选择" style="width:300px">
              <el-option
                v-for="item in personLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['isShowModal', 'data'],
  data() {
    return {
      title: '新增章节',
      // personLists: [],
      formData: {
        catalogName: '',
        sameLevelOrder: '',
        parentId: '',
        courseId: this.$route.query.id,
        price: null
      }
    }
  },
  components: {},
  watch: {
    data(val) {
      console.log(val)
      if (val) {
        if (val.type === 'newChild') {
          this.formData = {
            catalogName: '',
            sameLevelOrder: '',
            parentId: val.parentId,
            courseId: this.$route.query.id,
            price: null
          }
        } else {
          this.formData = JSON.parse(JSON.stringify(val))
        }
        if (val.id) {
          this.title = '编辑章节'
        } else {
          this.title = '新增章节'
        }
      } else {
        this.formData = {
          catalogName: '',
          sameLevelOrder: '',
          parentId: '',
          courseId: this.$route.query.id,
          price: null
        }
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
    save() {
      if (!this.formData.catalogName) {
        this.$message.error('请填写章节名称!')
        return
      }
      if (!this.formData.price) {
        this.$message.error('请填写章节价格!')
        return
      }
      if (!this.formData.sameLevelOrder) {
        this.$message.error('请填写章节优先级!')
        return
      }
      const data = {
        catalogName: this.formData.catalogName,
        sameLevelOrder: this.formData.sameLevelOrder,
        courseId: this.$route.query.id,
        price: this.formData.price
      }
      if (this.formData.id) {
        data.id = this.formData.id
      }
      if (this.formData.parentId) {
        data.parentId = this.formData.parentId
      }
      this.$post({
        url: this.$api.courseCatalogModify,
        data: {
          ...data
        }
      }).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.$emit('refresh')
          this.handleClose()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.add_chapter_cont {
  .fill_list {
    display: flex;
    line-height: 38px;
    height: 38px;
    margin-bottom: 20px;
    .fill_name {
      width: 120px;
      font-size: 12px;
      color: #404041;
    }
    .fill_val {
      width: 300px;
    }
  }
}
</style>
