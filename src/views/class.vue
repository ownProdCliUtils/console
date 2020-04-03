<template>
  <div class="class_page">
    <div class="header_cont">
      <div class="header_left">
        <el-input placeholder="请输入查询的内容"></el-input>
      </div>
      <div class="header_right">
        <el-button type="primary">查询</el-button>
        <el-button @click="openAddModal" type="danger">新增</el-button>
      </div>
    </div>
    <div class="table_lists">
      <el-table :data="classLists" style="width: 100%">
        <el-table-column prop label="章节名称"></el-table-column>
        <el-table-column prop label="章节价格"></el-table-column>
        <el-table-column prop label="章节等级"></el-table-column>
        <el-table-column prop label="归属章节"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="linkToParagraph">编辑段落</el-button>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddClassModal :isShowModal="isShowAddModal" @closeModal="closeModal"></AddClassModal>
  </div>
</template>
<script>
import AddClassModal from './components/addClassModal'
export default {
  props: [],
  data() {
    return {
      isShowAddModal: false,
      classLists: [1]
    }
  },
  components: {
    AddClassModal
  },
  watch: {},
  mounted() {},
  methods: {
    closeModal() {
      this.isShowAddModal = false
    },
    openAddModal() {
      console.log(111)
      this.isShowAddModal = true
    },
    linkToParagraph(row) {
      this.$router.push({
        path: '/classChapter'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.class_page {
  .header_cont {
    display: flex;
    justify-content: space-between;
    .header_right {
      display: flex;
    }
  }
  .table_lists {
    padding-top: 30px;
  }
}
</style>
