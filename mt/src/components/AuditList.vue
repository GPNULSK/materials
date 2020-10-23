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

    <el-button @click="t1">条状</el-button>
  </div>
</template>

<script>
export default {
  name: "AuditList",

  data(){
    return{
      tableData:[],
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
    }
  },

  created() {
    this.$ajax.get('http://localhost:8082/applications/auditList',{
      params: {
        username:'林盛凯',
        uid:'114200563'
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
