<template>
  <div class="crawl">
    <!-- <span v-for="(key,val,index) in tablelabel" :key="index">
      {{key}} -- {{val}} -- {{index}}
    </span> -->
    <div class="select">
      <span class="selecttype">选择类别</span>
      <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="crawl" :loading="isloading">开始采集</el-button>
    </div>
    <el-divider></el-divider>
    <tables :tableData="tableDatas" :tableLabel="tablelabel">
    </tables>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="10"
  @current-change="change"
  :total="dataLengeth">
</el-pagination>
  </div>
</template>

<script>
import {post,get} from "../../utils/requests.js"
import tables from "../../components/tables.vue"
export default {
  components:{
    tables
  },
    data() {
      return {
          value:"",
          isloading:false,
          options:[
            {
              value:"depressed",
              label:"抑郁症"
            },
            {
              value:"daily",
              label:"日常"
            },
          ],
          tablelabel:{
            "uid":"用户id",
            "text_id":"文本id" ,
            "user_name":"用户名",
            "created_time":"发布时间",
            "attitudes_count":"点赞数",
            "comments_count":"评论数",
            "follow_count":"回复数",
            "statuses_count":"历史发帖总数",
            "description":"个人简介",
            "day":"昼夜",
            "gender":"性别",
            "content":"微博内容",
          },
        tableDatas: [],
        tableData: [],
        value1:"",
        dataLengeth:0,
        isbreak:false,
      }
    },
    methods:{
      async crawl(){
        if(this.value == ""){
          this.$message({
          message: '请先选择采集的类型',
          type: 'warning'
        });
        return
        }
        await post("/api/crawl/",{
          types:this.value
        })
        this.isloading = true
        this.tableData.length = 0
        let s = null
        s = setInterval(async ()=>{
          let response = await get(`/api/data/?type=${this.value}`)
          this.dataLengeth = response.data.length
          response.data.forEach((item,index)=>{
            if(item.text_id == "爬取完毕"){
              this.isbreak = true
            }else{
              if(index>this.tableData.length){
              this.tableData.push(item)
            }
            }
          })
          if(this.isbreak){
            this.$message({
              type:"success",
              message:"采集完成"
            })
            this.isloading = false
              this.isbreak = false
              clearInterval(s)
          }
          console.log(this.tableData);
        },5000)
      },
      change(val){
        console.log(val);
        let data = this.tableData.splice(10*(val-1),10*val)
        this.tableDatas.length = 0
        data.forEach(item=>{
          this.tableDatas.push(item)
        })
      }
    },
    watch:{
      tableData(newval,oldval){
        console.log("更新了数据");
        if(this.tableDatas.length != 0){
          console.log("存在数据了");
        }else{
          let datas = newval.splice(0,10)
          datas.forEach(item=>{
            this.tableDatas.push(item)
          })
        }
      }
    }
}
</script>

<style lang="less">
.select{
  display: flex;
}

.selecttype{
  line-height:40px;
  margin:0 10px;
}

th{
  // min-width: 300px!important;
  width: fit-content!important;
}
</style>