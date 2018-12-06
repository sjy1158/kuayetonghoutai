<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
            <el-breadcrumb-item>空中充值</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
                <el-form-item label="金额">
                    <el-input v-model="formInline.money" placeholder="请输入正确金额（元）（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.phoneId" placeholder="请输入正确手机号（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="有效期">
                    <el-input v-model="formInline.days" placeholder="请输入正确有效期（天）（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="onRecharge"  style="margin-left: 200px;">立即充值</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "allsChange",
        data(){
            return{
                formInline:{
                    money:'',
                    phoneId:'',
                    days:''
                }
            }
        },
        methods:{
            onRecharge(){
                const _this = this;
                if(this.formInline.money!=''&&this.formInline.phoneId!=''&&this.formInline.days!=''){
                    this.$confirm('是否充值？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.skyRecharge(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else {
                    this.$message('请填入正确完整信息')
                }
            }
        },
        mounted(){

        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>