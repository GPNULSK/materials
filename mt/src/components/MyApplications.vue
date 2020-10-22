<template>
  <div>
    <template>
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <br>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <br>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">查看</el-button>
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
          prop="zip"
          label="领料部门">
        </el-table-column>
		<el-table-column
          prop="usnm"
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
  </div>
</template>

<script>
  export default {
  name: "MyApplications",
  data(){
    return{
      tableData:[],
    }
  },
    methods: {
      handleDelete(index,row){
        this.$ajax.get('http://localhost:8082/applications/applyDelete',{
          params: {
            username:'林盛凯',
            userId:'114200563',
            applyId:row.id
          }
        }).then(res=>{

          this.$ajax.get('http://localhost:8082/applications/applyList').then(res=>{
            console.log(res.data)
            this.tableData=res.data
          })

          this.$message({
            message:'删除成功',
            type:'success'
          })
        })
      }
    },
    created() {
      this.$ajax.get('http://localhost:8082/applications/applyList').then(res=>{
        console.log(res.data)
		    this.tableData=res.data
      })
    }
  }
</script>

<style scoped>

</style>
