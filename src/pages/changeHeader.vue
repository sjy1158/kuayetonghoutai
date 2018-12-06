<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家头条</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
                <el-form-item label="头条内容">
                    <el-input v-model="formInline.content" placeholder="请输入头条内容"></el-input>
                </el-form-item>
                <br/>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="onRecharge"  style="margin-left: 200px;">立即修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addHeadline",
        data(){
            return{
                formInline:{
                    id:this.$route.query.id,
                    content:this.$route.query.rows.headline
                }
            }
        },
        methods:{
            onRecharge(){
                const _this = this;
                if(this.formInline.content!=''){
                    this.$confirm('是否修改？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.changeHeader(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else {
                    this.$message('请填入正确完整信息')
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