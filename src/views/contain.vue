<template>
  <div id="contain">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span> -->
      </el-header>

      <div class="contain_cont">
        <div class="slider_left">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu class="el-menu-vertical-demo" :default-active="active" theme="dark" router>
              <template v-for="(i,index) in submenuLists">
                <el-menu-item :index="i.path" :key="index">{{i.title}}</el-menu-item>
              </template>
            </el-menu>
            <!-- <Menu></Menu> -->
          </el-aside>
        </div>
        <div class="router_cont">
          <router-view></router-view>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
// import Menu from '@/components/menu'
export default {
  data() {
    return {
      submenuLists: [
        {
          title: '课程管理',
          path: '/class'
        },
      ]
    }
  },
  computed: {
    active() {
      const path = this.$route.path
      let activePath = ''
      let onOff = false
      this.submenuLists.forEach(i => {
        if (!onOff) {
          if (i.path === path) {
            onOff = true
            activePath = i.path
          }
        }
        if (i.children && i.children.length && !onOff) {
          i.children.forEach(k => {
            if (k.path === path) {
              onOff = true
              activePath = i.path
            }
          })
        }
      })
      console.log('activePath', activePath)
      return activePath
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key)
    }
  }
}
</script>
<style lang="scss" scoped>
#contain {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    height: 100%;
    ul {
      height: 100%;
    }
  }
  .contain_cont {
    display: flex;
    flex: 1;
    .router_cont {
      padding: 20px;
      width: 100%;
    }
  }
}
</style>
