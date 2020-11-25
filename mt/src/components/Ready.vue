<template>
  <div>
    <el-container>
      <el-header>
        <el-page-header @back="goBack" content="备料审核">
        </el-page-header>
      </el-header>
      <el-main>

        <div>
        <dl>
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
            <dt>单位：</dt><dd style="color: #5daf34;">{{unit}}</dd>
          </dl>
          <dl>
            <dt>需求量：</dt><dd style="color: #5daf34;">{{demand}}</dd>
          </dl>
          <dl>
            <dt>库存量：</dt><dd style="color: #5daf34;">{{inventory}}</dd>
          </dl>
          <dl>
            <dt>仓库：</dt><dd style="color: #5daf34;">{{warehouseName}}</dd>
          </dl>

          <dl>
            <dt>仓库代码：</dt><dd style="color: #5daf34;">{{warehouseCode}}</dd>
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
              <dt>用途：</dt><dd style="color: #5daf34;">{{usage}}</dd>
            </dl>

            <dl>
              <dt>单位主管：</dt><dd style="color: #5daf34;">{{charger}}</dd>
            </dl>

            <dl>
              <dt>单位主管审批时间：</dt><dd style="color: #5daf34;">{{ auditDate }}</dd>
            </dl>

            <dl>
              <dt>实物仓管员：</dt><dd style="color: #5daf34;">{{warehouseWorker}}</dd>
            </dl>

            <dl>
              <dt>归口会签时间：</dt><dd style="color: #5daf34;">{{ readyDate }}</dd>
            </dl>
          </dl>
		  <br><br>

        <span>转交仓管员:</span>
        <el-input v-on:click.native="nextWorker" v-model="neWorker" style="width: 150px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>
        <span>审批结果：</span>
        <template>
          <el-select size='mini' v-model="readyResult" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template><br><br>

        <span>备料数量：</span>
        <el-input v-model="account" value="this.demand"  size="mini" style="width: 150px" ></el-input><br><br>


        <span>审批意见：</span>
        <el-input size="mini" type="textarea" v-model="comment" style="width: 200px"></el-input>
        </div>
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
      rowId:'',
	    auditDate:'',
		  charger:'',
		  usage:'',
		  readyDate:'',
      readyRemark:'',
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
      this.$router.push('/nextWorker')
    },
    submit(){
      if(this.neWorker==null || this.neWorker==''){



        if(this.readyResult=='' || this.readyResult==null){
          this.$message({
            message:'请选择审核结果',
            type:'error'
          })
          return
        }

        if(this.readyResult=='备料'){
          if(this.comment=='' || this.comment==null){
            this.$message({
              message:'请输入备料数量',
              type:'error'
            })
          }
          return
        }

        if(this.readyResult=='驳回'){
          if(this.comment=='' || this.comment==null){
            this.$message({
              message:'请输入审批意见',
              type:'error'
            })
          }
          return
        }
      }
      this.$ajax.get(this.apiUrl+'/ready/save',{
        params: {
          username:this.$root.username,
          uid:this.$root.uid,
          rid:this.rowId,
          status:this.readyResult,
          comment:this.comment,
          account:this.account,
          warehouseName:this.warehouseName,
          warehouseCode:this.warehouseCode,
          materialCode:this.materialCode,
          readyRemark:this.readyRemark
        }
      }).then(res=>{
        if(res.data=="success"){
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
      this.$router.go(-1)
    }
  },

  created() {

    this.rowId=sessionStorage.getItem('readyRoeId')

    this.neWorker=sessionStorage.getItem('nextWorker')
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
		this.usage=data.list.use
      console.log(data.time[1]+"..."+data.time[2])
    })
  }
}
</script>

<style scoped>


dl{clear:left; padding-left: 20px}
dt,dd{float:left;}
dd{margin: 0}
</style>
