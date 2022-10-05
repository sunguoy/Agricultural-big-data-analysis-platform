<!--
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-03-31 21:08:14
 * @LastEditTime: 2022-04-26 11:45:19
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\components\tables.vue
-->
<template>
  <el-table
    border
    empty-text="暂无数据"
    row-key="id"
    :data="tableDatas"
    stripe
    fit
    :highlight-current-row="true"
    style="width: 100%"
    @cell-click = "cellclick"
    :tree-props="{children: 'children'}">
  >
  <el-table-column
      type="index"
      label="id"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      v-for="(value, key) in tableLabels"
      :prop="key"
      :label="value"
      :key="key"
      align="center"
      :show-overflow-tooltip="true"
      :width="width"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      width="100"
      v-if="isshow"
      >
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      require: true,
    },
    tableLabel: {
      type: Object,
      require: true,
    },
    cellclicks:{
      type:Function,
    },
    queryhistory:{
      type:Function
    },
    isshow:{
      type:Boolean,
      default:false
    },
    height:{
      type:Number,
      default:630
    },
    width:{
      type:Number,
      default:220,
    }
  },
  data() {
    return {
      tableDatas: this.tableData,
      tableLabels: this.tableLabel,
      defaultSorts:this.defaultSort,
    };
  },
  methods: {
      widths(val){
          console.log("触发了",val);
          return `${val.length *10}px`
      },
      cellclick(row, column, cell, event){
        // console.log(row, column, cell, event);
        if(column["label"] == "用户名"){
          this.cellclicks(row, column, cell, event)
        }
        
      },
      handleClick(row){
        console.log(row);
        this.queryhistory(row["uid"])
      },
      indexMethod(index){
        return index + 1
      }
  },
};
</script>

<style></style>
