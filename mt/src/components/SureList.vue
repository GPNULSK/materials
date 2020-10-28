<template>
<div>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="领料员确认列表">
      </el-page-header>
    </el-header>
    <el-main>
      <el-button type="success" @click="plSure('agree')">批量通过</el-button>
      <el-button type="error" @click="plSure('rejectToWarehouse')">批量驳回到仓管员</el-button>
      <el-button type="danger" @click="plSure('rejectToApply')">批量驳回</el-button>
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
            prop="applyer"
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
    <el-footer>Footer</el-footer>
  </el-container>
</div>
</template>

<script>
export default {
name: "SureList",

  data(){
    return{
      tableData:[],
      rowId:'',
      multipleSelection:[],
    }
  },
  methods: {

    plSure(flag){
      let rids='';
      for(let i=0;i<this.multipleSelection.length;i++){
        if(i!=this.multipleSelection.length-1){
          rids=rids+this.multipleSelection[i].id+','
        }else {
          rids=rids+this.multipleSelection[i].id
        }
      }
      console.log(rids)
      this.$ajax.get(this.apiUrl+'/sure/plSure',{
        params: {
          username:this.username,
          uid:this.uid,
          rids:rids,
          status:flag
        }
      }).then(res=>{
        if(res.data=='success'){
          if(flag=='agree'){
            this.$message({
              message:'批量同意保存成功',
              type:'success'
            })
          }

          if(flag=='rejectToWarehouse'){
            this.$message({
              message:'批量驳回到仓管员成功',
              type:'success'
            })
          }

          if(flag=='rejectToApply'){
            this.$message({
              message:'批量驳回成功，订单已取消',
              type:'success'
            })
          }

          //重新加载数据，达到异步效果
          this.$ajax.get(this.apiUrl+'/sure/list',{
            params: {
              username:this.username,
              uid:this.uid
            }
          }).then(res=>{
            this.tableData=res.data
          })
        }else{
          if(flag=='agree'){
            if(flag=='agree'){
              this.$message({
                message:'批量通过失败，请稍后再试',
                type:'error'
              })
            }

            if(flag=='rejectToWarehouse'){
              this.$message({
                message:'批量驳回到仓管员失败，请稍后再试',
                type:'error'
              })
            }

            if(flag=='rejectToApply'){
              this.$message({
                message:'批量驳回失败，请稍后再试',
                type:'error'
              })
            }
          }
        }
      })
    },




    toAudit(index,row){
      this.rowId=row.id
      this.$router.push({
        path:'/sure',
        query: {
          id:row.id
        }
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    goBack(){
      this.$router.go(-1)
      },
    },
  created() {
    this.$ajax.get(this.apiUrl+'/sure/list',{
      params: {
        username:this.username,
        uid:this.uid
      }
    }).then(res=>{
      this.tableData=res.data
    })
  }
}
</script>

<style scoped>

</style>
