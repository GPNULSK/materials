<template>
  <div>
    <el-container>
      <el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <el-main>
        <span>单位主管:</span>
        <el-input v-model="gkWorker"   style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <el-button size="mini" type="success" @click="getGkWorker">查询</el-button>
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
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "GetGK",
  data(){
    return{
      tableData:[],
      gkWorker:'',
    }
  },
  methods: {

    //请求数据
    getGkWorker(){
      this.$ajax.get(this.apiUrl+'/apply/findGkByName',{
        params: {
          username:this.gkWorker
        }
      }).then(res=>{
        this.tableData=res.data
      })
    },

    //选择归口人员
    getCurRow(row){
      sessionStorage.setItem("gkWorker",row.usnm);
      this.$ajax.get(this.apiUrl+'/apply/oneGkPersonnel',{
        params: {
          username:row.usnm
        }
      })
      this.$router.go(-1)
    },

    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
