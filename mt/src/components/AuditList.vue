<template>
  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack">
        </el-page-header>
      </el-header>
      <el-main>
        <el-button size="mini" @click="agrees">同意</el-button>
        <el-button size="mini" @click="diaAgree">驳回</el-button><br><br>
        <template>
          <el-table
            border
            :data="tableData"
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="toAudit(scope.$index, scope.row)">审核</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="物料代码">
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称">
            </el-table-column>
            <el-table-column
              prop="materialType"
              label="物料属性">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="demand"
              label="需求量">
            </el-table-column>
            <el-table-column
              prop="warehouse"
              label="仓库">
            </el-table-column>

            <el-table-column
              prop="pickingUser"
              label="申请人">
            </el-table-column>

            <el-table-column
              prop="pickingUser"
              label="领料人">
            </el-table-column>

            <el-table-column
              prop="applyDate.time"
              label="填单时间">
            </el-table-column>

            <el-table-column
              prop="deptName"
              label="领料部门">
            </el-table-column>
            <el-table-column
              prop="warehouseWorkerId.usnm"
              label="实物仓管员">
            </el-table-column>

            <el-table-column
              prop="readyDate"
              label="备料时间">
            </el-table-column>

            <el-table-column
              prop="readyNumber"
              label="备料数量">
            </el-table-column>

            <el-table-column
              prop="status"
              label="签审状态">
            </el-table-column>

            <el-table-column
              v-if="false"
              prop="id"
              label="单号">
            </el-table-column>
          </el-table>
        </template>
      </el-main>
      <el-footer>
        <el-button @click="t1">条状</el-button>
      </el-footer>
    </el-container>




  </div>
</template>

<script>
export default {
  name: "AuditList",

  data(){
    return{
      tableData:[],
      multipleSelection: [],
    }
  },
  methods:{
    toAudit(index,row){
      this.$router.push({
        path:'/audit',
        query:{
          id:row.id
        }
      })
    },
    t1(){
      this.$router.push('/audit')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      alert(this.multipleSelection)
    },

    agrees(){
      let rids='';
      for(let i=0;i<this.multipleSelection.length;i++){
        if(i!=this.multipleSelection.length-1){
          rids=rids+this.multipleSelection[i].id+','
        }else {
          rids=rids+this.multipleSelection[i].id
        }
      }
      this.$ajax.get('http://localhost:8082/applications/plAudit',{
        params: {
          username:this.username,
          uid:this.uid,
          rids:rids,
          status:'0'
        }
      }).then(res=>{
        if(res.data=='success'){
          this.$message({
            message:'批量同意保存成功',
            type:'success'
          })
          //达到异步同意的效果
          this.$ajax.get('http://localhost:8082/applications/auditList',{
            params: {
              username:this.username,
              uid:this.uid
            }
          }).then(res=>{
            console.log(res.data)
            this.tableData=res.data
          })
        }else{
          this.$message({
            message:'批量同意保存失败,请稍后再试',
            type:'error'
          })
        }
      })
    },

    diaAgree(){
      let rids='';
      for(let i=0;i<this.multipleSelection.length;i++){
        if(i!=this.multipleSelection.length-1){
          rids=rids+this.multipleSelection[i].id+','
        }else {
          rids=rids+this.multipleSelection[i].id
        }
      }
      this.$ajax.get('http://localhost:8082/applications/plAudit',{
        params: {
          username:this.username,
          uid:this.uid,
          rids:rids,
          status:'1'
        }
      }).then(res=>{
        if(res.data=='success'){
          this.$message({
            message:'批量驳回保存成功',
            type:'success'
          })
          //达到异步同意的效果
          this.$ajax.get('http://localhost:8082/applications/auditList',{
            params: {
              username:this.username,
              uid:this.uid
            }
          }).then(res=>{
            console.log(res.data)
            this.tableData=res.data
          })
        }else{
          this.$message({
            message:'批量驳回保存失败,请稍后再试',
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
    this.$ajax.get('http://localhost:8082/applications/auditList',{
      params: {
        username:this.username,
        uid:this.uid
      }
    }).then(res=>{
      console.log(res.data)
      this.tableData=res.data
    })
  }
}
</script>

<style scoped>

</style>
