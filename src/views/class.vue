<template>
  <div class="chapter_page">
    <div class="header_cont">
      <div class="header_left">
        <el-input v-model="courseTitle" placeholder="请输入查询的内容"></el-input>
      </div>
      <div class="header_right">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="openAddModal" type="danger">新增</el-button>
      </div>
    </div>
    <div class="table_lists">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="courseTitle" label="课程名称"></el-table-column>
        <el-table-column prop label="课程价格"></el-table-column>
        <el-table-column prop label="课程分类"></el-table-column>
        <el-table-column prop label="负责人"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" :loading="scope.row.loading" @click="linkToChapter(scope.row)">编辑章节</el-button>
            <el-button size="mini" :loading="scope.row.loading" @click="eidtRow(scope.row)">编辑</el-button>
            <el-button size="mini" :loading="scope.row.loading" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="pageNum"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <AddClassModal
      :data="rowData"
      @refresh="refresh"
      :isShowModal="isShowAddModal"
      @closeModal="closeModal"
    ></AddClassModal>
  </div>
</template>
<script>
import AddClassModal from "./components/addClassModal";
export default {
  props: [],
  data() {
    return {
      isShowAddModal: false,
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      courseTitle: "",
      rowData: null,
      loading: false
    };
  },
  components: {
    AddClassModal
  },
  watch: {
    isShowAddModal(val) {
      if (!val) {
        this.rowData = null;
      }
    }
  },
  mounted() {
    this.getLists();
  },
  methods: {
    closeModal() {
      this.isShowAddModal = false;
    },
    openAddModal() {
      this.isShowAddModal = true;
    },
    linkToChapter(row) {
      this.$router.push({
        path: "/classChapter",
        query: {
          title: row.courseDesc,
          id: row.id
        }
      });
    },
    eidtRow(row) {
      this.rowData = row;
      this.openAddModal();
    },
    search() {
      this.pageNum = 1;
      this.getLists();
    },
    remove(row) {
      row.loading = true;
      this.$get({
        url: `${this.$api.courseDelete}/${row.id}`,
        data: {}
      })
        .then(res => {
          row.loading = false;
          if (res.success) {
            this.$message.success(res.msg);
            this.refresh();
          }
        })
        .catch(err => {
          row.loading = false;
        });
    },
    refresh() {
      this.pageNum = 1;
      this.getLists();
    },
    changePage(val) {
      this.pageNum = val;
      this.getLists();
    },
    getLists() {
      this.loading = true;
      this.$post({
        url: this.$api.courseGetList,
        data: {
          start: (this.pageNum - 1) * this.pageSize,
          limit: this.pageSize,
          form: {
            courseTitle: this.courseTitle
          }
        }
      })
        .then(res => {
          this.loading = false;
          if (res.success) {
            res.data.data.forEach(i => {
              i.loading = false;
            });
            this.tableData = res.data.data;
            this.total = res.data.recordsTotal;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
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
  .pagination {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
