<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>修改密码</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
                <el-form-item label="账号">
                    <el-input v-model="formInline.account" placeholder=""></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="原密码">
                    <el-input v-model="formInline.yuanmima" placeholder="请输入正确原密码（必填）"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="formInline.xinmima" placeholder="请输入您的新密码（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="oncardRecharge"  style="margin-left: 200px;">立即修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cardRecharge",
        data(){
            return{
                formInline:{
                    account:this.$route.query.name,
                    yuanmima:'',
                    xinmima:''
                }
            }
        },
        methods:{
            oncardRecharge(){
                const _this=this;
                if(this.formInline.yuanmima!=''&&this.formInline.xinmima!=''){
                    this.$confirm('是否修改？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.changePassword(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
            }
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>