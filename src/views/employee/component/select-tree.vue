<template>
  <el-cascader :options="depts" size="mini" :props="{label: 'name'}" />
</template>

<script>
import { getDepartments } from '@/api/department'
import { transListToTree } from '@/utils'
export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      depts: []
    }
  },
  create() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.depts = transListToTree(await getDepartments())
    }
  }
}
</script>

<style scoped lang="scss">
.el-cascader {
    width: 345px;
}
</style>>

