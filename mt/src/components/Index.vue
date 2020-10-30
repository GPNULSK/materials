<template>
  <div>
    <el-button @click="toApplyMain">领料申请</el-button>
    <el-button type="primary" @click="toApplications">我的申请</el-button>
    <el-button type="success" @click="toChargerAudit">主管审批</el-button><br><br>

    <el-button  @click="toGK">归口会签</el-button>
    <el-button type="primary" @click="toBL">仓管员备料</el-button>
	  <el-button type="success" @click="toLL">领料员确认</el-button>
  </div>

</template>

<script>
      const apiUrl='http://localhost:8082'
    export default {
        apiUrl,
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

          toGK(){
            this.$router.push('/GkList')
          }
		},

      created() {
          this.$ajax.get('http://localhost:8082/apply/loginUserInfo',{
            params: {
				    uid:'114200563'
			      }
          }).then(res=>{
           console.log(res.data)
           let data=res.data
           
            this.$root.username=data.usnm
            this.$root.uid=data.usid
			 console.log(this.$root.uid)
          })
      }
    }
</script>

<style scoped>

</style>
