<template>
<div>
  <el-row :gutter="18">
    <el-col :span="7">
      <span>物料代码:{{materialCode}}</span>
    </el-col>
    <el-col :span="11">
      <span>物料名称:{{materialName}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>物料类型:{{materialType}}</span>
    </el-col>
    <el-col :span="10">
      <span>规格型号:{{materialName}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>单位:{{unit}}</span>
    </el-col>
    <el-col :span="10">
      <span>需求量:{{demand}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>库存量:{{inventory}}</span>
    </el-col>
    <el-col :span="10">
      <span>仓库:{{warehouse}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>仓库代码:{{warehousecode}}</span>
    </el-col>
    <el-col :span="10">
      <span>物料属性:{{materialName}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>申请人:{{applyer}}</span>
    </el-col>
    <el-col :span="10">
      <span>领料人:{{pickingUser}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>填单时间:{{applyDate}}</span>
    </el-col>
    <el-col :span="10">
      <span>领料部门:{{deptName}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>紧急情况:{{urgent}}</span>
    </el-col>
    <el-col :span="10">
      <span>领料方式:{{pickingType}}</span>
    </el-col>
  </el-row><br>

  <el-row :gutter="18">
    <el-col :span="8">
      <span>单位主管:{{materialCode}}</span>
    </el-col>
    <el-col :span="10">
      <span>实物仓管员:{{warehouseWorker}}</span>
    </el-col>
  </el-row><br>

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
  <br>
  <el-button @click="save">提交</el-button>

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
      warehousecode:'',
      pickingUser:'',
      applyDate:'',
      deptName:'',
      urgent:'',
      pickingType:'',
      warehouseWorker:'',
      applyer:'',
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
          status:this.status,
          comment:this.comment
        }
      })
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
	  this.warehousecode=data.warehousecode,
	  this.pickingUser=data.pickingUser,
	  this.applyDate=data.applyDate,
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

</style>
