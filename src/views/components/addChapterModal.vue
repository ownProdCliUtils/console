<template>
  <div class="add_chapter_modal">
    <el-dialog :title="title" :visible.sync="isShowModal" width="600" :before-close="handleClose">
      <div class="add_chapter_cont">
        <div class="fill_list">
          <div class="fill_name">章节名称</div>
          <div class="fill_val">
            <el-input placeholder="请输入课程名称"></el-input>
          </div>
        </div>
        <div class="fill_list">
          <div class="fill_name">章节等级</div>
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
        </div>
        <div class="fill_list">
          <div class="fill_name">章节价格</div>
          <div class="fill_val">
            <el-input placeholder="请输入课程价格"></el-input>
          </div>
        </div>
        <div class="fill_list">
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
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['isShowModal'],
  data() {
    return {
      title: '新增章节',
      personLists: []
    }
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    handleClose() {
      this.$emit('closeModal')
    },
    closeModal() {
      this.handleClose()
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
