<template>
  <div>
    <section class="content">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">报警配置</h3>
        </div>
        <div class="box-body">
          <div class="col-xs-1">
            <button type="button" class="btn btn-warning" data-toggle="dropdown">{{typeName}}
              <span class="fa fa-caret-down"></span></button>
            <ul class="dropdown-menu">
              <li><a href="javascript:void(0);" v-on:click="selectStrategy(1)">单策略</a></li>
              <li><a href="javascript:void(0);" v-on:click="selectStrategy(2)">双策略</a></li>
            </ul>
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Module" v-model="module">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Point" v-model="point">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Group-A-1" v-model="field_a1">
          </div>
          <div class="col-xs-1">
            <select class="form-control content" id="op">
              <option>></option>
              <option><</option>
              <option>>=</option>
              <option><=</option>
              <option><></option>
              <option>+</option>
              <option>-</option>
              <option>×</option>
              <option>÷</option>
            </select>
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Group-A-2" v-model="field_a2">
          </div>

          <div class="col-xs-1" v-show="double">
            <input type="text" class="form-control" placeholder="Group-B-1" v-model="field_b2">
          </div>
          <div class="col-xs-1" v-show="double">
            <select class="form-control" id="optwo">
              <option>></option>
              <option><</option>
              <option>>=</option>
              <option><=</option>
              <option>DiffRange</option>
            </select>
          </div>
          <div class="col-xs-1" v-show="double">
            <input type="text" class="form-control" placeholder="Group-B-2" v-model="field_b2">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="级别(整数:0,1,2,3)" v-model="level">
          </div>

          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="报警(整数)" v-model="limit">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="范围(秒)" v-model="range">
          </div>
          <div class="col-xs-1">
            <select class="form-control" id="group_id">
              <option value="0">请选择组</option>
              <option v-for="v in groupList" v-bind:value="v.id">{{v.name}}</option>
            </select>
          </div>
          <div class="col-xs-1 left">
            <button type="button" class="btn btn-dropbox" v-on:click="SaveConfig">Save</button>
          </div>
        </div>
      </div>

      <div class="box box-danger">
        <div class="box-body" v-for="item in list">
          <div class="col-xs-1">
            <button type="button" class="btn btn-default" data-toggle="dropdown">{{item.conf_name}}</button>
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Module" v-model="item.module">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Point" v-model="item.point">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Group-A-1" v-model="item.strategy.field1">
          </div>
          <div class="col-xs-1">
            <select class="form-control content" id="op">
              <option>{{item.strategy.op}}</option>
            </select>
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="Group-A-2" v-model="item.strategy.field2">
          </div>

          <div class="col-xs-1" v-show="item.strategy.field3">
            <input type="text" class="form-control" placeholder="Group-B-1" v-model="item.strategy.field3">
          </div>
          <div class="col-xs-1" v-show="item.strategy.field3">
            <select class="form-control" id="optwo">
              <option>{{item.strategy.opo}}</option>
            </select>
          </div>
          <div class="col-xs-1" v-show="item.strategy.field3">
            <input type="text" class="form-control" placeholder="Group-B-2" v-model="item.strategy.field4">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="级别" v-model="item.strategy.level">
          </div>

          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="报警数" v-model="item.strategy.limit">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="范围" v-model="item.strategy.range">
          </div>
          <div class="col-xs-1">
            <input type="text" class="form-control" placeholder="范围(秒)" v-model="item.strategy.group_id">
          </div>

          <div class="col-xs-1 left">
            <button type="button" class="btn btn-danger" data-toggle="modal"
                    data-target="#myDelModal" v-on:click="setDeleteId(item.id)">Delete
            </button>
          </div>
        </div>
      </div>

      <!--提示层-->
      <div class="modal fade" id="topid" tabindex="-1" role="dialog" aria-labelledby="myDelModalLabel"
           aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span
                aria-hidden="true">&times;</span><span
                class="sr-only">Close</span></button>
              <!--<h4 class="modal-title" align="left">操作提醒:</h4>-->
            </div>

            <div class="modal-body">
              <p class="text-center">{{message}}</p>
            </div>

            <div class="modal-footer">
              <a href="#" id="btnDelYes" class="btn btn-success" role="button">Yes</a>
              <a href="#" data-dismiss="modal" aria-hidden="true" class="btn btn-danger" role="button">No</a>
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
              <a href="javascript:void(0);" class="btn btn-success" role="button" @click="deleteConfig">Yes</a>
              <a href="javascript:void(0);" data-dismiss="modal" aria-hidden="true" class="btn btn-danger"
                 role="button">No</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import '../../assets/plugins/datatables/dataTables.bootstrap.css'

  import axios from 'axios'

  export default {
    data () {
      return {
        list: [],
        double: false,
        typeName: "配置类型",
        type: 0,
        module: '',
        point: '',
        field_a1: '',
        field_a2: '',
        field_b1: '',
        field_b2: '',
        level: '',
        limit: '',
        range: '',
        message: '',
        deleteId: 0,
        groupList: []
      }
    },
    mounted () {
      this.getList();
      this.getGroupList();
      this.selectStrategy(1);
      this.$store.commit('updateNavShop', true);
    },
    methods: {
      selectStrategy(type){
        switch (type) {
          case 1:
            this.typeName = '单策略';
            this.double = false;
            break;
          case 2:
            this.typeName = '双策略';
            this.double = true;
            break;
        }

        this.type = type;
      },
      SaveConfig(){
        let id = this.$route.query.id;
        let token = this.$route.query.token;
        console.log(this.module, this.point, id, token);
        if (!this.module || !this.point || !id || !token) {
          this.message = "输入参数不正确";
          $('#topid').modal('show');
          return
        }

        let op1 = $("#op option:selected").text();
        let op2 = $("#optwo option:selected").text();
        let group_id = $("#group_id option:selected").val();
        let data = {
          module: this.module,
          point: this.point,
          op: op1,
          opo: this.type === 2 ? op2 : "",
          field1: this.field_a1,
          field2: this.field_a2,
          field3: this.field_b1,
          field4: this.field_b2,
          level: parseInt(this.level),
          limit: parseInt(this.limit),
          range: parseInt(this.range),
          group_id: parseInt(group_id)
        };

        this.deleteEmptyProperty(data);
        let objData = {
          project_id: parseInt(id),
          token: token,
          module: this.module,
          point: this.point,
          strategy: data,
          conf_type: this.type === 2 ? 2 : 1
        };

        let url = '/config/add';
        axios.post(url, objData).then((res) => {
          if (res.data.code === 0) {
            window.location.reload()
          } else {
            this.message = res.data.message;
            $('#topid').modal('show')
          }
        })
      },
      getList(){
        let url = '/config/list?id=' + this.$route.query.id;
        axios.get(url).then((res) => {
          if (res.data.code === 0) {
            this.list = res.data.data
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
        this.deleteId = id
      },
      deleteConfig(){
        let id = parseInt(this.deleteId);
        if (id > 0) {
          let url = '/config/delete';
          let data = {id: parseInt(this.deleteId)};
          axios.post(url, data).then((res) => {
            if (res.data.code === 0) {
              window.location.reload()
            } else {
              this.message = res.data.message;
              $('#topid').modal('show')
            }
          })
        } else {
          this.message = '数据出错了';
          $('#topid').modal('show')
        }
      }
    }
  }
</script>
