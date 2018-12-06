<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
            <el-breadcrumb-item>电话费率设置</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
                <el-form-item label="费率">
                    <el-input v-model="formInline.cost" placeholder="请输入费率（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="onphoneShezhi"  style="margin-left: 200px;">立即设置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "phoneShezhi",
        data(){
            return{
                formInline:{
                    cost:''
                }
            }
        },
        methods:{
            onphoneShezhi(){
                const _this=this;
                if(this.formInline.cost!=''){
                    this.$confirm('是否设置？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.onphoneshezhi(_this.formInline).then((res)=>{
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