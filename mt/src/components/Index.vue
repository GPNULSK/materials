<template>
  <div>
    <el-button @click="toApplyMain">领料申请</el-button>
    <el-button type="primary" @click="toApplications">我的申请</el-button>
    <el-button type="success" @click="toChargerAudit">主管审批</el-button><br>

    <el-button type="success" @click="toBL">仓管员备料</el-button>
	<el-button type="success" @click="toLL">领料员确认</el-button>
  </div>

</template>

<script>
    export default {
        name: "Index",
      methods: {
        toApplyMain(){
          this.$router.push("/applyMain")
        },
        toApplications(){
          this.$router.push('/applications')
        },

        toChargerAudit(){
          this.$router.push('/auditList')
        },
        toBL(){
          this.$router.push('/readyList')
        },
			
		toLL(){
          this.$router.push('/sureList')
        },
		},


    }
</script>

<style scoped>

</style>
