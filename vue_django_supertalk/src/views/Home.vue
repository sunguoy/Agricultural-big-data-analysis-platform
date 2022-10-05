
<template>
  <div class="body">
    <el-container style="border: 1px solid #eee; height: 100%; weight: 100%">
      <el-aside width="200px">
        <div
          style="
            height: 60px;
            padding-bottom: 10px;
            border-right: solid 1px #e6e6e6;
          "
        >
          <!-- <img
            src="../assets/images/jf-logo.png"
            style="width: 225px; height: 60px"
          /> -->
        </div>
        <el-menu router @select="selects" :default-active="$route.path">
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据展示</span>
            </template>
            <el-menu-item index="/home/supertopic">数据分析</el-menu-item>
          </el-submenu>
                    <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据模型预测</span>
            </template>
            <el-menu-item index="/home/forecast">模型预测</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header
          style="text-align: right; font-size: 12px; background-color: #fff"
        >
          <el-row :gutter="20">
            <el-col :span="22">
              <div class="grid-content bg-purple" style="padding-top: 20px">
                <div>
                  <svg
                    t="1644739369788"
                    style="width: 25px; height: 25px; float: left"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1799"
                    width="128"
                    height="128"
                  >
                    <path
                      d="M131.11 192.37m32.17 0l700.08 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-700.08 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z"
                      fill="#1296db"
                      p-id="1800"
                    ></path>
                    <path
                      d="M131.11 766.83m32.17 0l700.08 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-700.08 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z"
                      fill="#1296db"
                      p-id="1801"
                    ></path>
                    <path
                      d="M449.33 385.09m32.17 0l381.87 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-381.87 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z"
                      fill="#1296db"
                      p-id="1802"
                    ></path>
                    <path
                      d="M449.33 578.11m32.17 0l381.87 0q32.17 0 32.17 32.17l0 0q0 32.17-32.17 32.17l-381.87 0q-32.17 0-32.17-32.17l0 0q0-32.17 32.17-32.17Z"
                      fill="#1296db"
                      p-id="1803"
                    ></path>
                    <path
                      d="M129.91 512.16L321.14 639.7V384.62L129.91 512.16z"
                      fill="#1296db"
                      p-id="1804"
                    ></path>
                  </svg>
                </div>
                <div class="page-header">
                  <el-breadcrumb separator="">
                    <el-breadcrumb-item :to="defaultacvite">{{
                      currentpage
                    }}</el-breadcrumb-item>
                    <el-breadcrumb-item
                      :to="defaultacvite"
                    ></el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-avatar
                  src="https://img0.baidu.com/it/u=1027351087,2864960677&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  fit="fill"
                  :size="45"
                ></el-avatar>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    {{ userInfo
                    }}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="clearfix">
                      退出登录
                      <el-badge class="mark" />
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- <el-divider></el-divider> -->
        <el-main>
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-remove="removeTab"
            @tab-click="tabclick"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :router="item.router"
              :closable="isclose(item.name)"
              :lazy="true"
            >
            </el-tab-pane>
          </el-tabs>
                        <keep-alive>
                <router-view></router-view>
              </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {get} from "../utils/requests"
// import {dynamicOptions} from "../api/datareport.js"
export default {
  async created(){
    let response = await get("/role/getallrole/")
    console.log("home的response",response);
  },
  data() {
    return {
      isCollapse: true,
      editableTabsValue: "" /*  */,
      editableTabs: [],
      tabIndex: 1,
      defaultacvite: "",
      currentpage: "数据分析",
      userInfo: "",
      menuList: {},
    };
  },
  methods: {
    isTrue(name) {
      var bool1 = false;
      for (var item of this.editableTabs) {
        console.log("当前的结果是:", item.name == name);
        if (item.name == name) {
          bool1 = true;
        }
      }
      return bool1;
    },
    selects(val, index) {
      console.log("触发了呀", val, index);
    },
    addTab(targetName, handlername) {
      console.log(targetName);
      this.isTrue(targetName)
        ? console.log("已经存在标签了")
        : (() => {
            this.editableTabs.push({
              title: targetName,
              name: targetName,
              content: targetName,
              router: handlername,
            });
            this.editableTabsValue = targetName;
          })();
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      console.log("removetab", activeName, targetName);
      let rout = "";
      // 首先需要判断当前要关闭的标签是否和当前激活的标签是否相等
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              rout = nextTab.router;
            }
          }
        });
        this.editableTabsValue = activeName;
      }
      if (rout != "") {
        this.$router.push({ path: rout });
      }
      this.editableTabs = tabs.filter(
        (tab) => tab.name !== targetName
      ); /* 筛选出不等于要移除的标签的tab*/
    },
    tabclick(targername, name) {
      this.defaultacvite = this.$route.path;
      this.$router.push({ path: targername.$attrs.router });
    },
    isclose(name) {
      if (name == "数据分析") {
        return false;
      }
      return true;
    },
  },
  async created() {
    localStorage.getItem("username") == null  ? this.$router.push({path:"/login"}):this.userInfo = localStorage.getItem("username")
    this.addTab(this.$route.meta.title, this.$route.path);
    this.defaultacvite = this.$route.path; /* 当前激活的路由对应的标签 */
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  watch: {
    $route: function (val) {
      if (this.isTrue(val.meta.title)) {
        this.editableTabsValue = "";
      } else {
        this.addTab(val.meta.title, val.name);
      }
      this.editableTabsValue = val.meta.title;
      this.defaultacvite = val.name;
      this.currentpage = val.meta.title;
    },
    immediate: true,
    deep: true,
  },
};
</script>

<style lang="less" >
.body {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.logo {
  width: 200px;
  float: left;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

img{
  vertical-align: middle;
}

.el-col {
  border-radius: 4px;
}

.bg-purple {
  display: flex;
  align-items: center;
  // justify-content: center;
  // visibility: middle;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

/* .icon{
     width: 12px;
     height: 12px;
  } */

.page-header {
  padding-left: 50px;
  padding-top: 5px;
}
</style>