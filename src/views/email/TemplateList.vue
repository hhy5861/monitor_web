<template>
  <div>
    <section class="content">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">模块列表</h3>
          <div class="box-tools">
            <div class="input-group input-group-sm" style="width: 150px;">
              <input class="form-control pull-right" placeholder=" input users name" type="text">
              <div class="input-group-btn">
                <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>

        <div class="box-body">
          <div id="example2_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
            <div class="row">
              <div class="col-sm-6"></div>
              <div class="col-sm-6"></div>
            </div>
            <div class="box">
              <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                  <tbody>
                  <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center">模板名称</th>
                    <th class="text-center">创建时间</th>
                    <th class="text-center">更新时间</th>
                    <th class="text-center">操作</th>
                  </tr>

                  <tr v-for="item in list">
                    <td class="text-center">{{item.id}}</td>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center">{{item.ctime}}</td>
                    <td class="text-center">{{item.utime}}</td>
                    <td class="text-center">
                      <router-link :to="{path:'/project/config',query:{id:item.id,token:item.token}}"
                                   class="btn btn-info">
                        模板编辑
                      </router-link>

                      <button type="button" class="btn btn-danger"
                              data-toggle="modal"
                              data-target="#myDelModal">Delete
                      </button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!--删除提示-->
        <div class="modal fade" id="myDelModal" tabindex="-1" role="dialog" aria-labelledby="myDelModalLabel"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span
                  aria-hidden="true">&times;</span><span
                  class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myDelModalLabel" align="left">操作提醒:</h4>
              </div>

              <div class="modal-body">
                <p>确认要删除吗?</p>
              </div>

              <div class="modal-footer">
                <a href="#" id="btnDelYes" class="btn btn-success" role="button">Yes</a>
                <a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-danger" role="button">No</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.getList();
      this.$store.commit('updateNavShop', true)
    },
    methods: {
      getList(){
        let url = '/email/list';
        axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.list = res.data.data
          }
        })
      }
    }
  }
</script>
