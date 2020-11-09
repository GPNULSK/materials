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
        <br>
        <span style="font-size: small;color: #dd6161">仓库加载需要几秒钟时间，请耐心..</span>
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
              label="库存量"
              prop = "qhnd"
              align="center">
            </el-table-column>

            <el-table-column
              label="仓库代码"
              v-if="false"
              prop = "cwar"
              align="center">
            </el-table-column>

            <el-table-column
              label="物料代码"
              v-if="false"
              prop = "code"
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
            inventory:0,

          }
      },
      mounted() {
        let code=sessionStorage.getItem("materialCode")
        console.log(code)
        this.$ajax.get(this.apiUrl+'/apply/getWarehouse',{
          params: {
            code: code
          }
        }).then(res=>{
          let data=res.data
          console.log(data)
          this.tableData=data
        })
      },
      methods: {
        getCurId(row){
          sessionStorage.setItem("warehouseName",row.dsca2);
          sessionStorage.setItem("warehouseCode",row.cwar)
          this.inventory=row.qhnd
		      sessionStorage.setItem("inventory",row.qhnd)
          //自动带出仓管员
          this.$ajax.get(this.apiUrl+'/apply/getWarehouseWorkerAuto',{
            params: {
              materialCode:sessionStorage.getItem("materialCode"),
              warehouseCode:row.cwar
            }
          }).then(res=>{
            if(res.data!=null){
              sessionStorage.setItem("warehouseWorker",res.data.nsmn)
            }
          })
          //
          this.$ajax.get(this.apiUrl+'/apply/getWarehouseCode',{
            params: {
              code:row.cwar,
              warehouseName1:row.dsca2,
              inventory:this.inventory
            }
          })
          this.$router.push({
            path:'/applyMain',
            // query: {
            //   warehouse:this.warehouse,
            //   warehouseCode:row.cwar
            // }
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
