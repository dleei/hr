<template>
  <dialog title="添加部门" :visible="showDialog" close="close">
    内容区域
  </dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
