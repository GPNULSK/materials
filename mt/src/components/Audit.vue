<template>
<div>

  <el-container>
    <el-header>
      <el-page-header @back="goBack" >
      </el-page-header>
    </el-header>
    <el-main>

      <div class="viewInfo">
        <dl>
          <dt>物料代码：</dt><dd style="color: #5daf34;">{{materialCode}}</dd>
        </dl>
        <dl>
          <dt>物料名称：</dt><dd style="color: #5daf34;">{{materialName}}</dd>
        </dl>
        <dl>
          <dt>物料类型：</dt><dd style="color: #5daf34;">{{materialType}}</dd>
        </dl>

        <dl>
          <dt>物料型号：</dt><dd style="color: #5daf34;"></dd>
        </dl>
        <dl>
          <dt>单位：</dt><dd style="color: #5daf34;">{{unit}}</dd>
        </dl>
        <dl>
          <dt>需求量：</dt><dd style="color: #5daf34;">{{demand}}</dd>
        </dl>
        <dl>
          <dt>库存量：</dt><dd style="color: #5daf34;">{{inventory}}</dd>
        </dl>
        <dl>
          <dt>仓库：</dt><dd style="color: #5daf34;">{{warehouse}}</dd>
        </dl>

        <dl>
          <dt>仓库代码：</dt><dd style="color: #5daf34;">{{warehouseCode}}</dd>
        </dl>
        <dl>
          <dt>物料属性：</dt><dd style="color: #5daf34;">{{materialType}}</dd>
        </dl>
        <dl>
          <dt>申请人：</dt><dd style="color: #5daf34;">{{applyer}}</dd>
        </dl>

        <dl>
          <dt>领料人：</dt><dd style="color: #5daf34;">{{pickingUser}}</dd>
        </dl>
        <dl>
          <dt>填单时间：</dt><dd style="color: #5daf34;">{{applyDate}}</dd>
        </dl>
        <dl>
          <dt>领料部门：</dt><dd style="color: #5daf34;">{{deptName}}</dd>
        </dl>
        <dl>
          <dt>紧急情况：</dt><dd style="color: #5daf34;">{{urgent}}</dd>
        </dl>
        <dl>
          <dt>领料方式：</dt><dd style="color: #5daf34;">{{pickingType}}</dd>
        </dl>
        <dl>
          <dt>单位主管：</dt><dd style="color: #5daf34;">{{charger}}</dd>
        </dl>


        <dl>
          <dt>实物仓管员：</dt><dd style="color: #5daf34;">{{warehouseWorker}}</dd>
        </dl>

        <br><br>


      <el-row type="flex" class="row-bg">
        <el-col :span="9">
          <span>审核结果：</span>
        </el-col>
        <el-col :span="9">
          <template>
            <el-select size="mini" v-model="auditVal" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-col>
      </el-row>
      <br>

      <el-row type="flex" class="row-bg">
        <el-col :span="9">
          <span>审核意见：</span>
        </el-col>
        <el-col :span="9">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="auditAdavn">
          </el-input>
        </el-col>
      </el-row>
      </div>
    </el-main>
    <el-footer>
      <el-button @click="save">提交</el-button>
    </el-footer>
  </el-container>




</div>
</template>

<script>
export default {
  name: "Audit",
  data(){
    return{
      id:this.$route.query.id,
      materialCode:'',
      materialName:'',
      auditVal:'',
      auditAdavn:'',
      materialType:'',
      unit:'',
      demand:'',
      inventory:'',
      warehouse:'',
      warehouseCode:'',
      pickingUser:'',
      applyDate:'',
      deptName:'',
      urgent:'',
      pickingType:'',
      warehouseWorker:'',
      applyer:'',
      nextWorker:'',
      charger:'',
      options:[
        {
          value:'通过',
          label:'通过'
        },
        {
          value:'驳回',
          label:'驳回'
        }
      ]

    }
  },
  methods:{
    save(){

      if(this.auditVal==''){
        this.$message({
          message:'请选择审核结果',
          type:'error'
        })
        return
      }
      this.$ajax.get(this.apiUrl+'/applications/auditSave',{
        params:{
          username:this.$root.username,
          id:this.$root.uid,
          rid:this.id,
          status:this.auditVal,
          comment:this.auditAdavn
        }
      }).then(res=>{
        if(res.data=='success'){
          this.$message({
            message:'保存成功',
            type:'success'
          })
          this.$router.go(-1)
        }else{
          this.$message({
            message:'保存出错，请稍后再试或联系开发人员',
            type:'error'
          })
        }
      })
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  created() {
    this.$ajax.get(this.apiUrl+'/applications/auditEdit',{
      params: {
        rid:this.id
      }
    }).then(res=>{
      console.log(res.data)
	  let data=res.data
	  this.materialName=data.result.materialName,
	  this.materialCode=data.result.materialCode,
	  this.materialType=data.result.materialType,
	  this.unit=data.result.unit,
	  this.demand=data.result.demand,
	  this.inventory=data.result.inventory,
	  this.warehouse=data.result.warehouse,
	  this.warehouseCode=data.result.warehousecode,
	  this.pickingUser=data.result.pickingUser,
	  this.deptName=data.result.deptName,
	  this.urgent=data.result.urgent,
	  this.pickingType=data.result.pickingType,
	  this.warehouseWorker=data.result.warehouseWorkerId.usnm,
	  this.applyer=data.result.applyer,
	  this.applyDate=data.time[0],
	  this.materialType=data.result.materialType,
    this.charger=data.result.deptHeadsId.usnm
    })
  }
}
</script>

<style scoped>

dl{clear:left; padding-left: 20px}
dt,dd{float:left;}
dd{margin: 0}

</style>
