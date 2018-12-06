	<template>
  <div class="container">
      <audio id="audio" src="/static/audio/130808.wav"/>
    <div class="header">
        <div class="leftLogo">
            <img class="logo-img" src="../assets/logoimage.png" alt="">
        </div>
        <div class="rightButton" style="position: relative">
			<el-dropdown trigger="click">
				<div class="login-user-info">
					<div class="welcome">
                        <div class="rightBtn">
                            <el-button type="primary" style="float: right">账号操作</el-button>
                            <span style="float: right;line-height: 60px;padding-right: 10px;">{{name}}</span>
                        </div>
					</div>
				</div>
				<el-dropdown-menu slot="dropdown">
    			    <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
                    <el-dropdown-item @click.native="changePass">修改密码</el-dropdown-item>
  			    </el-dropdown-menu>
			</el-dropdown>
        </div>
    </div>
    <div class="main">
        <div class="sidebar">
            <el-menu :router="true" :default-active='$route.path' v-if="mark==1">
                <el-submenu index="1">
                    <template slot="title">
                        <img src="../assets/管理.png" alt="">
                        <span>卡密管理</span>
                    </template>
                    <el-menu-item index="/cardPassword">卡密列表</el-menu-item>
                    <el-menu-item index="/Rechargerecord">充值记录</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <img src="../assets/新闻.png" alt="">
                        <span>人员管理</span>
                    </template>
                    <el-menu-item index="/returnedOrders" v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'">后台人员管理列表</el-menu-item>
                    <el-menu-item index="/userAdministrator">用户管理</el-menu-item>
                    <el-menu-item index="/cardAdministrator">卡管理员</el-menu-item>
                    <el-menu-item index="/partnerMg" v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'">合伙人管理</el-menu-item>
                    <el-menu-item index="/getCash" v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'">用户提现</el-menu-item>
                    <!--<el-menu-item index="/setingChuangke">设置创客</el-menu-item>-->
                </el-submenu>
                <el-submenu index="3" v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'">
                    <template slot="title">
                        <img src="../assets/新闻.png" alt="">
                        <span>商家管理</span>
                    </template>
                    <el-menu-item index="/storeList">商家列表</el-menu-item>
                    <el-menu-item index="/storeType">商家类型</el-menu-item>
                    <el-menu-item index="/Businessheadline">商家头条</el-menu-item>
                    <el-menu-item index="/Merchantcash">商家提现</el-menu-item>
                    <el-menu-item index="/Businessaudit">商家审核</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <img src="../assets/会员.png" alt="">
                        <span>客户端管理</span>
                    </template>
                    <el-menu-item index="/phoneSettings">电话广告位设置</el-menu-item>
                    <el-menu-item index="/shopSettings" v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'">商家广告位设置</el-menu-item>
                    <el-menu-item index="/onlineSettings">电商购广告位设置</el-menu-item>
                    <el-menu-item index="/userFeedback">用户反馈</el-menu-item>
                    <el-menu-item index="/commonProblem">常见问题</el-menu-item>
                    <el-menu-item index="/costSay">资费说明</el-menu-item>
                    <el-menu-item index="/Novice">新手攻略</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <img src="../assets/资金明细2.png" alt="">
                        <span>电商购管理</span>
                    </template>
                    <el-menu-item index="/purchaseHeader">电商购头部分类</el-menu-item>
                    <el-menu-item index="/purchaseOrder">电商购订单</el-menu-item>
                    <el-menu-item index="/chongfuOrder">重复订单</el-menu-item>
                    <el-menu-item index="/electricitySupplier">电商购分类列表</el-menu-item>
                    <el-menu-item index="/qrcodeList">电商购编辑缩略图</el-menu-item>
                    <!--<el-menu-item index="/activityContent">活动内容编辑</el-menu-item>-->
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <img src="../assets/资金明细2.png" alt="">
                        <span>发现</span>
                    </template>
                    <el-menu-item index="/activityContent">活动预告</el-menu-item>
                    <el-menu-item index="/activityBack">活动回顾</el-menu-item>
                    <el-menu-item index="/deleteQrcode">动态添加/删除</el-menu-item>
                    <!--<el-menu-item index="/getMessage">消息接受</el-menu-item>-->
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
            mark:'',
            chanel:localStorage.getItem('header'),
            timer:'',
            errCount: 0
        }
    },
    methods:{
        logout(){
            storage.clearToken();
            localStorage.removeItem('name');
            localStorage.removeItem('mark');
            localStorage.removeItem('header')
            this.$router.push('/login');
            clearInterval(this.timer);
        },
        changePass(){
            this.$router.push({
                path:"/changePassword",
                query:{
                    name:this.name
                }
            })
        },
        getMsg () {
            const _this = this;
            this.$api.getSavemsg().then((res)=>{
                if (res.msg!=undefined) {
                    this.$notify({
                        title:'提示',
                        message:res.msg
                    });
                    this.aplayAudio();
                }
            })
        },
        // 语音播放
        aplayAudio () {
            const audio = document.getElementById('audio')
            audio.play()
        }
    },
    watch: {
        'errCount': function () {
            this.aplayAudio()
        }
    },
    // 语音播报的方法
    created(){
        this.getMsg();
    },
    mounted(){
        const token = storage.getToken();
        this.name=localStorage.getItem('name');
        this.mark=localStorage.getItem('mark');
        // alert(localStorage.getItem('header'));
        if(token==null){
            this.$router.push('/login')
            clearInterval(this.timer)
        }else{
            this.timer = setInterval(()=>{
                this.getMsg();
            },50000)
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
        height: 100px;
    }
    div.leftLogo img{
        width: 100%;
        height: 100%;
        /*width: 100px;*/
        /*height: 40px;*/
        margin: 0 auto;
        /*margin-top: 30px;*/
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