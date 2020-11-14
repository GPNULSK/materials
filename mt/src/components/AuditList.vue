<template>
  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack" content="主管审批列表">
        </el-page-header>
      </el-header>
      <el-main>
        <el-button size="mini" @click="agrees">同意</el-button>
        <el-button size="mini" @click="diaAgree">驳回</el-button><br><br>
        <span style="font-size: smaller;color:darkolivegreen;">{{tip}}</span><br><br>
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
              prop="applyDate"
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
        <el-pagination
          background
          @current-change="currentPage"
          layout="prev, pager, next"
          :total=totalRecord>
        </el-pagination>
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
	    totalRecord:0,
      tip:'正在加载...'
    }
  },
  methods:{

    //分页
	currentPage(val){
		this.$ajax.get(this.apiUrl+'/applications/auditList',{
      params: {
        username:this.$root.username,
        uid:this.$root.uid,
		    curPage:val
      }
    }).then(res=>{
      console.log(res.data)
      let data=res.data;
      this.tableData=data.result
      for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].applyDate=data.time[i]
      }
    })
	},
    //带上ID去审核页面
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
		  console.log(val)
      this.multipleSelection = val;
    },
    //批量同意
    agrees(){
	    this.tip='正在批量同意...'
      let rids='';
      for(let i=0;i<this.multipleSelection.length;i++){
        if(i!=this.multipleSelection.length-1){
          rids=rids+this.multipleSelection[i].id+','
        }else {
          rids=rids+this.multipleSelection[i].id
        }
      }
      this.$ajax.get(this.apiUrl+'/applications/plAudit',{
        params: {
          username:this.$root.username,
          uid:this.$root.uid,
          rids:rids,
          status:'0'
        }
      }).then(res=>{
        this.tip='批量同意成功...'
        if(res.data=='success'){
          this.$message({
            message:'批量同意保存成功',
            type:'success'
          })
          //达到异步同意的效果
          this.$ajax.get(this.apiUrl+'/applications/auditList',{
            params: {
              username:this.$root.username,
              uid:this.$root.uid,
              curPage:1
            }
          }).then(res=>{
            console.log(res.data)
            let data=res.data;
            this.tableData=data.result
            for(let i=0;i<this.tableData.length;i++){
              this.tableData[i].applyDate=data.time[i]
            }
          })
        }else{
          this.tip='批量同意失败...'
          this.$message({
            message:'批量同意保存失败,请稍后再试',
            type:'error'
          })
        }
      })
    },

    diaAgree(){
      this.tip='正在批量驳回...'
      let rids='';
      for(let i=0;i<this.multipleSelection.length;i++){
        if(i!=this.multipleSelection.length-1){
          rids=rids+this.multipleSelection[i].id+','
        }else {
          rids=rids+this.multipleSelection[i].id
        }
      }
      this.$ajax.get(this.apiUrl+'/applications/plAudit',{
        params: {
          username:this.$root.username,
          uid:this.$root.uid,
          rids:rids,
          status:'1'
        }
      }).then(res=>{
        this.tip='批量驳回成功...'
        if(res.data=='success'){
          this.$message({
            message:'批量驳回保存成功',
            type:'success'
          })
          //达到异步同意的效果
          this.$ajax.get(this.apiUrl+'/applications/auditList',{
            params: {
              username:this.$root.username,
              uid:this.$root.uid,
              curPage:1
            }
          }).then(res=>{
            console.log(res.data)
            let data=res.data;
            this.tableData=data.result
            for(let i=0;i<this.tableData.length;i++){
              this.tableData[i].applyDate=data.time[i]
            }
          })
        }else{
          this.tip='批量驳回失败...'
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
    this.$ajax.get(this.apiUrl+'/applications/auditList',{
      params: {
        username:this.$root.username,
        uid:this.$root.uid,
		    curPage:1
      }
    }).then(res=>{
		this.tip='加载完成'
      console.log(res.data)
      let data=res.data;
      this.tableData=data.result
      for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].applyDate=data.time[i]
      }
    })
  }
}
</script>

<style scoped>

</style>
