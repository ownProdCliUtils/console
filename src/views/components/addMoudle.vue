<template>
  <div class="add_moudle_modal">
    <div class="modal_title">
      <!-- <div class="modal_title_text">编辑实践区</div> -->
      <div class="modal_btn">
        <el-button size="small" @click="oepnRemarkModal" type="primary">新增备注</el-button>
      </div>
    </div>
    <div class="add_class_cont">
      <div class="fill_list">
        <div class="fill_name">练习说明</div>
        <div class="fill_val">
          <el-input v-model="formData.partiseDesc" placeholder="请输入练习说明"></el-input>
        </div>
      </div>
      <div class="fill_list">
        <div class="fill_name">答案</div>
        <div class="fill_val">
          <el-input v-model="formData.answer" placeholder="请输入答案"></el-input>
        </div>
      </div>
      <div class="fill_lists">
        <div class="fill_list" v-for="(i, index) in formData.remarksDtoList" :key="index">
          <div class="fill_name">{{i.title}}</div>
          <div class="fill_val">
            <el-button size="small" @click="eidtMoudle(i,index)">编辑备注</el-button>
            <el-button size="small" @click="removeMoudle(index)" type="primary">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <AddRemarkModal
      :data="rowData"
      @getData="getData"
      :isShowModal="isShowAddRemarkModal"
      @closeModal="closeModal"
    ></AddRemarkModal>
  </div>
</template>
<script>
import AddRemarkModal from './addRemarkModal'
export default {
  data() {
    return {
      formData: {
        questionBankVali: {
          partiseDesc: '',
          answer: ''
        },
        remarksDtoList: []
      },
      loading: false,
      isShowAddRemarkModal: false,
      rowData: null,
      index: null
    }
  },
  components: {
    AddRemarkModal
  },
  watch: {},
  mounted() {},
  methods: {
    oepnRemarkModal() {
      this.isShowAddRemarkModal = true
    },
    closeModal() {
      this.isShowAddRemarkModal = false
      this.rowData = null
      this.index = null
    },
    eidtMoudle(i, index) {
        console.log('index: ', index);
      this.rowData = i
      this.index = index
      this.oepnRemarkModal()
    },
    removeMoudle(index) {
      this.formData.remarksDtoList.splice(index, 1)
    },
    getData(val) {
        console.log(this.index);
      if (val.type === 'eidt') {
          console.log(11111);
        this.formData.remarksDtoList.splice(this.index, 1, val.data)
      } else {
        this.formData.remarksDtoList.push(val.data)
      }
    },
    sendData() {
      return this.formData
    }
  }
}
</script>
<style lang="scss" scoped>
.modal_title {
  display: flex;
  height: 32px;
  line-height: 32px;
  justify-content: space-between;
  padding-bottom: 20px;
  .modal_title_text {
    font-size: 18px;
  }
}
.add_moudle_modal {
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
