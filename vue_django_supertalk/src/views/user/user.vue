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
        width="120"
      ></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="rolename" label="角色名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editorUser(scope.$index, roleDate)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, roleDate)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog">
      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        center
        width="670px"
        :destroy-on-close="true"
        @close="cancel"
      >
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input
              v-model="form.password"
              autocomplete="off"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="角色名" :label-width="formLabelWidth">
            <el-select v-model="form.rolename" placeholder="请选择角色名">
              <el-option
                v-for="(role, index) in roleList"
                :key="index"
                :label="role.rolename"
                :value="role.rolename"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addOrUpdateUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { get, post } from "../../utils/requests.js";
import qs from "qs";

export default {
  async created() {
    let response = await get("/role/getalluser/")
    console.log(response);
    response.data.map(item=>{
      this.roleDate.push(item)
    })
  },

  methods: {
    async deleteRow(index, rows) {
      var results = await post("/role/deleteuser/", qs.stringify({
        username: rows[index].username,
      }));
      if (results.msg == "删除成功") {
        rows.splice(index, 1);
        this.$message({
          message: "删除成功",
          center: true,
          type: "success",
        });
      } else {
        this.$message.error("删除失败");
      }
    },

    editorUser(index, data) {
      console.log("当前的索引是:", index, data);
      this.title = "编辑用户";
      this.form = data[index];
      this.currentindex = index
      this.dialogFormVisible = true;
    },

    addOrUpdateUser() {
      this.dialogFormVisible = false;
      console.log(this.title);
      this.title == "添加用户" ? this.addUser() : this.updateUser();
      this.form = {};
    },

    async addUser() {
      var datas = this.form;
      var results = await post("/role/adduser/", qs.stringify(this.form));
      results.msg == "添加成功"
        ? (() => {
            this.roleDate.push(datas);
            this.$message({
              type: "success",
              message: "添加用户成功",
            });
          })()
        : this.$message.error("添加用户失败");
    },

    async updateUser() {
      // console.log("需要更新的信息是:", this.form);
      var result = await post("/role/updateuser/", qs.stringify(this.form));
      this.roleDate[this.currentindex] = this.form
      result.msg == "更新用户成功"
        ? this.$message({
            type: "success",
            message: "更新成功",
          })
        : this.$message.error(result.msg);
    },

    add() {
      this.dialogFormVisible = true;
      this.title = "添加用户";
    },
    cancel() {
      console.log("dialog窗口被关闭了");
      this.dialogFormVisible = false;
      this.form = {
        username: "",
        password: "",
        rolename: "",
      };
    },
    indexs(index) {
      return index + 1;
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      value: "",
      formLabelWidth: "80px",
      roleList: [
        {"rolename":"admin"}
      ],
      currentindex:0,
      form: {
        username: "",
        password: "",
        rolename: "",
      },
      roleDate: [],
      title: "",
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

.el-form {
  /* display: flex;
  justify-content: center; */
  margin-left: 25%;
}
</style>
