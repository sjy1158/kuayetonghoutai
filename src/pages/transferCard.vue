<template>
    <div>
    <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
        <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
        <el-breadcrumb-item>划拨卡密</el-breadcrumb-item>
    </el-breadcrumb>
        <!--表单提交-->
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="开始卡卡号">
                    <el-input v-model="formInline.fromCardId" placeholder="请输入开始卡号（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="结束卡卡号">
                    <el-input v-model="formInline.toCardId" placeholder="请输入结束卡号（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="代理人姓名">
                    <el-input v-model="formInline.agentName" placeholder="请输入代理人姓名（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" :disabled="disabled" @click="subcardpass" style="margin-left: 200px;">立即划拨</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "transferCard",
        data(){
            return{
                formInline:{
                    fromCardId:'',
                    toCardId:'',
                    agentName:''
                }
            }
        },
        methods:{
            subcardpass(){
                var _this = this;
                if(this.formInline.fromCardId!=''&&this.formInline.toCardId!=''&&this.formInline.agentName!=''){
                    this.$confirm('是否划拨？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(()=>{
                        _this.$api.subCardpass(_this.formInline).then(function (res) {
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入完整信息');
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