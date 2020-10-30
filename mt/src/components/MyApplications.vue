<template>

  <el-container>
    <el-header><el-page-header @back="goBack" >
    </el-page-header>
    </el-header>
    <el-main>
      <div>
        <template>
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <br><br>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="materialCode"
              label="物料代码">
            </el-table-column>
            <el-table-column
              prop="materialName"
              label="物料名称">
            </el-table-column>
            <el-table-column
              prop="materialType"
              label="物料属性">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位">
            </el-table-column>
            <el-table-column
              prop="demand"
              label="需求量">
            </el-table-column>
            <el-table-column
              prop="warehouse"
              label="仓库">
            </el-table-column>

            <el-table-column
              prop="pickingUser"
              label="申请人">
            </el-table-column>

            <el-table-column
              prop="pickingUser"
              label="领料人">
            </el-table-column>

            <el-table-column
              prop="applyDate"
              label="填单时间">
            </el-table-column>

            <el-table-column
              prop="deptName"
              label="领料部门">
            </el-table-column>
            <el-table-column
              prop="warehouseWorkerId.usnm"
              label="实物仓管员">
            </el-table-column>

            <el-table-column
              prop="readyDate"
              label="备料时间">
            </el-table-column>

            <el-table-column
              prop="readyNumber"
              label="备料数量">
            </el-table-column>

            <el-table-column
              prop="status"
              label="签审状态">
            </el-table-column>

            <el-table-column
              v-if="false"
              prop="id"
              label="单号">
            </el-table-column>


          </el-table>
        </template>
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

</template>

<script>
  export default {
  name: "MyApplications",
  data(){
    return{
      tableData:[],
      totalRecord:0
    }
  },
    methods: {
    //删除申请单，需要参数：用户名，工号，申请单号
      handleDelete(index,row){
        this.$ajax.get(this.apiUrl+'/applications/applyDelete',{
          params: {
            username:'林盛凯',
            userId:'114200563',
            applyId:row.id
          }
        }).then(res=>{
			if(res.data=='success'){
				//发起请求得到我的申请列表
			  this.$ajax.get(this.apiUrl+'/applications/applyList',{
				params: {
				  uid:this.$root.uid,
				  curPage:1
				  }
			  }).then(res=>{
					console.log(res.data)
				let data=res.data
					this.tableData=res.data.result
				this.totalRecord=data.page[0]
				for(let i=0;i<this.tableData.length;i++){
				this.tableData[i].applyDate=res.data.time[i]
				this.tableData[i].readyDate=res.data.bl[i]
        }
      })
			}

        })
      },

	  currentPage(val){
		//发起请求得到我的申请列表
      this.$ajax.get(this.apiUrl+'/applications/applyList',{
        params: {
          uid:this.uid,
		  curPage:val
        }
      }).then(res=>{
			console.log(res.data)
        let data=res.data
		    this.tableData=res.data.result
        this.totalRecord=data.page[0]
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].applyDate=res.data.time[i]
		      this.tableData[i].readyDate=res.data.bl[i]
        }
      })
	  },
      goBack(){
        this.$router.go(-1);
      }
    },
    created() {
    //发起请求得到我的申请列表
      this.$ajax.get(this.apiUrl+'/applications/applyList',{
        params: {
          uid:this.$root.uid,
		      curPage:1
        }
      }).then(res=>{
			console.log(res.data)
        let data=res.data
		    this.tableData=res.data.result
        this.totalRecord=data.page[0]
        for(let i=0;i<this.tableData.length;i++){
        this.tableData[i].applyDate=res.data.time[i]
		    this.tableData[i].readyDate=res.data.bl[i]
        }
      })
    }
  }
</script>

<style scoped>

</style>
