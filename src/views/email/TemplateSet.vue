<template>
  <div>
    <section class="content">
      <div class="col-md-9">
        <div class="tab-content">
          <form class="form-horizontal">
            <div class="form-group">
              <label for="inputName" class="col-sm-2 control-label">模板名称</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="inputName" placeholder="模板名称" v-model="name">
              </div>
            </div>
            <div class="form-group">
              <label for="inputName" class="col-sm-2 control-label">邮件标题</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="inputName" placeholder="邮件标题" v-model="subject">
              </div>
            </div>
            <div class="form-group">
              <label for="inputExperience" class="col-sm-2 control-label">模板内容</label>
              <div class="col-sm-10">
                <textarea class="form-control" id="inputExperience" placeholder="模板内容" v-model="content"></textarea>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="button" class="btn btn-danger" @click="saveTemplate">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

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
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data () {
      return {
        to: '',
        cc: '',
        name: '',
        content: '',
        message: '',
        subject: '',
        list: []
      }
    },
    mounted () {
      this.$store.commit('updateNavShop', true)
    },
    methods: {
      saveTemplate(){
        if (!this.name || !this.content) {
          this.message = '请输入参数';
          $('#topid').modal('show');
        }

        let url = '/email/add';
        let data = {
          to: this.to,
          cc: this.cc,
          name: this.name,
          subject: this.subject,
          content: this.content
        };

        axios.post(url, data).then((res) => {
          if (res.data.code === 0) {
            window.location.href = '/email/list'
          } else {
            this.message = res.data.message;
            $('#topid').modal('show');
          }
        })
      }
    }
  }
</script>
