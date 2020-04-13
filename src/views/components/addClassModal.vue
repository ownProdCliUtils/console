<template>
  <div class="add_class_modal">
    <el-dialog :title="title" :visible.sync="isShowModal" width="600" :before-close="handleClose">
      <div class="add_class_cont">
        <div class="fill_list">
          <div class="fill_name">课程名称</div>
          <div class="fill_val">
            <el-input v-model="formData.courseTitle" placeholder="请输入课程名称"></el-input>
          </div>
        </div>
        <!-- <div class="fill_list">
          <div class="fill_name">负责人</div>
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
        <div class="fill_list">
          <div class="fill_name">课程价格</div>
          <div class="fill_val">
            <el-input type="number" v-model="formData.price" placeholder="请输入课程价格"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="closeModal">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["isShowModal", "data"],
  data() {
    return {
      title: "新增课程",
      personLists: [],
      formData: {
        courseTitle: "",
        courseDesc: "",
        price:null
      },
      loading: false
    };
  },
  components: {},
  watch: {
    data(val) {
      console.log(val)
      if (val) {
        this.formData = JSON.parse(JSON.stringify(val));
        if (val.id) {
          this.title = "编辑课程";
        } else {
          this.title = "新增课程";
        }
      } else {
        this.formData = {
          courseTitle: "",
          courseDesc: "",
          price:null
        };
      }
    }
  },
  mounted() {},
  methods: {
    handleClose() {
      this.$emit("closeModal");
    },
    closeModal() {
      this.handleClose();
    },
    save() {
      if (!this.formData.courseTitle) {
        this.$message.error("请填写课程名称!");
        return;
      }
      // if (!this.formData.courseTitle) {
      //   this.$message.error("请填写课程名称!");
      //   return;
      // }
      this.loading = true;
      this.$post({
        url: this.$api.courseModify,
        data: {
          ...this.formData
        }
      })
        .then(res => {
          this.loading = false;
          if (res.success) {
            this.$message.success(res.msg);
            this.formData = {
              courseTitle: "",
              courseDesc: "",
              price:null
            };
            this.$emit("refresh");
            this.handleClose();
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
.add_class_cont {
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
