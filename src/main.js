import Vue from 'vue'
import Vuex from 'vuex'
import App from '@/components/App'
import router from './router'

import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(Vuex);

axios.defaults.baseURL = 'http://monitor.servce.pnlyy.com';
axios.defaults.headers.common['token'] = 'xxxx';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const store = new Vuex.Store({
  state: {
    navShop: true,
    userInfo: {
      name: "",
      token: null,
      id: null,
    }
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    updateNavShop(state, flag){
      state.navShop = flag
    }
  }
});

function deleteEmptyProperty(object) {
  for (let i in object) {
    let value = object[i];
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i];
          continue;
        }
      }
      deleteEmptyProperty(value);
      if (isEmpty(value)) {
        delete object[i];
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i];
      }
    }
  }
}

Vue.prototype.deleteEmptyProperty = deleteEmptyProperty;

function isEmpty(object) {
  for (let name in object) {
    return false;
  }

  return true;
}

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
  data: {
    isCheckLogin: true
  },
  /*watch: {
   "$route": 'checkLogin'
   },*/
  mounted () {
    // this.checkLogin(this.token);
  },
  methods: {
    checkLogin(){
      let token = this.$store.state.userInfo.token;
      if (!!token) {
        let url = '/user/check-login';
        let data = {token: token};
        axios.post(url, data).then((res) => {
          if (res.data.code === 0 && res.data.data) {

          } else {
            this.$router.push('/login/index');
          }
        });
      } else {
        this.$router.push('/login/index');
      }
    }
  }
});
