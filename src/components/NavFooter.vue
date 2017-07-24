<template>
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> {{ version }}
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong> All rights
    reserved.
  </footer>
</template>

<script>
  import '../assets/plugins/jQuery/jquery-2.2.3.min.js'
  import '../assets/bootstrap/js/bootstrap.min.js'
  import '../assets/plugins/fastclick/fastclick.js'
  import '../assets/plugins/sparkline/jquery.sparkline.min.js'
  import '../assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'
  import '../assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'
  import '../assets/plugins/slimScroll/jquery.slimscroll.min.js'
  import '../assets/dist/js/app.min.js'

  export default {
    data () {
      return {
        version: '1.0.0',
      }
    }
  }
</script>
