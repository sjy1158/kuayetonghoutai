<template>
    <div class="container">
        <div class="header">
            <div class="leftLogo">
                <img class="logo-img" src="../assets/15848.png" alt="">
            </div>
            <div class="rightButton">
                <el-dropdown trigger="click">
                    <div class="login-user-info">
                        <div class="welcome">
                            <div class="rightBtn">
                                <el-button type="primary" style="float: right">退出</el-button>
                                <span style="float: right;line-height: 60px;padding-right: 10px;">{{name}}</span>
                            </div>
                        </div>
                        <!--<div class="login-user-avatar">-->
                        <!--</div>-->
                        <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="main">
            <div class="sidebar">
                <el-menu :router="true" :default-active='$route.path' v-if="mark==2">
                    <el-submenu index="1">
                        <template slot="title">
                            <img src="../assets/管理.png" alt="">
                            <span>商家管理</span>
                        </template>
                        <el-menu-item index="/markstoreList">商家列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { storage } from '@/util'

    export default {
        data(){
            return{
                name:'',
                mark:''
            }
        },
        methods:{
            logout(){
                storage.clearToken();
                localStorage.removeItem('name');
                localStorage.removeItem('mark');
                this.$router.push('/login');
            }
        },
        created(){

        },
        mounted(){
            const token = storage.getToken();
            this.name=localStorage.getItem('name');
            this.mark=localStorage.getItem('mark');
            if(token==null){
                this.$router.push('/login')
            }else{
                return;
            }
        }
    }
</script>

<style scoped>

    .header{
        padding: 0px!important;
        height: 60px;
        background-color: #4AAAFB;
    }
    div.leftLogo{
        display: flex;
        background: white;
        width: 200px;
        height: 60px;
    }
    div.leftLogo img{
        width: 150px;
        height: 40px;
        margin: 0 auto;
        margin-top: 10px;
    }
    .login-user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
    .welcome {
        text-align: right;
    }
    }
    .el-menu-item:hover{
        background-color:#4AAAFB;
        color: #ffffff;
    }
    .el-submenu__title img{
        height: 14px;
        width: 14px;
    }
    .el-menu .el-menu--inline li{
        text-align: center;
    }
    .el-submenu__title span{
        padding-left: 10px;
    }
    div.rightBtn{
        width: 300px;height: 100%;
        line-height: 60px;
        /*position: relative;*/
        margin-right: 30px;
    }
    div.rightBtn .el-button{
        margin-top: 10px;
        background-color: #ffffff;
        color: #4AAAFB;
    }
    div.rightBtn div{
        height: 100%;
        line-height: 60px;
    }

</style>