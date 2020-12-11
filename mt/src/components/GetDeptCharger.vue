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
        <el-button size="mini" type="success" @click="getDeptCharger">查询</el-button>
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
              prop = "dept.dpnm"
              align="center">
            </el-table-column>
            <el-table-column
              label="权限名称"
              prop = "roles.roleName"
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
  name: "GetDeptCharger",
  data(){
    return{
      charger:'',
      tableData:[],
      totalRecord:0,
    }
  },

  methods: {
    getCurRow(row){
      sessionStorage.setItem("charger",row.usnm)
      this.$ajax.get(this.apiUrl+'/apply/getChargerList',{
        params: {
          userId:row.usid,
          username:row.usnm
        }
      });
      this.$router.go(-1)
    },
    //输入名字搜索
    getDeptCharger(){
      this.$ajax.get(this.apiUrl+'/apply/selectNameBySearch',{
        params: {
          name:this.charger,
          roleDetail:'11'
        }
      }).then(res=>{
        this.tableData=res.data
      })
    },

    //分页
    currentPage(val){
      this.$ajax.get(this.apiUrl+'/apply/getDeptCharger',{
        params: {
          userDept:'',
          curPage:val
        }
      }).then(res=>{
        console.log(res.data)
        let data=res.data
        this.tableData=data.result
        this.totalRecord=data.page[0]
      })
    },

    goBack(){
      this.$router.go(-1)
    }
  },

  created() {
    this.$ajax.get(this.apiUrl+'/apply/getDeptCharger',{
      params: {
        userDept:'',
        curPage:1
      }
    }).then(res=>{
      console.log(res.data)
      let data=res.data
      this.tableData=data.result
      this.totalRecord=data.page[0]
      console.log(data.page[0])
    })
  }
}
</script>

<style scoped>

</style>
