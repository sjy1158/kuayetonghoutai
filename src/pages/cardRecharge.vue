<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
            <el-breadcrumb-item>卡号充值</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
                <el-form-item label="卡号">
                    <el-input v-model="formInline.cardId" placeholder="请输入正确卡号（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.phone" placeholder="请输入正确手机号（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="oncardRecharge"  style="margin-left: 200px;">立即充值</el-button>
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
                    cardId:'',
                    phone:''
                }
            }
        },
        methods:{
            oncardRecharge(){
                const _this=this;
                if(this.formInline.cardId!=''&&this.formInline.phone!=''){
                    this.$confirm('是否充值？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.cardRecharge(_this.formInline).then((res)=>{
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