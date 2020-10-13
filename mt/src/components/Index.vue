<template>
  <div>
    <el-button @click="toApplyMain">领料申请</el-button>
    <el-button type="primary">我的申请</el-button>
    <el-button type="success">我的审批</el-button>
  </div>

</template>

<script>
    export default {
        name: "Index",
      methods: {
        toApplyMain(){
          this.$router.push("/applyMain")
        }
      },

    }
</script>

<style scoped>

</style>
