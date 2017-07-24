<template>
  <div>
    <section class="content-header">
      <div class="box box-info">
        <div class="box-header">
          <button type="button" class="btn btn-info" data-toggle="modal"
                  data-target="#addUserModal">
            新增用户
          </button>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">用户列表</h3>
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
                    <th class="text-center">用户名</th>
                    <th class="text-center">手机号</th>
                    <th class="text-center">电子邮件</th>
                    <th class="text-center">创建时间</th>
                    <th class="text-center">更新时间</th>
                    <th class="text-center">操作</th>
                  </tr>

                  <tr v-for="item in result">
                    <td class="text-center">{{item.id}}</td>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center">{{item.mobile}}</td>
                    <td class="text-center">{{item.email}}</td>
                    <td class="text-center">{{item.ctime}}</td>
                    <td class="text-center">{{item.utime}}</td>
                    <td class="text-center">
                      <button type="button" @click="setDeleteId(item.id)" class="btn btn-danger" data-toggle="modal"
                              data-target="#myDelModal">
                        Delete
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
                <a href="#" class="btn btn-success" role="button" @click="delUser">Yes</a>
                <a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-danger" role="button">No</a>
              </div>
            </div>
          </div>
        </div>

        <!--新增用户-->
        <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="myDelModalLabel"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span
                  aria-hidden="true">&times;</span><span
                  class="sr-only">Close</span></button>
                <h4 class="modal-title" align="left">新增用户:</h4>
              </div>
              <div class="box-body">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-user"></i></span>
                  <input type="text" class="form-control" placeholder="用户名称" v-model="name">
                </div>
                <br>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-mobile-phone"></i></span>
                  <input type="text" class="form-control" placeholder="手机号" v-model="mobile">
                </div>
                <br>
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                  <input type="text" class="form-control" placeholder="电子邮件" v-model="email">
                </div>
                <br>
                <div class="box-footer">
                  <button type="button" class="btn btn-primary pull-right" @click="saveUser">Save</button>
                </div>
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
        name: '',
        email: '',
        mobile: '',
        isDeleteId: 0,
        result: []
      }
    },
    mounted () {
      this.getList();
      this.$store.commit('updateNavShop', true)
    },
    methods: {
      saveUser(){
        if (!this.name || (!this.email || !this.mobile)) {
          this.message = '请输入参数';
          $('#topid').modal('show');
        }

        let url = '/user/add';
        let data = {
          name: this.name,
          email: this.email,
          mobile: this.mobile,
        };

        axios.post(url, data).then((res) => {
          if (res.data.code === 0) {
            window.location.reload()
          } else {
            this.message = res.data.message;
            $('#topid').modal('show');
          }
        })
      },
      getList(){
        let url = '/user/list';
        axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.result = res.data.data;
          }
        })
      },
      setDeleteId(id){
        this.isDeleteId = id
      },
      delUser(){
        if (!!this.isDeleteId) {
          let url = '/user/delete';
          axios.post(url, {id: this.isDeleteId}).then((res) => {
            if (res.data.code === 0) {
              window.location.reload()
            } else {
              this.message = res.data.message;
              $('#topid').modal('show');
            }
          })
        }
      }
    }
  }
</script>
