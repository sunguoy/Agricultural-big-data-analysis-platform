<!--
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-25 12:08:49
 * @LastEditTime: 2022-04-26 12:06:56
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\views\weiboManager\weibomanger.vue
-->
<template>
<div>
  <div class="search">
  <el-input placeholder="请输入uid" v-model="input1" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
  </div>
  <tables :width="180" :tableData="tabledata" :tableLabel="tablelabel">
    <el-table-column
      label="操作"
      width="100"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </tables>
  <el-pagination
  background
  :page-size="10"
  :page-count="6"
  layout="prev, pager, next"
  :total="total"
  @current-change="changedata"
  >
</div>
</template>

<script>
import tables from "../../components/tables.vue"
import {get} from "../../utils/requests.js"
var alldata;
export default {
  components:{
    tables
  },
  async created() {
    var response = await get("/api/queryuserinfo/")
    console.log(response);
    alldata = response.data;
    alldata.slice(0,10).forEach(item=>{
      this.tabledata.push(item)
    })
  },
  data() {
    return {
      tabledata:[],
      tablelabel:{
        uid:"用户id",
        nick_name:"用户名",
        gender:"性别",
        hometown:"出生地",
        brief_introduction:"简介",
        tweets_num:"微博数",
        follows_num:"关注数",
        fans_num:"粉丝数"
      },
      input1:"",
      total:0,
    };
  },
  methods: {
    changedata(){
        console.log("被点击了",pagesize);
        this.tabledata.length = 0;
        var newdata= this.alldata.slice((pagesize-1)*10,pagesize*10)
        newdata.forEach(item=>{
            this.tabledata.push(item)
        })
    },
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.search{
  display: float;
  width:300px;
  float: right;
  margin-bottom: 20px;
  margin-right: 40px;
}
</style>