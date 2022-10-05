<!--
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-14 16:03:57
 * @LastEditTime: 2022-04-22 23:12:31
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\views\dataShow\person.vue
-->
<template >
  <div id="person">
      <el-row :gutter="20">
          <el-col :span="7"><div id="ttopleft"></div></el-col>
          <el-col :span="8"><div id="ttopmiddle"></div></el-col>
          <el-col :span="7"><div id="ttopright"></div></el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="10"><div id="tbuttonleft"></div></el-col>
          <el-col :span="10"><div id="tbuttonmiddle"></div></el-col>
      </el-row>
  </div>
</template>

<script>
// import * as echartss from "echartss";
import "echarts-wordcloud";
import {topleft,bbuttonleft,ttopmiddle,tbuttonmiddle,ttopright,} from "../../utils/echartutil.js"
import {ttopmiddles,ttoprights,buttonmiddles,buttonlefts,ttopleft} from "../../api/echartapi"
var echartss
export default {
    async activated(){
    this.ishow = true;
  },
  deactivated() {
        console.log("组件被离开了呀");
        this.ishow = false;
        // echartss.clear();
        // echartss.dispose();
        console.log(echartss);
  },
    async mounted() {
    var echartsss = this.echarts
    var response = await ttopleft()
    console.log("当前person的实例",echartss);
    if(echartss!=undefined){
        echartss.dispose();
    }
    echartss = echartsss.init(document.getElementById("ttopleft"))
    var topleftoption = topleft("个人评论词云图",response.data)
    echartss.setOption(topleftoption);
    response = await ttopmiddles()
    echartss = echartsss.init(document.getElementById("ttopmiddle"))
    var ttopmiddleoption = ttopmiddle(response.data)
    ttopmiddleoption && echartss.setOption(ttopmiddleoption)
    response = await buttonmiddles()
    var tbuttonmiddleoption = tbuttonmiddle(response.data)
    echartss = echartsss.init(document.getElementById("tbuttonmiddle"))
    tbuttonmiddleoption && echartss.setOption(tbuttonmiddleoption)
    response = await ttoprights()
    var ttoprightoption = ttopright(response.data)
    echartss = echartsss.init(document.getElementById("ttopright"))
    ttoprightoption && echartss.setOption(ttoprightoption)
    response = await buttonlefts()
    var bbuttonleftoption = bbuttonleft(response.data)
    echartss = echartsss.init(document.getElementById("tbuttonleft"))
    bbuttonleftoption&& echartss.setOption(bbuttonleftoption)
    },
    data(){
        return {
            ishow:false,
            echartss:"",
        }
    }
}
</script>

<style scoped>
#ttopleft,#ttopright,#ttopmiddle {
  height: 500px;
  width: 100%;
}
#tbuttonmiddle,#tbuttonleft{
  height: 600px;
  width: 650px;
}
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

</style>