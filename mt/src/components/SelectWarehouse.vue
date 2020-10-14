<template>

  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <el-main style="padding: 0">
        <span>选择领料仓库:</span>
        <el-input v-model="warehouse"   style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>
        <div class="table_div">
          <el-table
            :data="tableData"
            border
            size="mini"
            @row-click="getCurId"
            :show-header="false"
            style="width: 100%;">
            <el-table-column
              label="领料仓库"
              prop = "dsca2"
              align="center">
            </el-table-column>

            <el-table-column
              label="仓库代码"
              v-if="false"
              prop = "cwar"
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
        name: "SelectWarehouse",
      data(){
          return {
            tableData:[],
            warehouse:'',

          }
      },
      mounted() {
        this.$ajax.get('http://localhost:8082/apply/getWarehouse').then(res=>{

          let data=res.data
          this.tableData=data

        })
      },
      methods: {
        getCurId(row){
          console.log(row.dsca2);
          this.warehouse=row.dsca2
          this.$router.push({
            path:'/applyMain',
            query: {
              warehouse:this.warehouse,
              warehouseCode:row.cwar
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
