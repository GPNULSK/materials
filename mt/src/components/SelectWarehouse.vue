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
              v-if="false"
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
      //自动加载
      created() {

        this.$message({
          message:'正在加载仓库信息',
        })

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
          if(data == ''){
            this.$message({
              message:'查找完成，没有查到仓库信息',
              type:'success'
            })
          }
        })
      },

      methods: {

        getCurId(row){
          sessionStorage.setItem("warehouseName",row.dsca2);
          sessionStorage.setItem("warehouseCode",row.cwar)
          this.inventory=row.qhnd
		      sessionStorage.setItem("inventory",row.qhnd)
          //
          this.$ajax.get(this.apiUrl+'/apply/getWarehouseCode',{
            params: {
              code:row.cwar,
              warehouseName1:row.dsca2,
              inventory:this.inventory
            }
          }).then(res=>{
              let data=res.data
              console.log(data)
              if(row.dsca2 == '合格品仓库(WMS)'){
                console.log('在选择仓库时确认了，该物品在wms库')
                sessionStorage.setItem("wmsWorker",data.usnm)
                console.log(sessionStorage.getItem('wmsWorker'))
              }

              this.$router.replace({
                path:'/applyMain',
              })
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
