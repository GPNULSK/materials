<template>
  <div>
    <el-container>
      <el-header>
        <el-page-header @back="goBack">
        </el-page-header>
      </el-header>
      <el-main>
        <span>物料代码：</span>
        <span style="color: #5daf34">{{materialCode}}</span><br>

        <span>物料名称：</span>
        <span style="color: #5daf34">{{materialName}}</span><br>

        <span>物料类型:</span>
        <span style="color: #5daf34">{{materialType}}</span><br>

        <span>规格型号:</span>
        <span style="color: #5daf34"></span><br>

        <span>单位:</span>
        <span style="color: #5daf34">{{unit}}</span><br>

        <span>需求量</span>
        <span style="color: #5daf34">{{demand}}</span><br>

        <span>库存量:</span>
        <span style="color: #5daf34">{{inventory}}</span><br>

        <span>仓库:</span>
        <span style="color: #5daf34">{{warehouseName}}</span><br>

        <span>仓库代码:</span>
        <span style="color: #5daf34">{{warehouseCode}}</span><br>


        <span>申请人:</span>
        <span style="color: #5daf34">{{applyer}}</span><br>

        <span>领料人</span>
        <span style="color: #5daf34">{{pickingUser}}</span><br>

        <span>填单时间:</span>
        <span style="color: #5daf34">{{applyDate}}</span><br>

        <span>领料部门:</span>
        <span style="color: #5daf34">{{deptName}}</span><br>

        <span>紧急情况:</span>
        <span style="color: #5daf34">{{urgent}}</span><br>

        <span>领料方式:</span>
        <span style="color: #5daf34">{{pickingType}}</span><br>

        <span>单位主管:</span>
        <span style="color: #5daf34">{{charger}}</span><br>

        <span>单位主管审批时间:</span>
        <span style="color: #5daf34">{{auditDate}}</span><br>

        <span>实物仓管员:</span>
        <span style="color: #5daf34">{{warehouseWorker}}</span><br><br>

        <span>转交仓管员:</span>
        <el-input v-on:click.native="nextWorker" v-model="neWorker" style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>
        <span>审批结果：</span>
        <template>
          <el-select v-model="readyResult" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template><br><br>

        <span>备料数量：</span>
        <el-input v-model="account" size="mini" style="width: 150px"></el-input><br><br>

        <span>审批意见：</span>
        <el-input size="mini" type="textarea" v-model="comment" style="width: 200px"></el-input>

      </el-main>
      <el-footer>
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
        <el-button type="primary" size="mini">关闭</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Ready",
  data(){
    return{
      neWorker:'',
      readyResult:'',
      account:'',
      comment:'',
	    materialCode:'',
      materialName:'',
      auditVal:'',
      auditAdavn:'',
      materialType:'',
      unit:'',
      demand:'',
      inventory:'',
      warehouseName:'',
      warehouseCode:'',
      pickingUser:'',
      applyDate:'',
      deptName:'',
      urgent:'',
      pickingType:'',
      warehouseWorker:'',
      applyer:'',
	    time:'',
      rowId:this.$route.query.id,
	    auditDate:'',
		  charger:'',
      options:[
        {
          value:'备料',
          label:'备料'
        },
        {
          value: '驳回',
          label: '驳回'
        }
      ]
    }
  },
  methods: {

    nextWorker(){

    },
    submit(){
      this.$ajax.get(this.apiUrl+'/ready/save',{
        params: {
          username:this.username,
          uid:this.uid,
          rid:this.rowId,
          status:this.readyResult,
          comment:this.comment,
          account:this.account
        }
      }).then(res=>{
        if(res.data=="success"){
          this.$message({
            message:'保存成功',
            type:'success'
          })
          this.$router.replace('/readyList')
        }
      })
    },

    goBack(){
      this.$router.go(-1)
    }
  },

  created() {
    this.$ajax.get(this.apiUrl+'/ready/edit',{
      params: {
        rid:this.rowId
      }
    }).then(res=>{
      let data=res.data
      console.log(res.data)
	  console.log('---------------------------------------')

      this.materialCode=data.list.materialCode
      this.materialName=data.list.materialName
      this.materialType=data.list.materialType,
      this.unit=data.list.unit,
      this.demand=data.list.demand,
      this.inventory=data.list.inventory,
      this.warehouseName=data.list.warehouse,
      this.warehouseCode=data.list.warehousecode,
      this.pickingUser=data.list.pickingUser,
      this.applyDate=data.list.applyDate,
      this.deptName=data.list.deptName,
      this.urgent=data.list.urgent,
      this.pickingType=data.list.pickingType,
      this.warehouseWorker=data.list.warehouseWorkerId.usnm,
      this.applyer=data.list.applyer
	  this.charger=data.list.deptHeadsId.usnm
      this.applyDate=data.time[0]
	    this.auditDate=data.time[1]
      console.log(data.time[1]+"..."+data.time[2])
    })
  }
}
</script>

<style scoped>
  p {
    color: #5daf34;
  }
</style>
