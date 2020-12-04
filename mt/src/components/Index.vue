<template>
  <div>

    <el-row :gutter="20">
      <el-col :span="8"><div>
        <el-button @click="toApplyMain" :disabled="isAble">领料申请</el-button>
      </div></el-col>
      <el-col :span="8"><div>
        <el-button type="primary" @click="toApplications" :disabled="isAble">我的申请</el-button>
      </div></el-col>

      <el-col :span="8"><div>
        <el-button type="success" @click="toChargerAudit" :disabled="isAble">主管审批</el-button>
      </div></el-col>
    </el-row>

    <br><br>

    <el-row :gutter="20">
      <el-col :span="8"><div>
        <el-button  @click="toGK" :disabled="isAble">归口会签</el-button>
      </div></el-col>
      <el-col :span="8"><div>
        <el-button type="primary" @click="toBL" :disabled="isAble">仓管员备料</el-button>
      </div></el-col>

      <el-col :span="8"><div>
        <el-button type="success" @click="toLL" :disabled="isAble">领料员确认</el-button>
      </div></el-col>
    </el-row>



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
            userId:'',
            fakeUserId:'',
            result:'',
            loginFailed:false,
            isAble:true
          }
        },

        methods: {
          toApplyMain(){

            if(this.loginFailed){
              this.$router.push('/error')
            }else{
				      this.$router.push("/applyMain")
			      }

          },

          toApplications(){
            if(this.loginFailed){
              this.$router.push('/error')
            }else{
              this.$router.push('/applications')
            }
          },

          toChargerAudit(){
            if(this.loginFailed){
              this.$router.push('/error')
            }else{
              this.$router.push('/auditList')
            }
          },

          toBL(){
            if(this.loginFailed){
              this.$router.push('/error')
            }else{
              this.$router.push('/readyList')
            }

          },

        toLL() {
          if (this.loginFailed) {
            this.$router.push('/error')
          } else {
            this.$router.push('/sureList')
          }
        },

          toGK(){
            if(this.loginFailed){
              this.$router.push('/error')
            }else{
              this.$router.push('/GkList')
            }
          }
		},

      created() {

        sessionStorage.clear();
        // 有了工号之后，从后端拿到用户名，并把工号和用户名放到global.vue的全局变量中
        // 测试使用
        this.$ajax.get(this.apiUrl+'/apply/loginUserInfo',{
          params: {
            uid:'682504'
          }
        }).then(res=>{
          console.log(res.data)
          let data=res.data
          console.log('拿到的用户名：'+data.usnm)
          this.$root.username=data.usnm
          this.$root.uid=data.usid
          this.isAble=false
          sessionStorage.setItem("curUser",data.usnm)
          sessionStorage.setItem("curUid",data.usid)
          console.log('拿到的用户id：'+this.$root.uid)
        })


        //开发环境下使用
        //   if( this.$root.username!='' && this.$root.uid!=''){
        //     console.log("用户名和工号不为空")
        //   }else{
        //     //方便后端观察用户名和id
        //     this.$ajax.get(this.apiUrl+'/wx/nameIsNull',{
        //       params: {
        //         name:this.$root.username,
        //         uid:this.$root.uid
        //       }
        //     })
        //
        //     console.log("用户名和工号为空")
        //     //从URL中拿到企业微信的code
        //     let curUrl=window.location.href;
        //     console.log(curUrl)
        //     let dz_url = curUrl.split('#')[0]; //获取#/之前的字符串
        //     console.log(dz_url)
        //     let cs = dz_url.split('?')[1]; //获取?之后的参数字符串
        //     console.log(cs)
        //     let cs_arr = cs.split('&');    //参数字符串分割为数组
        //     console.log('分割后的值:'+cs_arr)
        //     let cs1={};
        //
        //     for(let i=0;i<cs_arr.length;i++) {//遍历数组，拿到json对象
        //       cs1[cs_arr[i].split('=')[0]] = cs_arr[i].split('=')[1]
        //     }
        //     console.log(cs1)
        //     this.code=cs1.code
        //     console.log('从企业微信获取到的code：'+cs1.code)
        //
        //     this.$message({
        //       message:'正在获取用户登录信息，请等待..',
        //       type:'warming'
        //     })
        //     this.$ajax.get(this.apiUrl+'/wx/getUser',{
        //       params: {
        //         code:this.code
        //       }
        //     }).then(res=>{
        //       this.userId=res.data
        //
        //       //有了工号之后，从后端拿到用户名，并把工号和用户名放到global.vue的全局变量中
        //       this.$ajax.get(this.apiUrl+'/apply/loginUserInfo',{
        //         params: {
        //           uid:this.userId
        //         }
        //       }).then(res=>{
        //
        //         let data=res.data
        //         if(data==null || data==''){
        //           this.loginFailed=true
				//           console.log(this.loginFailed)
        //           this.$message({
        //             message:'获取登录信息失败，请重试',
        //             type:'error'
        //           })
        //           return
        //         }
        //         this.$message({
        //           message:'用户登录信息获取成功',
        //           type:'success'
        //         })
        //         this.isAble=false
        //         console.log('拿到的用户名：'+data.usnm)
        //         this.$root.username=data.usnm
        //         this.$root.uid=data.usid
        //         sessionStorage.setItem("curUser",data.usnm)
        //         sessionStorage.setItem("curUid",data.usid)
        //         console.log('拿到的用户id：'+this.$root.uid)
        //       })
        //     }).catch(err=>{
        //       this.$message({
        //         message:'获取用户id失败',
        //         type:'error'
        //       })
        //     })
        //   }

        }
    }
</script>

<style scoped>

</style>
