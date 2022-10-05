<!--
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-11 08:59:38
 * @LastEditTime: 2022-04-26 11:04:05
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\views\datacrawl\exportdata.vue
-->
<template>
    <div class="tab">
        <selects :spanlength="4" :isDate="true" :selectdata="selectoptons" ref="select1" @SonDateChange="sondata">
            <div class="buttongroup">
            <el-button type="success" round @click="query">查询</el-button>
            <el-button type="primary" round @click="exportData"
              >导出</el-button
            >
          </div>
        </selects>
        <el-divider></el-divider>
        <tables :isshow="true" :cellclicks="cellclick" :queryhistory="queryhistory" :tableData="tabledata" :tableLabel="tablelabel"></tables>
        <el-pagination
  background
  :page-size="10"
  :page-count="6"
  layout="prev, pager, next"
  :total="total"
  @current-change="changedata"
  >
</el-pagination>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-descriptions title="用户信息" :column="3" size="" border>
                <el-descriptions-item v-for="(key,value,index) in userinfo" :key="index" :label="value">{{key}}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible2" width="53%">
            <tables :height="300" :tableData="tabledata2" :tableLabel="tablelabel2" />
        </el-dialog>
    </div>
</template>

<script> 
import tables from "../../components/tables"
import selects from "../../components/selects"
import {post,get} from "../../utils/requests"
import {csvUtil,comment} from "../../utils/utils"
import qs from "qs"
export default {
    components:{
        selects,
        tables
    },
    data(){
        return {
            selectoptons :[
                {
                    values:[
                        {
                            value:"depressed",
                            label:"抑郁"
                        },
                        {
                            value:"daily",
                            label:"日常"
                        }
                    ],
                    label:"超话类别",
                    ref:"supertype",
                },
                {
                    values:[
                        {
                            value:"m",
                            label:"男"
                        },
                        {
                            value:"f",
                            label:"女"
                        }
                    ],
                    label:"性别",
                    ref:"sex"
                }
            ],
            tablelabel:{
                text_id:"文本id",
                user_name:"用户名",
                attitudes_count:"点赞数",
                comments_count:"评论数",
                content:"微博内容",
            },
            userinfo:{},
            tabledata:[],
            tabledata2:[],
            tablelabel2:{
                user_name:"用户名",
                content:"微博内容",
                attitudes_count:"点赞数",
                comments_count:"评论数",
            },
            sondate:"",
            total:0,
            dialogVisible:false,
            dialogVisible2:false,
            alldata:[],
        }
    },
    methods:{
        async query(){
            let data = {
                t:this.sondate,
                type:this.$refs.select1.$refs.supertype[0].value,
                gender:this.$refs.select1.$refs.sex[0].value,
            }
            console.log(data);
            let response = await post("/api/querydata/",qs.stringify(data))
            console.log(response);
            this.comment2(response.data,this.alldata,this.tabledata)
            // comment(response.data,this.tablelabel,this.tabledata)
        },
        async exportData(){
            let response = await get("/api/download/")
            csvUtil(this.tablelabel,response.data)
        },
        sondata(val){
            console.log(val);
            this.sondate = val
            this.sondate[1] = this.sondate[1].replace("00:00:00","23:59:59")
        },
        comment2(datas, Data,tabledata) {
            let res
            typeof datas == "string" ? res = JSON.parse(datas) : res = datas
            Data.length = 0;
            this.total = res.length;
            res.forEach((item) => {
            Data.push(item);
            });
            var newdata = res.splice(0,10)
            newdata.forEach((item) => {
                tabledata.push(item)
            })
        },
        cellclick(row, column, cell, event){
            console.log("被点击了");
            console.log(row, column, cell);
            this.userinfo["用户名"] = row["user_name"]
            this.userinfo["性别"] = row["gender"]
            this.userinfo["uid"] = row["uid"]
            this.userinfo["关注数"] = row["follow_count"]
            this.userinfo["粉丝数"] = row["followers_count"]
            this.userinfo["微博数"] = row["statuses_count"]
            this.dialogVisible = true
        },
        changedata(pagesize){
            console.log("被点击了",pagesize);
            this.tabledata.length = 0;
            var newdata= this.alldata.slice((pagesize-1)*10,pagesize*10)
            newdata.forEach(item=>{
                this.tabledata.push(item)
            })
        },
        async queryhistory(uid){
            console.log("开始发送请求");
            var response = await get(`/api/queryhistory/?uid=${uid}`)
            comment(response.data,this.tablelabel2,this.tabledata2)
            this.dialogVisible2 = true
        }
    }
}
</script>

<style scoped>
.buttongroup{
    display:flex;
}

.selecttype{
    line-height:40px;
    margin: 0 10px;
}

/* ::v-deep /deep/ */
.tab >>> .el-descriptions__header{
    justify-content:center!important;
}
</style>