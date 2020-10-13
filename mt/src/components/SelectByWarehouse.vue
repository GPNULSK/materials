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
              prop = "warehouseCode"
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
        name: "SelectByWarehouse",
      data(){
          return {
            tableData:[
              {warehouseCode:'B2'},
              {warehouseCode:'B3'},
            ],
            warehouse:'',
            warehouseCode:''
          }
      },
      methods: {
        getCurId(row){
          console.log(row.warehouseCode);
          this.warehouse=row.warehouseCode
          this.warehouseCode="166"
          this.$router.push({
            path:'/applyMain',
            query: {
              warehouse:this.warehouse,
              warehouseCode:this.warehouseCode
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
