<template>
  <div>
    <div class="wrapper" v-if="navShop">
      <nav-header></nav-header>
      <nav-lefter></nav-lefter>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
      <nav-footer></nav-footer>
    </div>

    <div v-if="!navShop">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavLefter from '@/components/NavLefter'
  import NavFooter from '@/components/NavFooter'

  export default {
    name: 'app',
    data () {
      return {}
    },
    components: {
      NavHeader: NavHeader,
      NavLefter: NavLefter,
      NavFooter: NavFooter
    },
    created(){
      document.body.setAttribute("class", "hold-transition skin-blue sidebar-mini");
    },
    computed: {
      navShop(){
        return this.$store.state.navShop;
      }
    }
  }
</script>

