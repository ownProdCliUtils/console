<template>
  <div class="add_class_modal">
    <el-dialog :title="title" :visible.sync="isShowModal" width="800px" :before-close="handleClose">
      <div class="add_class_cont">
        <div class="add_class_top">
          <div class="fill_list">
            <div class="fill_name">段落名称</div>
            <div class="fill_val">
              <el-input placeholder="请输入段落名称"></el-input>
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
              <el-input placeholder="请输入优先级"></el-input>
            </div>
          </div>
        </div>
        <div class="add_class_bot">
          <template v-if="formData.moduleType==0">
            <Edit :value="formData.content" @change="changeEidt"></Edit>
          </template>
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
import Edit from "@/components/edit";
export default {
  props: ["isShowModal", "data"],
  data() {
    return {
      title: "新增段落",
      paragraphLists: [],
      formData: {
        moduleType: null,
        catalogId: this.$route.query.catalogId,
        content: ""
      }
    };
  },
  components: {
    Edit
  },
  watch: {
    data(val) {
      if (val) {
        this.formData = JSON.parse(JSON.stringify(val));
        if (val.id) {
          this.title = "编辑段落";
        }else{
          this.title = "新增段落";
        }
      } else {
        this.formData = {
          moduleType: null,
          catalogId: this.$route.query.catalogId,
          content: ""
        };
      }
    }
  },
  mounted() {
    this.getMoudleType();
  },
  methods: {
    handleClose() {
      this.$emit("closeModal");
    },
    closeModal() {
      this.handleClose();
    },
    changeEidt(val) {
      this.formData.content = val;
    },
    getMoudleType() {
      this.$get({
        url: `${this.$api.commonGetList}/module_type`,
        data: {}
      }).then(res => {
        if (res.success) {
          this.paragraphLists = res.data;
        }
      });
    },
    save() {
      this.$post({
        url: this.$api.courseContentModify,
        data: {
          ...this.formData
        }
      }).then(res => {
        if (res.success) {
          this.$message.success(res.msg);
          this.formData = {
            moduleType: null,
            catalogId: null,
            content: ""
          };
          this.$emit("refresh");
          this.handleClose();
        }
      });
    }
  }
};
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
