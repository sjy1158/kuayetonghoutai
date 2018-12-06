<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡管理员</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" placeholder="请输入正确管理员姓名（选填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="密码">
                    <el-input type="password" v-model="formInline.password" placeholder="请输入正确密码（选填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="电话号">
                    <el-input v-model="formInline.phone" placeholder="请输入正确电话号码（选填）"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="formInline.address" placeholder="请输入正确完整地址（选填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "changeOnepage",
        data(){
            return{
                formInline:{
                    accountNumber:this.$route.query.accountNumber,
                    name:this.$route.query.rows.name,
                    password:this.$route.query.rows.password,
                    phone:this.$route.query.rows.phoneId,
                    address:this.$route.query.rows.address
                }
            }
        },
        methods:{
            // 单张卡修改
            producePass(){
                const _this=this;
                if(this.formInline.name!=''&&this.formInline.password!=''&&this.formInline.phone!=''&&this.formInline.address!=''){
                    this.$confirm('是否设置？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.changeOnepage(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
                // this.$api.changeOnepage(this.formInline)
            }
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>