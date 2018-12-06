<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡管理员</el-breadcrumb-item>
            <el-breadcrumb-item>充值</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="充值金额">
                    <el-input v-model="formInline.money" placeholder="请输入正确充值金额（元）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即充值</el-button>
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
                    id:this.$route.query.id,
                    money:''
                }
            }
        },
        methods:{
            //充值
            producePass(){
                const _this=this;
                if(this.formInline.money!=''){
                    this.$confirm('是否充值？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.kaChongzhi(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确金额')
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