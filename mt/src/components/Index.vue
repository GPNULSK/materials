<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="8"><div>
        <el-button @click="toApplyMain">领料申请</el-button>
      </div></el-col>
      <el-col :span="8"><div>
        <el-button type="primary" @click="toApplications">我的申请</el-button>
      </div></el-col>

      <el-col :span="8"><div>
        <el-button type="success" @click="toChargerAudit">主管审批</el-button>
      </div></el-col>
    </el-row>

    <br><br>

    <el-row :gutter="20">
      <el-col :span="8"><div>
        <el-button  @click="toGK">归口会签</el-button>
      </div></el-col>
      <el-col :span="8"><div>
        <el-button type="primary" @click="toBL">仓管员备料</el-button>
      </div></el-col>

      <el-col :span="8"><div>
        <el-button type="success" @click="toLL">领料员确认</el-button>
      </div></el-col>
    </el-row>第二次部署
    <br>
    {{code}}<br>
    {{token}}<br>
    {{userId}}



  </div>

</template>

<script>

import axios from 'axios'
    export default {

        name: "Index",
        data(){
          return {
            token:'',
            code:'',
            userId:''
          }
        },

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


          //从URL中拿到企业微信的code
          let curUrl=window.location.href;
          console.log(curUrl)
          let dz_url = curUrl.split('#')[0]; //获取#/之前的字符串
          let cs = dz_url.split('?')[1]; //获取?之后的参数字符串
          let cs_arr = cs.split('&');    //参数字符串分割为数组
          let cs1={};

          for(let i=0;i<cs_arr.length;i++) {//遍历数组，拿到json对象
            cs1[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
          }
          this.code=cs1.code
          console.log('从企业微信获取到的code：'+cs1.code)



          let url='http://175.75.200.53:8006/springboot'
          //从后端拿token-----------------------------------------------------
          this.$ajax.get(this.apiUrl+'/wx/getToken').then(res=>{
            this.token=res.data
            console.log("从Redis拿到的token值："+res.data)
          })

        this.$ajax.get('/wx/dist').then(res=>{
          console.log(res.data)
        })

        //有了code和token后，发请求从企业微信获取用户id
          this.$ajax.get('http://localhost:8080/wx',{
            params: {
              suite_access_token:'VfIXGr4Fx4V9Ed-jMRzvzfdeGyqHiNrXnnVWCU-qW0-ekMfMupb-9wZFQMyhkQwcFhS89SagaAWXS9ugm1EHFbxnQKUx1JBnx9vQ2U83Dac_zeG8aEvLhnncq9IAcej73vrOnSGyt828IlL-jeXLoTWbVtbvCSHD1ZsVi5EiDOQIIwpFarN8bFBb6mbwSm1bHPBZvv-E2WfDxja_rbhDAA',
              code:this.code
            }
          }).then(res=>{
            let data=res.data
            console.log("根据code和token拿到的完整数据："+res.data)
            console.log('拿到的userId'+data.UserId)
            this.userId=data.UserId
          })

        //有了工号之后，从后端拿到用户名，并把工号和用户名放到global.vue的全局变量中
        this.$ajax.get(this.apiUrl+'/apply/loginUserInfo',{
          params: {
            uid:this.userId
          }
        }).then(res=>{
          console.log(res.data)
          let data=res.data
          console.log('拿到的用户名：'+data.usnm)
          this.$root.username=data.usnm
          this.$root.uid=data.usid
          console.log('拿到的用户id：'+this.$root.uid)
        })

      }
    }
</script>

<style scoped>

</style>
