<template>
  <div>
    <section class="content-header">
      <div class="box box-info">
        <div class="box-header">
          <button type="button" class="btn btn-info" @click="getUserList">
            新增用户组
          </button>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">用户组列表</h3>
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
                    <th class="text-center">组名</th>
                    <th class="text-center">用户列表</th>
                    <th class="text-center">创建时间</th>
                    <th class="text-center">更新时间</th>
                    <th class="text-center">操作</th>
                  </tr>

                  <tr v-for="item in groupList">
                    <td class="text-center">{{item.id}}</td>
                    <td class="text-center">{{item.name}}</td>
                    <td class="text-center">{{item.user_id_list}}</td>
                    <td class="text-center">{{item.ctime}}</td>
                    <td class="text-center">{{item.utime}}</td>
                    <td class="text-center">
                      <button type="button" class="btn btn-default" @click="getGroupById(item.id)" data-toggle="modal"
                              data-target="#addGroupEditModal">
                        Edit
                      </button>
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
                <a href="#" class="btn btn-success" role="button" @click="delGroup">Yes</a>
                <a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-danger" role="button">No</a>
              </div>
            </div>
          </div>
        </div>

        <!--新增用户组-->
        <div class="modal fade" id="addGroupModal" tabindex="-1" role="dialog" aria-labelledby="myDelModalLabel"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span><span
                  class="sr-only">Close</span></button>
                <h4 class="modal-title" align="left">新增用户组:</h4>
              </div>
              <div class="box-body">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-object-group"></i></span>
                  <input type="text" class="form-control" placeholder="组名称" v-model="name">
                </div>
                <br>

                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-users"></i></span>
                  <select class="form-control select2 select2-hidden-accessible" multiple=""
                          data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">
                    <option v-for="v in userList" v-bind:title="v.id">
                      {{ v.name }}
                    </option>
                  </select>
                </div>

                <div class="box-footer">
                  <button type="button" class="btn btn-primary pull-right" @click="saveGroup">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--编辑用户组-->
        <div class="modal fade" id="addGroupEditModal" tabindex="-1" role="dialog" aria-labelledby="myDelModalLabel"
             aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span><span
                  class="sr-only">Close</span></button>
                <h4 class="modal-title" align="left">编辑组:</h4>
              </div>
              <div class="box-body">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-object-group"></i></span>
                  <input type="text" class="form-control" placeholder="组名称">
                </div>
                <br>

                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-users"></i></span>
                  <select class="form-control select2 select2-hidden-accessible" multiple=""
                          data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">
                    <option v-for="v in userEditList" v-bind:title="v.id">
                      {{ v.name }}
                    </option>
                  </select>
                </div>

                <div class="box-footer">
                  <button type="button" class="btn btn-primary pull-right" @click="saveGroup">Save</button>
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
  $(function () {
    $(".select2").select2();
  });

  import '../../assets/plugins/select2/select2.min.css'
  import '../../assets/plugins/select2/select2.full.min.js'

  import axios from 'axios'

  export default {
    data () {
      return {
        name: '',
        isDeleteId: 0,
        userList: [],
        groupList: [],
        userEditList: [],
      }
    },
    mounted () {
      this.getGroupList();
      this.$store.commit('updateNavShop', true)
    },
    methods: {
      saveGroup(){
        let list = [];
        $(".select2-selection__choice").each(function (index, data) {
          let id = $(data).attr("title");
          list.push(id)
        });

        if (!this.name || list.length <= 0) {
          this.message = '请输入参数';
          $('#topid').modal('show');
        }

        let url = '/group/add';
        let data = {
          name: this.name,
          User_id_list: list
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
      getUserList(){
        let url = '/user/list';
        axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.userList = res.data.data;
            $('#addGroupModal').modal('show');
          }
        })
      },
      getGroupList(){
        let url = '/group/list';
        axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.groupList = res.data.data;
          }
        })
      },
      setDeleteId(id){
        this.isDeleteId = id
      },
      delGroup(){
        if (!!this.isDeleteId) {
          let url = '/group/delete';
          axios.post(url, {id: this.isDeleteId}).then((res) => {
            if (res.data.code === 0) {
              window.location.reload()
            } else {
              this.message = res.data.message;
              $('#topid').modal('show');
            }
          })
        }
      },
      getGroupById(id){
        let url = '/group/get-by-id?id=' + id;
        axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.userEditList = res.data.data;
            $('#addGroupEditModal').modal('show');
          }
        })
      }
    }
  }
</script>
