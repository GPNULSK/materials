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
          <dt>物料属性：</dt><dd style="color: #5daf34;"></dd>
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
          <dt>单位主管：</dt><dd style="color: #5daf34;">{{materialType}}</dd>
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
      this.$ajax.get('http://localhost:8082/applications/auditSave',{
        params:{
          username:'',
          id:'',
          rid:this.id,
          status:this.auditVal,
          comment:this.auditAdavn
        }
      }).then(res=>{
        if(res.data=='success'){
          this.$router.replace('/auditList')
        }
      })
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  created() {
    this.$ajax.get('http://localhost:8082/applications/auditEdit',{
      params: {
        rid:this.id
      }
    }).then(res=>{
      console.log(res.data)
	  let data=res.data
	  this.materialName=data.materialName,
	  this.materialCode=data.materialCode,
	  this.materialType=data.materialType,
	  this.unit=data.unit,
	  this.demand=data.demand,
	  this.inventory=data.inventory,
	  this.warehouse=data.warehouse,
	  this.warehouseCode=data.warehousecode,
	  this.pickingUser=data.pickingUser,
	  this.deptName=data.deptName,
	  this.urgent=data.urgent,
	  this.pickingType=data.pickingType,
	  this.warehouseWorker=data.warehouseWorkerId.usnm,
	  this.applyer=data.applyer
    })
  }
}
</script>

<style scoped>

dl{clear:left; padding-left: 20px}
dt,dd{float:left;}

</style>
