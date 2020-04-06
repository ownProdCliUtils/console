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
      <el-table
        :data="classLists"
        default-expand-all
        row-key="id"
        :tree-props="{children: 'list', hasChildren: 'hasChildren'}"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="catalogName" label="章节名称"></el-table-column>
        <el-table-column prop label="章节价格"></el-table-column>
        <el-table-column prop="sameLevelOrder" label="章节等级"></el-table-column>
        <!-- <el-table-column prop="parentId" label="归属章节"></el-table-column> -->
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="linkToParagraph(scope.row)">编辑段落</el-button>
            <el-button size="mini" @click="eidtRow(scope.row)">编辑</el-button>
            <el-button size="mini" @click="remove(scope.row)">删除</el-button>
            <el-button size="mini" @click="addNewChilde(scope.row)">新增</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddChapterModal
      :data="rowData"
      @refresh="refresh"
      :isShowModal="isShowAddModal"
      @closeModal="closeModal"
    ></AddChapterModal>
  </div>
</template>
<script>
import AddChapterModal from "./components/addChapterModal";
export default {
  props: [],
  data() {
    return {
      isShowAddModal: false,
      classLists: [],
      rowData: null,
      loading: false
    };
  },
  components: {
    AddChapterModal
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
    linkToParagraph(row) {
      console.log(row);
      this.$router.push({
        path: "/paragraph",
        query: {
          title: row.catalogName,
          catalogId: row.id
        }
      });
    },
    remove(row) {
      this.$get({
        url: `${this.$api.courseCatalogDelete}/${row.id}`,
        data: {}
      }).then(res => {
        if (res.success) {
          this.$message.success(res.msg);
          this.refresh();
        }
      });
    },
    refresh() {
      this.getLists();
    },
    eidtRow(row) {
      console.log(row);
      this.rowData = row;
      this.openAddModal();
    },
    addNewChilde(row) {
      this.rowData = {
        parentId: row.id,
        type: "newChild"
      };
      this.openAddModal();
    },
    getLists() {
      this.loading = true;
      this.$post({
        url: this.$api.courseCatalogGetList,
        data: {
          courseId: this.$route.query.id
        }
      })
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.classLists = res.data;
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
