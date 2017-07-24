import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index/Index'

import Login from '@/views/user/Login'

import ProjectList from '@/views/project/ProjectList'
import ProjectConfig from '@/views/project/ProjectConfig'

import TemplateSet from '@/views/email/TemplateSet'
import TemplateList from '@/views/email/TemplateList'

import UserList from '@/views/user/UserList'
import UserGroup from '@/views/user/UserGroup'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login/index',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/user/group',
      name: 'UserGroup',
      component: UserGroup
    },
    {
      path: '/index/index',
      name: 'Index',
      component: Index
    },

    {
      path: '/project/list',
      name: 'ProjectList',
      component: ProjectList
    },
    {
      path: '/project/config',
      name: 'ProjectConfig',
      component: ProjectConfig
    },

    {
      path: '/email/list',
      name: 'TemplateList',
      component: TemplateList
    },
    {
      path: '/email/set',
      name: 'TemplateSet',
      component: TemplateSet
    }
  ]
})
