<template>
  <div>

    <el-container>
      <el-header>
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <el-main style="padding: 0">
        <span>物料代码:</span>
        <el-input v-model="code1"   style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
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
        name: "SelectMaterials",
      data(){
          return{
            materialCode: '',
            materialName:'',
            materialType:'',
            union:'',
            curPage:1,
            totalPage:'',
            totalRecord:0,
            code1:'',
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
          sessionStorage.setItem("wltype",row.wlgroup);
          sessionStorage.setItem("unitcn",row.unitcn);
          sessionStorage.setItem("source",row.lyxx);//物料来源
          sessionStorage.setItem("materialGroupCode",row.wlgroupcode)

          this.$router.push({
            path:'/applyMain',
          })
        },
        getMaterialName(){
          this.$message({
            showClose: true,
            message: '搜索中...'
          })
          this.$ajax.get(this.apiUrl+'/apply/getMaterialsList',{
            params:{
              code:this.code1,
              curPage:this.curPage
            }
          }).then(res=>{
            this.$message({
              showClose: true,
              message: '搜索成功...',
              type: 'success'
            });
            console.log(res.data)
            let data=res.data;
            this.tableData=data.materials
            let pageList=data.pageInfo
			      console.log(pageList)
            this.totalPage=pageList[0]
            this.totalRecord=pageList[1]
			      console.log(pageList[0])

          })
        },
        currentPage(val){
          this.$message({
            showClose: true,
            message: '翻页中......'
          })
          this.curPage=val
          this.$ajax.get(this.apiUrl+'/apply/getMaterialsList',{
            params:{
              code:this.code1,
              curPage:val
            }
          }).then(res=>{
            this.$message({
              showClose: true,
              message: '翻页成功...',
              type: 'success'
            });
            console.log(res.data)
            let data=res.data;
            this.tableData=data.materials
          })
        },

        goBack(){
          this.$router.go(-1)
        }
      }

    }
</script>

<style scoped>

.el-footer {
  padding: 0;
}

</style>
