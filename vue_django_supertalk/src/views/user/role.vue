<template>
  <div>
    <div class="table-header">
      <!-- <div style="display: inline-block; margin-left: 100%"> -->
      <div style="display: inline-block; margin-left: 90%">
        <el-button @click.native.prevent="add" size="small" type="primary">
          添加
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <el-table :data="roleDate" border style="width: 100%" max-height="550">
      <el-table-column
        fixed
        type="index"
        :index="indexs"
        label="序号"
        width="150px"
      >
      </el-table-column>
      <el-table-column prop="rolename" label="角色名" width="200px">
      </el-table-column>
      <el-table-column prop="permissonList" label="操作权限"> </el-table-column>
      <el-table-column label="是否启用" width="200px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isactivate"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value=1
            inactive-value=0
            @change="switchChange(val,scope.row.rolename)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="authorization(scope.$index, roleDate)"
            size="small"
            type="primary"
          >
            授权
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, roleDate)"
            size="small"
            type="danger"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      center
      @close="cancel"
      :destroy-on-close="true"
    >
      <el-form :model="form">
        <el-form-item label="角色名" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限分配" :label-width="formLabelWidth">
          <el-tree
            :data="datas"
            ref="tree"
            show-checkbox
            node-key="id"
            :props="datas"
            :default-checked-keys="form.permissionKey"
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="权限分配" :visible.sync="permissonDialog">
      <el-tree
        :data="datas"
        show-checkbox
        node-key="id"
        :props="datas"
        :default-expanded-keys="expandedKeys"
      >
      </el-tree>
    </el-dialog> -->
  </div>
</template>

<script>
import { get, post } from "../../utils/requests";
import qs from "qs"

export default {
  async created() {
    this.$store.state.roleList.length == 0
      ? (async () => {
          var datas = await get("/role/getallrole/");
          console.log(datas.data);
          datas.data.map(item=>{
            // let obj1 = {}
            let obj1 = item.fields
            obj1["isactivate"] = item.fields.isactivate
            this.$set(obj1,"isactivate",1)
            console.log("item.file===",obj1,item.fields.isactivate);
            this.$store.state.roleList.push(item.fields)
            this.roleDate.push(item.fields)
          })
        })()
      : this.$store.state.roleList.map((item) => {
        console.log("item",item.isactivate);
          this.roleDate.push(item);
        });
  },

  methods: {
    switchChange(val,rolename) {
      console.log(`switch的值改变了`, val,rolename);
    },

    async deleteRow(index, rows) {
      var results = await post("/role/deleterole/", {
        rolename: rows[index].rolename,
      });
      results.code == 5000
        ? rows.splice(index, 1) &&
          this.$message({ type: "success", message: "删除成功" })
        : this.$message.error("删除角色失败");
    },
    indexs(indexs) {
      return indexs + 1;
    },
    authorization(index, rows) {
      this.curryIndex = index;
      this.dialogFormVisible = true;
      this.title = "修改角色";
      this.form.rolename = rows[index].rolename;
      console.log(typeof rows[index].permissionkey);
      this.form.permissionKey =
        typeof rows[index].permissionkey === "string"
          ? rows[index].permissionkey.split(",")
          : rows[index].permissionkey;
      this.form.permissionText = rows[index].permission;
      this.form.isactivate = rows[index].isactivate;
    },
    add() {
      this.dialogFormVisible = true;
      this.title = "添加角色";
    },
    cancel() {
      this.form = {};
    },
    confirm() {
      var permise = "";
      this.$refs.tree.getCheckedNodes().map((item, index) => {
        permise = permise + item.label + ",";
      });
      var InputData = this.form;
      InputData.permissionText = permise.substring(0, permise.length - 1);
      InputData.permissionKey = this.$refs.tree.getCheckedKeys().toString();

      // 从这里开始
      this.title == "修改角色"
        ? (async () => {
            var results = await post("/role/updaterole/", qs.stringify(InputData));
            results.code == 3000
              ? (() => {
                  this.roleDate[this.curryIndex].permission =
                    results.data.permissionText;
                  this.roleDate[this.curryIndex].permissionkey =
                    results.data.permissionKey.split(",");
                  this.roleDate[this.curryIndex].rolename =
                    results.data.rolename;
                  this.roleDate[this.curryIndex].isactivate =
                    results.data.isactivate;
                  this.$message({
                    type: "success",
                    message: "更新角色成功",
                  });
                })()
              : this.$message.error("更新失败");
          })()
        : (async () => {
            console.log("添加角色");
            var results = await post("/role/addrole/", qs.stringify(InputData));
            results.code == 4000
              ? (() => {
                  InputData.permission = InputData.permissionText;
                  delete InputData.permissionText;
                  this.$store.state.roleList.push(InputData);
                  this.$message({
                    type: "success",
                    message: "添加成功",
                  });
                })()
              : this.$message.error("添加角色失败");
          })();
      // 到这里结束

      this.dialogFormVisible = false;
      this.form = {
        rolename: "",
        permissionKey: [],
        permissionText: "",
        isactivate: "",
      };
    },
  },
  data() {
    return {
      title: "增加角色",
      permissonDialog: false,
      formLabelWidth: "120px",
      value: true,
      expandedKeys: [],
      curryIndex: 0,
      form: {
        rolename: "",
        permissionKey: [],
        permissionText: "",
        isactivate: "",
      },
      dialogFormVisible: false,
      roleDate: [],
      datas: [
        {
          id: 1,
          label: "数据展示",
          children: [
            {
              id: 11,
              label: "超话数据分析",
            },
            {
              id: 12,
              label: "个人数据分析",
            },
          ],
        },
        {
          id: 2,
          label: "微博管理",
        },
        {
          id: 3,
          label: "数据爬取",
        },
        {
          id: 4,
          label: "系统用户管理",
          children: [
            {
              id: 13,
              label: "用户管理",
            },
            {
              id: 14,
              label: "角色管理",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
.table-header h3 {
  display: inline-block;
  margin-left: 20px;
}

.el-input {
  width: 250px;
}

.el-dialog {
  min-height: 60%;
  width: 35%;
}

.el-form {
  margin-left: 15%;
}
</style>
