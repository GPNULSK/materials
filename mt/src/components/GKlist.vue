<template>
  <div>
    <el-container>
      <el-header>
        <el-page-header @back="goBack" content="归口会签列表">
        </el-page-header>
      </el-header>
      <el-main>

        <template>
          <el-table
            border
            :data="tableData"
            style="width: 100%">
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
  name: "GKlist",
  data(){
    return{
	tableData:[]
    }
  },

  methods: {

    toAudit(index,row){
      this.$router.push({
        path:'/gk',
        query:{
          id:row.id
        }
      })
    },

    goBack(){
      this.$router.go(-1)
    }
  },
  created() {
	console.log('create试试')
    this.$ajax.get(this.apiUrl+'/gk/list',{
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
