import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue' 

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue' 

import QuestionEdit from '../views/QuestionEdit.vue'
import QuestionList from '../views/QuestionList.vue' 

import TestEdit from '../views/TestEdit.vue'
import TestList from '../views/TestList.vue' 

import TestItemEdit from '../views/TestItemEdit.vue'
import TestItemList from '../views/TestItemList.vue' 

import DepartmentEdit from '../views/DepartmentEdit.vue'
import DepartmentList from '../views/DepartmentList.vue' 

import RecruitEdit from '../views/RecruitEdit.vue'
import RecruitList from '../views/RecruitList.vue' 

import VitaeEdit from '../views/VitaeEdit.vue'
import VitaeList from '../views/VitaeList.vue' 
Vue.use(Router)
const router = new Router({
  routes: [
    {
      //mate isPublic是否公开，登陆校验
      path:'/login',name:'login',component:Login,meta: { isPublic: true },
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {path:'/categories/create',component:CategoryEdit,},
        {path:'/categories/list',component:CategoryList},
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},
  
        {path:'/items/create',component:ItemEdit,},
        {path:'/items/list',component:ItemList},
        {path:'/items/edit/:id',component:ItemEdit,props:true},
  
        {path:'/heroes/create',component:HeroEdit,},
        {path:'/heroes/list',component:HeroList},
        {path:'/heroes/edit/:id',component:HeroEdit,props:true},
  
        {path:'/articles/create',component:ArticleEdit,},
        {path:'/articles/list',component:ArticleList},
        {path:'/articles/edit/:id',component:ArticleEdit,props:true},
  
        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit, props: true },
        { path: '/ads/list', component: AdList },
  
        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },

        {path:'/questions/create',component:QuestionEdit,},
        {path:'/questions/list',component:QuestionList},
        {path:'/questions/edit/:id',component:QuestionEdit,props:true},

        {path:'/tests/create',component:TestEdit,},
        {path:'/tests/list',component:TestList},
        {path:'/tests/edit/:id',component:TestEdit,props:true},

        {path:'/test_items/create',component:TestItemEdit,},
        {path:'/test_items/list',component:TestItemList},
        {path:'/test_items/edit/:id',component:TestItemEdit,props:true},

        {path:'/departments/create',component:DepartmentEdit,},
        {path:'/departments/list',component:DepartmentList},
        {path:'/departments/edit/:id',component:DepartmentEdit,props:true},

        {path:'/recruits/create',component:RecruitEdit,},
        {path:'/recruits/list',component:RecruitList},
        {path:'/recruits/edit/:id',component:RecruitEdit,props:true},

        {path:'/vitaes/create',component:VitaeEdit,},
        {path:'/vitaes/list',component:VitaeList},
        {path:'/vitaes/edit/:id',component:VitaeEdit,props:true},
      ]
    },
  ]
})
//路由守卫
router.beforeEach((to,from,next)=>{
  //页面不公开且用户不存在
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router
