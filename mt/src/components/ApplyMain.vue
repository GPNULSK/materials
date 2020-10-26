<template>
  <div>
    <!--      使用header main footer布局-->
    <el-container>
      <!--  header开始-->
      <el-header style="">
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <!-- header结束-->

      <!--   main开始-->
      <el-main style="padding:0">
        <el-form  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <span>物料代码:</span>
        <el-input v-on:click.native="toSelectId" v-model="materialCode" style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>

        <span>物料名称:</span>
        <el-input :disabled="true" v-model="materialName" style="width: 200px" size="mini" ></el-input>
        <br><br>

        <span>物料类型:</span>
        <el-input :disabled="true" v-model="materialType"  style="width: 200px" size="mini" p></el-input>
        <br><br>

        <span>计量单位:</span>
        <el-input :disabled="true" v-model="union"  style="width: 200px" size="mini" ></el-input>
        <br><br>


        <span>领料仓库</span>
        <el-input v-on:click.native="toSelectWarehouse" v-model="warehouseName" style="width: 200px" size="mini" placeholder="请选择仓库"></el-input>
        <br><br>
        <span>仓库代码:</span>
        <el-input :disabled="true" v-model="warehouseCode"  style="width: 200px" size="mini" ></el-input>
        <br><br>

          <span>库&nbsp;存&nbsp;量:</span>
          <el-input :disabled="true" :required="true" v-model="storeAccount"  style="width: 200px" size="mini" placeholder="请输入需求量"></el-input>
          <br><br>

        <span>需&nbsp;求&nbsp;量:</span>
        <el-input :required="true" v-model="account"  style="width: 200px" size="mini" placeholder="请输入需求量"></el-input>
        <br><br>


<!--          领料方式-->
        <template>
          <span>领料方式:</span>
          <el-select size="mini" v-model="getMaterialMethodVal" placeholder="请选择">
            <el-option
              v-for="item in getMaterialMethod"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          <br><br>
<!--          是否紧急-->
          <template>
            <span>是否紧急:</span>
            <el-select size="mini" v-model="isUrgent" placeholder="请选择">
              <el-option
                v-for="item in isUrgentForm"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        <br><br>

        <!--          原因代码-->
        <template>
          <span>原因代码:</span>
          <el-select size="mini" v-model="reasonCode" placeholder="请选择">
            <el-option
              v-for="item in reasonCodeForm"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          <br><br>

<!--          用途-->
         <span>用途：</span>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            style="width: 80%"
            v-model="usage"
           >
          </el-input>
          <br><br>
          <span>单位主管:</span>
          <el-input v-on:click.native="toGetDeptCharger" v-model="charger" style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
          <br><br>
          <span>实物仓管:</span>
          <el-input v-on:click.native="toGetWarehouseWorker" v-model="warehouseWorker" style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
          <br><br>
        </el-form>
      </el-main>
      <!--main结束-->
      <div style="padding: 20px 0 0 0"></div>
      <!--footer开始-->
      <el-footer>
        <el-button type="success" @click="submitApply">提交</el-button>
        <el-button type="warming" @click="clearSession">重置</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

    export default {
        name: "ApplyMain",
      data(){
          return {
            materialCode: '',
            materialName:'',
            materialType:'',
            union:'',
            warehouseName:'',
            warehouseCode:'',
            account:'',
            usage:'',
            charger:'',
            warehouseWorker:'',
            source:'',
            storeAccount:'',

            getMaterialMethod:[
              {
                value:'非生产领用料',
                label:'非生产领用料'
              },
              {
                value:'生产领用料',
                label:'生产领用料'
              }
            ],
            isUrgentForm:[
              {
                value:'正常',
                label:'正常'
              },
              {
                value:'紧急',
                label:'紧急'
              }
            ],
            reasonCodeForm:[
              {
                value:'原因代码',
                label:'原因代码'
              }
            ],
            getMaterialMethodVal:'',
            isUrgent:'',
            reasonCode:'',
            rules:{
              name:{required: true,message:'此项为必填',trigger: 'blur'},
            }

          }
      },
      methods: {

        submitApply(){
          if(this.materialName==''||this.warehouseName==''||this.isUrgent==''||
            this.getMaterialMethodVal==''||this.usage==''||this.account==''||this.charger==''||this.warehouseWorker==''){
            this.$message.error('所有项均为必填项')
            return
            alert('return后面代码')
          }
          this.$ajax.get('http://localhost:8082/apply/applySave',{
            params: {
              materialCode:this.materialCode,//物料代码
              materialName:this.materialName,//物料名称
              materialGroup:this.materialType,//物料组
              union:this.union,//单位
              account:this.account,//数量
              warehouseName:this.warehouseName, //仓库名称
              warehouseCode:this.warehouseCode, //仓库代码
              source:this.source,  //物料来源baan
              getMaterialMethod:this.getMaterialMethodVal, //领料方式
              isUrgent:this.isUrgent, //是否紧急
              usage:this.usage, //用途
              userId:'114200563',
              userDept:'信息化推进办公室',
              username:'林盛凯',
            }
          }).then(res=>{
            if (res.data=='success'){
              this.$message({
                message:'申请成功，等到审批',
                type:"success"
              })
              this.$router.replace('/index')
              sessionStorage.clear();
            }else {
              this.$message.error('保存失败，请稍后再试')
            }
          })
        },


        storeSomeDate(){
          sessionStorage.setItem("account",this.account)
          sessionStorage.setItem("isUrgent",this.isUrgent)
          sessionStorage.setItem("getMaterialMethod",this.getMaterialMethodVal)

          console.log(sessionStorage.getItem("account"))
        },


        toSelectId(){

          console.log(this.account)
          sessionStorage.setItem("account",this.account)
          sessionStorage.setItem("isUrgent",this.isUrgent)
          sessionStorage.setItem("getMaterialMethod",this.getMaterialMethodVal)
          if(sessionStorage.getItem("account")==null){

          }
          if(sessionStorage.getItem("isUrgent")==null){

          }
          if(sessionStorage.getItem("getMaterialMethod")==null){

          }
          this.$router.push({
            path:"/selectId",
          })
        },
        toGetDeptCharger(){
          sessionStorage.setItem("account",this.account)
          sessionStorage.setItem("isUrgent",this.isUrgent)
          sessionStorage.setItem("getMaterialMethod",this.getMaterialMethodVal)
          this.$router.push("/getDcharger")
        },

        toSelectWarehouse(){
          sessionStorage.setItem("account",this.account)
          sessionStorage.setItem("isUrgent",this.isUrgent)
          sessionStorage.setItem("getMaterialMethod",this.getMaterialMethodVal)
          this.$router.push('/selectByWarehouse')
        },
        toGetWarehouseWorker(){
          this.storeSomeDate()
          this.$router.push("/getWarehouseWorker")
        },
        goBack(){
          this.storeSomeDate()
          this.$router.go(-1)
        },
        clearSession(){
          sessionStorage.clear();
          local.read();
        },


      },
      mounted() {
        if(sessionStorage.length>0){
          this.materialCode=sessionStorage.getItem("materialCode");
          this.materialName=sessionStorage.getItem("wlname");
          this.materialType=sessionStorage.getItem("wltype");
          this.union=sessionStorage.getItem("unitcn");
          this.warehouseName=sessionStorage.getItem("warehouseName")
          this.warehouseCode=sessionStorage.getItem("warehouseCode")
          this.charger=sessionStorage.getItem("charger")
          this.warehouseWorker=sessionStorage.getItem("warehouseWorker")
          this.source=sessionStorage.getItem("source")
          this.account=sessionStorage.getItem("account")
          this.isUrgent=sessionStorage.getItem("isUrgent")
          this.getMaterialMethodVal=sessionStorage.getItem("getMaterialMethod")
		      this.storeAccount=sessionStorage.getItem("inventory")
          console.log(sessionStorage.getItem("materialCode"))
        }
      }
    }
</script>

<style scoped>

</style>
