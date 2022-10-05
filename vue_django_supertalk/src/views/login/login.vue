<template>
  <div class="login">
    <el-container>
      <!-- <el-aside width="490px">
        <div class="bgimg"></div>
      </el-aside> -->
      <el-main>
        <el-form
          v-if="islogin"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model="ruleForm.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="islogin=false">注册</el-button>
          </el-form-item>
        </el-form>

        <el-form
          v-else
          :model="ruleForm2"
          status-icon
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名称" prop="username">
            <el-input
              type="text"
              v-model="ruleForm2.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass1">
            <el-input
              type="password"
              v-model="ruleForm2.pass1"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确定密码" prop="pass2">
            <el-input
              type="password"
              v-model="ruleForm2.pass2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerUSer"
              >提交</el-button
            >
            <el-button @click="islogin= true">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { post } from "../../utils/requests.js";
import qs from "qs";

export default {
  // created() {
  //   console.log("触发了登录页面");
  // },

  data() {
    var usernameValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      islogin:true,
      ruleForm: {
        pass: "",
        userName: "",
      },
      ruleForm2:{
        username: "",
        pass1:"",
        pass2:""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        userName: [{ validator: usernameValidate, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            var datas = await post(
              "/login/",
              qs.stringify({
                username: this.ruleForm.userName,
                password: this.ruleForm.pass,
              })
            );
            if (datas.code == 200) {
              localStorage.setItem("username",this.ruleForm.userName)
              this.$router.push(
                { path: "/home/supertopic" },
                () => {
                  console.log("导航跳转");
                },
                (err) => {
                  console.log(`导航错误`, err);
                }
              );
              this.$message("登录成功");
            } else {
              this.$message(datas.msg);
            }
          } catch (err) {
            this.$message(err);
          }
        } else {
          this.$message("登录失败,请检查你的用户名或者密码是否正确");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async registerUSer(){
      let response = await post("/register/",qs.stringify({
                username: this.ruleForm2.username,
                pass1: this.ruleForm2.pass1,
                pass2: this.ruleForm2.pass2,
              }))
      this.$message({
        type:"success",
        message:response.msg
      })
      this.islogin = true
    }
  },
};
</script>

<style scoped>
.login {
  height: 100%;
  /* background-color: #005cf5; */
  background-image: url("../../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.el-aside {
  border: 5px solid rgb(16, 181, 223);
  overflow: hidden;
}

.bgimg {
  width: 490px;
  height: 480px;
  /* background-image: url("../../assets/images/maid.jpg"); */
  background-size: 490px 480px;
  opacity: 0.5;
}

.el-main {
  /* border: 1px solid #ffffff; */
  display: flex;
  align-items: center;
  /* background-color: #ffffff; */
  opacity: 0.5;
  height: 325px;
  width: 450px;
}

.el-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-form-item__label {
  font-weight: 700;
}
</style>
