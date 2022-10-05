<template>
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="spanlengths" :lg="spanlengths-1" :xl="spanlengths" v-for="item in selectdatas" :key="item.id">
      <selectss :value2="item.label" :options="item.values" :ref="item.ref" :multiple="item.multiple"></selectss>
    </el-col>
    <!-- <el-col v-if="isDates" :span="6"> -->
    <el-col v-if="isDates" :xs="4" :sm="4" :md="5" :lg="5" :xl="6">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeval"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
    </el-col>
    <!-- <div style="margin-left:10px;height:50px;width:50px;display:inline-block;"></div> -->
    <el-col :xs="{span: 2,offset:9}" :sm="{span: 2,offset:5}" :md="{span: 2}">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
import selectss from "./select.vue";
export default {
  components: {
    selectss,
  },
  props: {
    spanlength: {
      type: Number,
      require: true,
    },
    selectdata: {
      type: Array,
      require: true,
    },
    isDate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value1: "",
      spanlengths: this.spanlength,
      selectdatas: this.selectdata,
      isDates: this.isDate,
    };
  },
  methods: {
    changeval(){
      console.log("子组件当前选中的日期是:",this.value1);
      this.value1 == null ? 1 : this.$emit("SonDateChange",this.value1)
    }
  }
};
</script>

<style scoped lang="less">



.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  /* margin-left: 20px; */
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
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
</style>