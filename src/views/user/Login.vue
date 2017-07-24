<template>
  <div class="login-box">
    <div class="login-logo">
      <router-link to="/login/index">{{ labname }}</router-link>
    </div>
    <div class="login-box-body">
      <div class="form-group has-feedback">
        <input type="account" class="form-control" placeholder="Account" v-model="account">
        <span class="glyphicon glyphicon-user form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" v-model="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label v-on:click="click_remember"><input type="checkbox"> Remember Me</label>
          </div>
        </div>
        <div class="col-xs-4">
          <button type="button" class="btn btn-primary btn-block btn-flat" v-on:click="login">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%'
    });
  });

  import '@/assets/bootstrap/css/bootstrap.min.css'
  import '@/assets/dist/css/AdminLTE.min.css'
  import '@/assets/plugins/iCheck/square/blue.css'

  import '@/assets/plugins/jQuery/jquery-2.2.3.min.js'
  import '@/assets/bootstrap/js/bootstrap.min.js'
  import '@/assets/plugins/iCheck/icheck.min.js'

  import axios from 'axios'

  export default {
    data () {
      return {
        navShop: false,
        account: '',
        password: '',
        rememberMe: false,
        labname: "监控系统"
      }
    },
    created(){
      document.body.setAttribute("class", "hold-transition login-page");
    },
    methods: {
      login(){
        let _this = this;
        if (!_this.account || !_this.password) {
          return
        }

        let data = {
          username: _this.account,
          password: _this.password,
          rememberMe: _this.rememberMe
        };

        let url = '/login/login';
        axios.post(url, data).then((res) => {
          if (res.data.code === 0) {
            this.$store.commit('updateUserInfo', res.data.data);
            this.$router.push('/index/index');
          }
        })
      },
      click_remember(){
        this.rememberMe = this.rememberMe === false;
      }
    },
    mounted () {
      this.$store.commit('updateNavShop', false)
    }
  }
</script>
