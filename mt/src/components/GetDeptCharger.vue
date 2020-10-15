<template>
  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <el-main>
        <span>单位主管:</span>
        <el-input v-model="charger"   style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <el-button size="mini" type="success" @click="getMaterialName">查询</el-button>
        <br><br>
        <div class="table_div">
          <el-table
            :data="tableData"
            border
            size="mini"
            @row-click="getCurRow"
            :show-header="false"
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
          </el-table>
        </div>
      </el-main>
    </el-container>


  </div>
</template>

<script>
export default {
  name: "GetDeptCharger",
  data(){
    return{
      charger:'',
      tableData:[],
    }
  },

  methods: {
    getCurRow(row){
      sessionStorage.setItem("charger",row.usnm)
      this.$router.push('/applyMain')
    },
    goBack(){
      this.$router.go(-1)
    }
  },

  created() {
    this.$ajax.get('http://localhost:8082/apply/getDeptCharger',{
      params: {
        userDept:'计算机中心',
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
