import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Index'
import applyMain from '../components/ApplyMain'
import selectId from '../components/SelectMaterials'
import selectByWarehouse from '../components/SelectWarehouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:index
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
    }
  ]
})
