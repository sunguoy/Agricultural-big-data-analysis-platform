<template>
  <el-select
    v-model="value"
    :multiple="multiples"
    collapse-tags
    style="margin-left: 20px"
    :placeholder="placeholders"
    @change="optionschangeVal"
    reserve-keyword
    filterable
    size="medium"
    
  >
    <el-option
      v-for="item in option"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value2: {
      type: String,
      require: true,
    },
    options: {
      type: Array,
      require: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      label: this.fromName,
      value: this.value2,
      option: this.options,
      placeholders: this.value2,
      multiples: this.multiple,
    };
  },
  methods: {
    optionschangeVal(val) {
      console.log("当前的val是:", val);
      if (this.$store.state.newoldcustomer) {
        this.$store.state.newoldcustomer[this.label] = val;
        console.log(this.$store.state.newoldcustomer);
      }
    },
  },
};
</script>

<style>
.el-col-3 {
  width: 14%;
}
</style>
