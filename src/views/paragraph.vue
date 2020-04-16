<template>
  <div class="chapter_page">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item
          :to="{ path: '/classChapter',query:{
          id:$route.query.courseId
        } }"
        >章节</el-breadcrumb-item>
        <el-breadcrumb-item>段落</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header_cont">
      <div class="header_left">{{$route.query.title || '章节名称'}}</div>
      <div class="header_right">
        <el-button @click="openAddModal" type="danger">新增段落</el-button>
      </div>
    </div>
    <div class="table_lists">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="contentName" label="段落名称"></el-table-column>
        <el-table-column prop="moduleType" label="段落类型">
          <template slot-scope="scope">
            <div>{{getMoudleTypeById(scope.row.moduleType)}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="priorityLevel" label="优先级"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" @click="eidtRow(scope.row)">编辑段落</el-button>
            <el-button size="mini" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddParagraphModal
      :data="rowData"
      @refresh="refresh"
      :isShowModal="isShowAddModal"
      @closeModal="closeModal"
      v-if="isShowAddModal"
    ></AddParagraphModal>
  </div>
</template>
<script>
import AddParagraphModal from './components/addParagraphModal'
export default {
  props: [],
  data() {
    return {
      isShowAddModal: false,
      tableData: [],
      rowData: null,
      loading: false,
      paragraphLists: []
    }
  },
  components: {
    AddParagraphModal
  },
  watch: {
    isShowAddModal(val) {
      if (!val) {
        this.rowData = null
      }
    }
  },
  mounted() {
    this.getMoudleType()
  },
  methods: {
    getMoudleTypeById(id) {
      return this.paragraphLists.find(i => i.index == id).name
    },
    getMoudleType() {
      this.$get({
        url: `${this.$api.commonGetList}/module_type`,
        data: {}
      })
        .then(res => {
          if (res.success) {
            this.paragraphLists = res.data
            this.getLists()
          }
        })
        .catch(err => {})
    },
    closeModal() {
      this.isShowAddModal = false
    },
    openAddModal() {
      this.isShowAddModal = true
    },
    refresh() {
      this.getLists()
    },
    eidtRow(row) {
      console.log(row)
      this.rowData = row
      this.openAddModal()
    },
    remove(row) {
      this.$get({
        url: `${this.$api.courseContentDelete}/${row.id}`,
        data: {}
      }).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
          this.refresh()
        }
      })
    },
    getLists() {
      this.loading = true
      this.$post({
        url: this.$api.courseContentGetContent,
        data: {
          catalogId: this.$route.query.catalogId
        }
      })
        .then(res => {
          this.loading = false
          if (res.success) {
            this.tableData = res.data
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
.chapter_page {
  .header_cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_left {
      font-size: 18px;
      font-weight: bold;
    }
    .header_right {
      display: flex;
    }
  }
  .table_lists {
    padding-top: 30px;
  }
}
.breadcrumb {
  height: 30px;
  line-height: 30px;
}
</style>
