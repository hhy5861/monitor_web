<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
        <li class="header">menu</li>

        <li class="treeview" v-bind:class="{active:isProjectShow}">
          <router-link to="/project/list">
            <i class="fa fa-delicious"></i>
            <span>项目管理</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </router-link>

          <ul class="treeview-menu">
            <li @click="setPath" v-bind:class="{ active:isProjectListShow}">
              <router-link to="/project/list"><i class="fa fa-object-group"></i> 项目列表</router-link>
            </li>
            <!--<li @click="setPath" v-bind:class="{ active:isProjectConfigShow}">
              <router-link to="/project/config"><i class="fa fa-object-ungroup"></i> 项目配置</router-link>
            </li>-->
          </ul>
        </li>

        <li class="treeview" v-bind:class="{active:isEmailShow}">
          <router-link to="/email/list">
            <i class="fa fa-envelope"></i>
            <span>邮件模板</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </router-link>
          <ul class="treeview-menu">
            <li @click="setPath" v-bind:class="{ active:isEmailSetShow}">
              <router-link to="/email/set"><i class="fa fa-newspaper-o"></i> 新增模板</router-link>
            </li>
            <li @click="setPath" v-bind:class="{ active:isEmailListShow}">
              <router-link to="/email/list"><i class="fa fa-reorder"></i> 模板列表</router-link>
            </li>
          </ul>
        </li>

        <li class="treeview" v-bind:class="{active:isUserShow}">
          <router-link to="/user/list">
            <i class="fa  fa-user-secret"></i>
            <span>用户组</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </router-link>
          <ul class="treeview-menu">
            <li @click="setPath" v-bind:class="{active:isUserListShow}">
              <router-link to="/user/list"><i class="fa fa-user"></i> 查用户</router-link>
            </li>
            <li @click="setPath" v-bind:class="{active:isUserGroupShow}">
              <router-link to="/user/group"><i class="fa fa-users"></i> 用户组</router-link>
            </li>
          </ul>
        </li>

        <!--<li @click="setPath">
          <router-link to="javascript:void(0);">
            <i class="fa fa-users"></i><span>用户列表</span>
          </router-link>
        </li>-->
      </ul>
    </section>
  </aside>
</template>

<script>
  export default {
    data () {
      return {
        path: '',

        isProjectShow: false,
        isProjectListShow: false,
        isProjectConfigShow: false,

        isEmailShow: false,
        isEmailSetShow: false,
        isEmailListShow: false,

        isUserShow: false,
        isUserListShow: false,
        isUserGroupShow: false,
      }
    },
    mounted () {

    },
    methods: {
      setPath(){
        let path = this.$route.path;
        let menuArray = path.split('/');
        switch (menuArray[1]) {
          case 'project':
            this.isProjectShow = true;
            switch (menuArray[2]) {
              case 'list':
                this.isProjectListShow = true;
                this.isProjectConfigShow = false;
                break;
              case 'config':
                this.isProjectListShow = false;
                this.isProjectConfigShow = true;
                break;
            }
            break;
          case 'email':
            this.isEmailShow = true;
            switch (menuArray[2]) {
              case 'set':
                this.isEmailSetShow = true;
                this.isEmailListShow = false;
                break;
              case 'list':
                this.isEmailSetShow = false;
                this.isEmailListShow = true;
                break;
            }
            break;
          case 'user':
            this.isUserShow = true;
            switch (menuArray[2]) {
              case 'list':
                this.isUserListShow = true;
                this.isUserGroupShow = false;
                break;
              case 'group':
                this.isUserListShow = false;
                this.isUserGroupShow = true;
                break;
            }
            break;
        }
      }
    }
  }
</script>
