<template>
  <div class="chapter_page">
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
      <el-table style="width: 100%">
        <el-table-column prop label="课程名称"></el-table-column>
        <el-table-column prop label="课程价格"></el-table-column>
        <el-table-column prop label="课程分类"></el-table-column>
        <el-table-column prop label="负责人"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="linkToChapter">编辑章节</el-button>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddChapterModal :isShowModal="isShowAddModal" @closeModal="closeModal"></AddChapterModal>
  </div>
</template>
<script>
import AddChapterModal from './components/addChapterModal'
export default {
  props: [],
  data() {
    return {
      isShowAddModal: false
    }
  },
  components: {
    AddChapterModal
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
    linkToChapter(row) {
      //   this.$router.push({
      //     path: '/classChapter'
      //   })
    }
  }
}
</script>
<style lang="scss" scoped>
.chapter_page {
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
