<!--
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-14 16:04:24
 * @LastEditTime: 2022-04-22 23:12:38
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\views\dataShow\supertopic.vue
-->
<template>
  <div id="supertalk">
    <!-- <el-button type="primary">查询</el-button> -->
    <div>
      <div><h2>数据可视化</h2></div>
      <el-row :gutter="20">
        <el-col :span="4">
            <el-select
    v-model="value5"
    style="margin-left: 20px;"
    placeholder="请选择要改变的图">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
          <el-col :span="4">
            <el-select
    v-model="value1"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择城市">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
            <el-select
    v-model="value2"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择年份">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
            <el-select
    v-model="value3"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择周">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
            <el-select
    v-model="value4"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择指标">
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-col>
          <el-col :span="4"><el-button type="primary" size="small" @click="query">查询</el-button></el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
      <el-row :gutter="20">
          <el-col :span="12"><div id="topleft"></div></el-col>
          <el-col :span="11"><div id="topmiddle"></div></el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12"><div id="buttonleft"></div></el-col>
          <el-col :span="11"><div id="buttonmiddle"></div></el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12"><div id="topright"></div></el-col>
          <el-col :span="11"><div id="buttonright"></div></el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12">
            <div id="lowestleft"></div>
          </el-col>
          <el-col :span="11"><div id="lowestmiddle"></div></el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12">
            <div id="bestleft"></div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
// import * as echarts from "echarts";
import "echarts-wordcloud";
import qs from "qs"
import {post} from "../../utils/requests.js"
import {topleft,topright,topmiddle,buttonleft,buttonmiddle,buttonright,lowestleft,lowestmiddle,bestleft} from "../../utils/echartutil.js"
import {topMiddle,topLeft,buttonLeft,bottonRight,topRight,lowestLeft,lowestMiddle,buttonMiddle,bestLeft} from "../../api/echartapi.js"
var echartss;
export default {
  async mounted() {
    var echart = this.echarts
    var response = await topLeft()
    var topleftoption = topleft(response.data)
    echartss = echart.init(document.getElementById("topleft"))
    topleftoption && echartss.setOption(topleftoption)
    response = await topMiddle()
    var topmiddleoption = topmiddle(response.data)
    echartss = echart.init(document.getElementById("topmiddle"))
    topleftoption && echartss.setOption(topmiddleoption)
    response = await topRight()
    var toprightoption = topright(response.data)
    echartss = echart.init(document.getElementById("topright"))
    topleftoption && echartss.setOption(toprightoption)
    response = await buttonLeft()
    var buttonleftoption = buttonleft(response.data)
    echartss = echart.init(document.getElementById("buttonleft"))
    topleftoption && echartss.setOption(buttonleftoption)
    // var buttonmiddleoption = buttonmiddle("")
    // echartss = echart.init(document.getElementById("buttonmiddle"))
    // topleftoption && echartss.setOption(buttonmiddleoption)
    response = await buttonMiddle()
    this.echartsUtil(echart,"buttonmiddle",response.data,buttonmiddle)
    response = await bottonRight()
    this.echartsUtil(echart,"buttonright",response.data,buttonright)
    // var buttonrightoption = buttonright(response.data)
    // echartss = echart.init(document.getElementById("buttonright"))
    // topleftoption && echartss.setOption(buttonrightoption)
    response = await lowestLeft()
    this.echartsUtil(echart,"lowestleft",response.data,lowestleft)
    response = await lowestMiddle()
    this.echartsUtil(echart,"lowestmiddle",response.data,lowestmiddle)
    response = await bestLeft()
    this.echartsUtil(echart,"bestleft",response.data,bestleft)
  },
  methods:{
    echartsUtil(echart,ele,data,ctb){
      echartss = echart.init(document.getElementById(ele))
      var option = ctb(data)
      option && echartss.setOption(option)
    },
    async cc(ele,ctb,ctb2){
      if(this.value5 == ele){
        var response = await ctb(qs.parse({
            city:this.value1,
            week:this.value3,
            year:this.value2,
            target:this.value4
        }))
        response.msg != "ok" ? this.$message("请求失败了"):(()=>{
          this.clearEchart(ele,response,ctb2)
        })()
      }
    },
    async query(){
      if(this.value5 == ""){
        this.$message("必须要选择第一项")
        return
      }
      this.cc("topleft",topLeft,topleft)
      this.cc("topmiddle",topMiddle,topmiddle)
      this.cc("buttonleft",buttonLeft,buttonleft)
      this.cc("buttonmiddle",buttonMiddle,buttonmiddle)
      this.cc("topright",topRight,topright)
      this.cc("buttonright",bottonRight,buttonright)
      this.cc("lowestleft",lowestLeft,lowestleft)
      this.cc("lowestmiddle",lowestMiddle,lowestmiddle)
      this.cc("bestleft",bestLeft,bestleft)
      // if(this.value5 == "topmiddle"){
      //   var response = await topMiddle(qs.parse({
      //       city:this.value1
      //   }))
      //   response.msg != "ok" ? this.$message("请求失败了"):(()=>{
      //     this.clearEchart("topmiddle",response)
      //   })()
      // }
    },
    clearEchart(ele,response,ctb){
      var ec = this.echarts.getInstanceByDom(document.getElementById(ele))
      if (ec){
        ec.clear()
        var options = ctb(response.data)
        ec.setOption(options)
      }else{
        echartss = this.echarts.init(document.getElementById(ele))
        echartss.clear()
        var options = ctb(response.data)
        echartss.setOption(options)
        // echartss.setOption(response.data,true)
        // this.echartsUtil()
      }
      
    }
  },
  async created(){
    for(var i = 18;i<42;i++){
      this.options3.push({
        label:i,
        value:i
      })
    }
    var response = await post("/allcity/")
    response.data.forEach(item=>{
      this.options1.push({
        value:item,
        label:item
      })
    })
  },
  data(){
    return {
      value1:"",
      value2:"",
      value3:"",
      value4:"",
      value5:"",
      options1:[

      ],
      options2:[
        {
          label:"2013",
          value:"2013"
        },
        {
          label:"2014",
          value:"2014"
        },
        {
          label:"2015",
          value:"2015"
        },
        {
          label:"2016",
          value:"2016"
        },
        {
          label:"2017",
          value:"2017"
        },
        {
          label:"2018",
          value:"2018"
        },
        {
          label:"2019",
          value:"2019"
        },
      ],
      options3:[
        
      ],
      options4:[
        {
          label:"平均气压均值",
          value:"平均气压均值"
        },
        {
          label:"平均气温均值",
          value:"平均气温均值"
        },
        {
          label:"平均水气压均值",
          value:"平均水气压均值"
        },
        {
          label:"平均风速均值",
          value:"平均风速均值"
        },
        {
          label:"总日照时数",
          value:"总日照时数"
        },
        {
          label:"总降水量",
          value:"总降水量"
        },
        {
          label:"日照时数均值",
          value:"日照时数均值"
        },
        {
          label:"最低气压",
          value:"最低气压"
        },
        {
          label:"最低气压均值",
          value:"最低气压均值"
        },
        {
          label:"最低气温",
          value:"最低气温"
        },
        {
          label:"最低气温均值",
          value:"最低气温均值"
        },
        {
          label:"最大风速",
          value:"最大风速"
        },
        {
          label:"最大风速均值",
          value:"最大风速均值"
        },
        {
          label:"最小相对湿度",
          value:"最小相对湿度"
        },
        {
          label:"最小相对湿度均值",
          value:"最小相对湿度均值"
        },
        {
          label:"最高气压",
          value:"最高气压"
        },
        {
          label:"最高气压均值",
          value:"最高气压均值"
        },
        {
          label:"最高气温均值",
          value:"最高气温均值"
        },
        {
          label:"最高气温",
          value:"最高气温"
        },
        {
          label:"相对湿度均值",
          value:"相对湿度均值"
        },
        {
          label:"农用化肥施用量（折纯）_本年（吨）",
          value:"农用化肥施用量（折纯）_本年（吨）"
        },
        {
          label:"稻谷产量_本年（吨）",
          value:"稻谷产量_本年（吨）"
        },
        {
          label:"稻谷面积_本年（公顷）",
          value:"稻谷面积_本年（公顷）"
        },
      ],
      options5:[
        {
          label:"第一张图",
          value:"topleft"
        },
        {
          label:"第二张图",
          value:"topmiddle"
        },
        {
          label:"第三张图",
          value:"buttonleft"
        },
        {
          label:"第四张图",
          value:"buttonmiddle"
        },
        {
          label:"第五张图",
          value:"topright"
        },
        {
          label:"第六张图",
          value:"buttonright"
        },
        {
          label:"第七张图",
          value:"lowestleft"
        },
        {
          label:"第八张图",
          value:"lowestmiddle"
        },
        {
          label:"第九张图",
          value:"bestleft"
        }
      ],
    }
  }
};
</script>

<style scoped>
#topleft,#topright,#topmiddle,#bestleft {
  height: 500px;
  width: 500px;
}
#buttonmiddle,#buttonleft,#buttonright,#lowestleft,#lowestmiddle{
  height: 500px;
  width: 500px;
}
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

</style>