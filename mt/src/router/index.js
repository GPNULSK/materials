import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Index'
import applyMain from '../components/ApplyMain'
import selectId from '../components/SelectMaterials'
import selectByWarehouse from '../components/SelectWarehouse'
import getDcharger from '../components/GetDeptCharger'
import getWarehouseWorker from '../components/GetWarehouseWorker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:index
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/applyMain',
      component: applyMain
    },
    {
      path: '/selectId',
      component: selectId
    },
    {
      path: '/selectByWarehouse',
      component: selectByWarehouse
    },
    {
      path: '/getDcharger',
      component: getDcharger
    },
    {
      path: '/getWarehouseWorker',
      component: getWarehouseWorker
    }
  ]
})
