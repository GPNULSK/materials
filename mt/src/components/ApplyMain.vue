<template>
  <div>
    <!--      使用header main footer布局-->
    <el-container>
      <!--  header开始-->
      <el-header style="">
        <el-page-header @back="goBack" >
        </el-page-header>
      </el-header>
      <!-- header结束-->

      <!--   main开始-->
      <el-main style="padding:0">
        <el-form>
        <span>物料代码:</span>
        <el-input v-on:click.native="toSelectId" v-model="materialCode" style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>

        <span>物料名称:</span>
        <el-input :disabled="true" v-model="materialName" style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>

        <span>物料类型:</span>
        <el-input :disabled="true" v-model="materialType"  style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>

        <span>计量单位:</span>
        <el-input :disabled="true" v-model="union"  style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>

        <span>需&nbsp;求&nbsp;量:</span>
        <el-input :required="true" v-model="account"  style="width: 200px" size="mini" placeholder="请选择仓库"></el-input>
        <br><br>
        <span>领料仓库</span>
        <el-input v-on:click.native="toSelectWarehouse" v-model="warehouseName" style="width: 200px" size="mini" placeholder="请选择仓库"></el-input>
        <br><br>
        <span>仓库代码:</span>
        <el-input :disabled="true" v-model="warehouseCode"  style="width: 200px" size="mini" placeholder="请输入内容"></el-input>
        <br><br>
<!--          领料方式-->
        <template>
          <span>领料方式:</span>
          <el-select size="mini" v-model="getMaterialMethodVal" placeholder="请选择">
            <el-option
              v-for="item in getMaterialMethod"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          <br><br>
<!--          是否紧急-->
          <template>
            <span>是否紧急:</span>
            <el-select size="mini" v-model="isUrgent" placeholder="请选择">
              <el-option
                v-for="item in isUrgentForm"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        <br><br>

        <!--          原因代码-->
        <template>
          <span>原因代码:</span>
          <el-select size="mini" v-model="reasonCode" placeholder="请选择">
            <el-option
              v-for="item in reasonCodeForm"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
          <br><br>

<!--          用途-->
         <span>用途：</span>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            style="width: 80%"
            v-model="useage"
           >
          </el-input>
        </el-form>
      </el-main>
      <!--main结束-->
      <div style="padding: 20px 0 0 0"></div>
      <!--footer开始-->
      <el-footer>
        <el-button type="success">提交</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

    export default {
        name: "ApplyMain",
      data(){
          return {
            materialCode: this.$route.query.materialCode,
            materialName:this.$route.query.materialName,
            materialType:this.$route.query.materialType,
            union:this.$route.query.union,
            warehouseName:this.$route.query.warehouse,
            warehouseCode:this.$route.query.warehouseCode,
            account:'',
            useage:'',

            getMaterialMethod:[
              {
                value:'非生产领用料',
                label:'非生产领用料'
              },
              {
                value:'生产领用料',
                label:'生产领用料'
              }
            ],
            isUrgentForm:[
              {
                value:'是',
                label:'是'
              },
              {
                value:'否',
                label:'否'
              }
            ],
            reasonCodeForm:[
              {
                value:'原因代码',
                label:'原因代码'
              }
            ],
            getMaterialMethodVal:'',
            isUrgent:'',
            reasonCode:'',
          }
      },
      methods: {
        toSelectId(){
          this.$router.push({
            path:"/selectId",
          })
        },

        toSelectWarehouse(){
          this.$router.push('/selectByWarehouse')
        },
        goBack(){
          this.$router.go(-1)
        }
      },

    }
</script>

<style scoped>

</style>
