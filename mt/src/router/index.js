import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/Index'
import applyMain from '../components/ApplyMain'
import selectId from '../components/SelectMaterials'
import selectByWarehouse from '../components/SelectWarehouse'
import getDcharger from '../components/GetDeptCharger'
import getWarehouseWorker from '../components/GetWarehouseWorker'
import applications from '../components/MyApply'
import auditList from '../components/AuditList'
import audit from '../components/Audit'
import readyList from '../components/ReadyList'
import ready from '../components/Ready'
import Ready from "../components/Ready";

import sureList from '../components/SureList'
import sure from '../components/Sure'
import Sure from "../components/Sure";
import gklist from '../components/GKlist'
import getGk from '../components/GetGK'
import gk from '../components/GK'
import nextWorker from '../components/NextWorker'

Vue.use(Router)

export default new Router({
  routes: [
    {path:"/", component:index},

    {path: '/index', component: index},

    {path: '/applyMain', component: applyMain},

    {path: '/selectId', component: selectId},

    {path: '/selectByWarehouse', component: selectByWarehouse},

    {path: '/getDcharger', component: getDcharger},

    {path: '/getWarehouseWorker', component: getWarehouseWorker},

    {path: '/applications', component: applications},

    {path: '/auditList', component: auditList},

    {path: '/audit', component: audit},
    {path: '/readyList',component: readyList},
    {path: '/ready',component: Ready},
    {path: '/sureList',component: sureList},
    {path: '/sure',component: Sure},
    {path: '/GkList',component: gklist},
    {path: '/gk',component: gk},
    {path: '/getGk',component: getGk},
    {path: '/nextWorker',component: nextWorker}

  ],
  mode:'history',
  base:'WxMaterial'
})
