<template>
  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <el-main style="padding: 0">
        <span>物料名称:</span>
        <el-input v-model="materialName"   style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <el-button size="mini" type="success" @click="getMaterialName">查询</el-button>
        <br><br>
        <div class="table_div">
          <el-table
            :data="tableData"
            border
            size="mini"
            @row-click="getCurId"
            style="width: 100%;">
            <el-table-column
              label="代码"
              prop = "code"
              align="center">
            </el-table-column>
            <el-table-column
              label="名称"
              prop = "wlname"
              align="center">
            </el-table-column>
            <el-table-column
              label="类型"
              prop = "wltype"
              align="center">
            </el-table-column>
            <el-table-column
              label="组代码"
              prop = "wlgroupcode"
              align="center">
            </el-table-column>
            <el-table-column
              label="组名称"
              prop = "wlgroup"
              align="center">
            </el-table-column>
            <el-table-column
              label="库存单位名称"
              prop = "unitcn"
              align="center">
            </el-table-column>
            <el-table-column
              label="图号"
              prop = "tuhao"
              align="center">
            </el-table-column>
            <el-table-column
              label="税码"
              prop = "taxcode"
              align="center">
            </el-table-column>
            <el-table-column
              label="物料信号"
              prop = "signalcode"
              align="center">
            </el-table-column>
            <el-table-column
              label="物料来源"
              prop = "lyxx"
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
        name: "SelectMaterials",
      data(){
          return{
            materialCode: '',
            materialName:'',
            materialType:'',
            union:'',
            tableData:[]
          }
      },


      methods: {
        getCurId(row){
          this.materialCode=row.code;
          this.materialName=row.wlname,
            this.materialType=row.wltype,
            this.union=row.unitcn
          sessionStorage.setItem("materialCode",row.code);
          sessionStorage.setItem("wlname",row.wlname);
          sessionStorage.setItem("wltype",row.wltype);
          sessionStorage.setItem("unitcn",row.unitcn);

          this.$router.push({
            path:'/applyMain',
          })
        },
        getMaterialName(){
          this.$ajax.get('http://localhost:8082/apply/getMaterialsList',{
            params:{
              name:this.materialName
            }
          }).then(res=>{
            console.log(res.data)
              this.tableData=res.data;
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
