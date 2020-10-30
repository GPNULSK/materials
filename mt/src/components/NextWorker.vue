<template>
  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <el-main>
        <span>单位主管:</span>
        <el-input v-model="workerName"   style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <el-button size="mini" type="success" @click="getNextWorker">查询</el-button>
        <br><br>
        <div class="table_div">
          <el-table
            :data="tableData"
            border
            size="mini"
            @row-click="getCurRow"
            :show-header="true"
            style="width: 100%;">
            <el-table-column
              label="员工编号"
              prop = "usid"
              align="center">
            </el-table-column>

            <el-table-column
              label="员工姓名"
              prop = "usnm"
              align="center">
            </el-table-column>
            <el-table-column
              label="部门名称"
              prop = "dpnm"
              align="center">
            </el-table-column>
            <el-table-column
              label="权限名称"
              prop = "roleName"
              align="center">
            </el-table-column>
            <el-table-column
              label="手机号"
              prop = "mobile"
              align="center">
            </el-table-column>
            <el-table-column
              label="厂区"
              prop = "warehouse"
              align="center">
            </el-table-column>
            <el-table-column
              label="是否格力域"
              prop = "isGree"
              align="center">
            </el-table-column>

            <el-table-column
              label="id"
              prop = "id"
              v-if="true"
              align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>


  </div>
</template>

<script>
export default {
  name: "NextWorker",
  data(){
    return{
      tableData:[],
      workerName:''
    }
  },
  methods: {

    getNextWorker(){
      this.$ajax.get('http://localhost:8082/ready/selectNameBySearch',{
        params: {
          name:this.workerName,
          roleDetail:'13'
        }
      }).then(res=>{
        this.tableData=res.data
      })
    },

    getCurRow(row){
      this.$ajax.get(this.apiUrl+'/ready/receive',{
        params: {
          username:row.usnm,
          id:row.id
        }
      }).then(res=>{
        if(res.data=='success'){
          sessionStorage.setItem("nextWorker",row.usnm)
          this.$router.replace('/ready')
        }else {
          this.$message({
            message:'系统异常，请稍后再试',
            type:'error'
          })
        }
      })

    },

    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
