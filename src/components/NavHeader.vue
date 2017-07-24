<template>
  <header class="main-header">
    <router-link to="/" class="logo">
      <span class="logo-mini"><b>监控</b>系统</span>
      <span class="logo-lg"><b>监控</b>系统</span>
    </router-link>

    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!--<div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown messages-menu">
            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-envelope-o"></i>
              <span class="label label-success">4</span>
            </a>
          </li>

          <li class="dropdown notifications-menu">
            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning">10</span>
            </a>
          </li>

          <li class="dropdown user user-menu">
            <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../assets/dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">{{name}}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="../assets/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                <p>{{name}} - Web Developer<small>Member since Nov. 2017</small></p>
              </li>

              <li class="user-footer">
                <div class="pull-left">
                  <a href="javascript:void(0);" class="btn btn-default btn-flat">修改密码</a>
                </div>
                <div class="pull-right">
                  <a href="javascript:void(0);" class="btn btn-default btn-flat" v-on:click="checkOut">退出登陆</a>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>-->
    </nav>
  </header>
</template>

<script>
  import '../assets/bootstrap/css/bootstrap.min.css'
  import '../assets/plugins/colorpicker/bootstrap-colorpicker.min.css'
  import '../assets/plugins/timepicker/bootstrap-timepicker.min.css'
  import '../assets/dist/css/AdminLTE.min.css'
  import '../assets/dist/css/skins/_all-skins.min.css'

  export default {
    data () {
      return {
        title: "妙克监控系统管理"
      }
    },
    computed: {
      name(){
        return this.$store.state.userInfo.name;
      }
    },
    methods: {
      checkOut(){
//        this.$store.commit('updateUserInfo',[]);
        this.$router.push('/login/index');
      }
    }
  }
</script>
