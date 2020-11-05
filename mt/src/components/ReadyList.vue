<template>
  <div>
    <el-container>
      <el-header>
        <el-page-header @back="goBack" content="仓管员备料列表">
        </el-page-header>
      </el-header>
      <el-main>
        <el-button size="mini" type="success" @click="agrees">批量备料</el-button><br><br>

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
              prop="readyDate"
              label="备料时间">
            </el-table-column>

            <el-table-column
              prop="readyNumber"
              label="备料数量">
            </el-table-column>


            <el-table-column
              prop="lyxx"
              label="物料来源">
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
name: "ReadyList",
  data(){
    return{
      tableData:[],
      multipleSelection:[],
      totalRecord:0,
    }
  },
  methods:{

    currentPage(val){
      this.$ajax.get(this.apiUrl+'/ready/list',{
        params: {
          username:this.username,
          uid:this.uid,
          curPage:val
        }
      }).then(res=>{
        let data=res.data
        console.log(data)
        this.tableData=data.request
        this.totalRecord=data.page[0]
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].applyDate=data.times[i]
        }
      })
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
      console.log(rids)
      this.$ajax.get(this.apiUrl+'/ready/agree',{
        params: {
          username:this.$root.username,
          uid:this.$root.uid,
          rids:rids
        }
      }).then(res=>{
        if(res.data=='success'){
          this.$message({
            message:'批量备料成功',
            type:'success'
          })
          //再发一次请求，达到异步效果
          this.$ajax.get(this.apiUrl+'/ready/list',{
            params: {
              username:this.$root.username,
              uid:this.$root.uid,
            }
          }).then(res=>{

            let data=res.data

            this.tableData=data.request

            this.tableData.applyDate=data.times
          })
        }else{
          this.$message({
            message:'批量备料失败。请重试',
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
      this.$ajax.get(this.apiUrl+'/ready/disAgree',{
        params: {
          rids:rids
        }
      }).then(res=>{
        if(res.data=='success'){
          this.$message({
            message:'批量驳回成功',
            type:'success'
          })
          //再发一次请求，达到异步效果
          this.$ajax.get(this.apiUrl+'/ready/list',{
            params: {
              username:this.$root.username,
              uid:this.$root.uid,
            }
          }).then(res=>{

            let data=res.data
            this.tableData=data.request
            this.tableData.applyDate=data.times
          })
        }else{
          this.$message({
            message:'批量驳回保存失败，请重试',
            type:'error'
          })
        }
      })
    },
    goBack(){
      this.$router.go(-1);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toAudit(index,row){
      sessionStorage.setItem("readyRoeId",row.id);
      this.$router.push('/ready')
    },
    t1(){
      this.$router.push('/ready')
    }
  },
  created() {
    this.$ajax.get(this.apiUrl+'/ready/list',{
      params: {
        username:this.$root.username,
        uid:this.$root.uid,
        curPage:1
      }
    }).then(res=>{
	  let data=res.data
	  console.log(data)
	  this.tableData=data.request
    this.totalRecord=data.page[0]
	  for(let i=0;i<this.tableData.length;i++){
	    this.tableData[i].applyDate=data.times[i]
    }
    })
  }
}
</script>

<style scoped>

</style>
