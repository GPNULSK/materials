<template>
<div>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="领料员审批">
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
          <dt>备料时间：</dt><dd style="color: #5daf34;">{{ readyDate }}</dd>
        </dl>

        <dl>
          <dt>发料时间：</dt><dd style="color: #5daf34;">{{ sendDate }}</dd>
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

      <el-button type="primary" size="mini" @click="submit">提交</el-button>
      <el-button type="primary" size="mini" @click="shutDown">关闭</el-button>
    </el-footer>
  </el-container>
</div>
</template>

<script>
export default {
  name: "Sure",
  data(){
    return{
      rid:this.$route.query.id,
      materialCode:'',
      materialName:'',
      materialType:'',
      unit:'',
      demand:'',
      inventory:'',
      warehouseName:'',
      warehouseCode:'',
      applyer:'',
      pickingUser:'',
      applyDate:'',
      urgent:'',
      pickingType:'',
      usage:'',
      charger:'',
      auditDate:'',
      warehouseWorker:'',
      readyDate:'',
      sendDate:'',
      auditVal:'',
      auditAdavn:'',

      options:[
        {
          value:'通过',
          label:'通过'
        },
        {
          value: '仓管员备料',
          label: '仓管员备料'
        },
        {
          value: '驳回',
          label: '驳回'
        },
      ]

    }
  },
  methods: {

    submit(){
      this.$ajax.get(this.apiUrl+'/sure/save',{
        params: {
          username:this.username,
          uid:this.uid,
          rid:this.rid,
          status:this.auditVal,
          comment:this.auditAdavn
        }
      }).then(res=>{
        if (res.data=='success'){
          this.$message({
            message:'保存成功',
            type:'success'
          })
          this.$router.replace('/sureList')
        }else {
          this.$message({
            message:'保存出了点问题，稍后再试吧~',
            type:'error'
          })
        }
      })
    },

    goBack(){
      this.$router.go(-1)
    },

    shutDown(){
      this.$router.go(-1);
    }
  },

  created() {
      this.$ajax.get(this.apiUrl+'/sure/edit',{
        params: {
          rid:this.rid
        }
      }).then(res=>{
        let data=res.data;
        console.log(data)

		this.materialCode=data.materialCode,
		this.materialName=data.materialName,
		this.materialType='',
		this.unit=data.unit,
		this.demand=data.demand,
		this.inventory=data.inventory,
		this.warehouseName=data.warehouse,
		this.warehouseCode=data.warehousecode,
		this.applyer=data.applyer,
		this.pickingUser=data.pickingUser,
		this.applyDate=data.applyDate,
		this.deptName=data.deptName,
		this.urgent=data.urgent,
		this.pickingType=data.pickingType,
		this.usage=data.use,
		this.charger=data.deptHeadsId.usnm,
		this.auditDate=data.auditDate,
		this.warehouseWorker=data.warehouseWorkerId.usnm,
		this.readyDate=data.readyDate,
		this.sendDate=data.sendDate
      })
  }
}
</script>

<style scoped>


dl{clear:left; padding-left: 20px}
dt,dd{float:left;}
</style>
