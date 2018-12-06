<template>
  <div class="login-page">
    <div class="center-block">
      <img slot="prefix" class="logo" src="../assets/logoimage.png" style="width: 200px;height: 100px;">
      <el-form>
				<el-form-item>
          <el-input
            placeholder="用户名"
            v-model="params.account">
            <img slot="prefix" class="el-input__icon" src="../assets/账户.png" />
          </el-input>
				</el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="密码"
            v-model="params.password"
            @keyup.native="show($event)">
            <img slot="prefix" class="el-input__icon" src="../assets/密码.png" />
          </el-input>
        </el-form-item>
        <el-button type="danger" :loading="loading" @click.native="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { storage } from '@/util'

export default {
    data(){
        return{
            loading:false,
            params:{
                account:'',
                password:''
            }
        }
    },
    methods:{
        //登录接口
        login(){
            const _this = this;
            this.loading=true;
            setTimeout(()=>{
                _this.loading=false;
            },1000);
            this.$api.Login(this.params).then(function (res) {
                localStorage.setItem('header',res.header);
                // _this.loading=false;
                _this.loading=false;
                storage.setToken(res.token);
                localStorage.setItem('name',_this.params.account);
                localStorage.setItem('mark',res.mark);
                if(res.token!=''&&res.mark==1){
                    _this.$router.push('/portal')
                }else if(res.token!=''&&res.mark==2){
                    _this.$router.push('/portal2')
                }
            })
        },
        show(ev){
            if(ev.keyCode==13){
                this.login();
            }
        }
    },
    created(){
    },
    mounted(){
        var _this = this;
    }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-image: url('../assets/login-bg.png');*/
  background-color: #334054;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;

  .center-block {
    box-sizing: border-box;
    width: 497px;
    height: 422px;
    padding: 40px;
    background-color: #FFFFFF;
    border-radius: 10px;
    color: #fff;
    text-align: center;
  }
  .el-input{
    height: 49px;
  }
  .el-form{
    margin-top: 27px;
  }
  /*h1 {*/
    /*margin-bottom: 50px;*/
    /*font-size: 26px;*/
    /*text-align: center;*/
    /*color: #289BF8;*/
  /*}*/
  .el-input__prefix {
    left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-input__icon {
    height: 20px;
    width: 18px;
    margin-top: 10px;
  }

  .el-form-item__content {
    line-height: 50px;
  }

  .el-input__inner {
    height: 50px;
    font-size: 20px;
  }

  .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }

  .el-button {
    margin-top: 15px;
    width: 100%;
    font-size: 20px;
    background-color: #289BF8;
    border: none!important;
  }
}
</style>