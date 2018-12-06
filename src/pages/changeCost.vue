<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
            <el-breadcrumb-item>资费说明</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="资费问题">
                    <el-input v-model="formInline.question" placeholder="请输入资费问题（选填）"></el-input>
                </el-form-item>
                <el-form-item label="资费答案">
                    <el-input v-model="formInline.answer" placeholder="请输入资费答案（选填）"></el-input>
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
                    id:this.$route.query.costid,
                    question:this.$route.query.rows.explainQuestion,
                    answer:this.$route.query.rows.answer,
                }
            }
        },
        methods:{
            // 单张卡修改
            producePass(){
                const _this=this;
                if(this.formInline.question!=''&&this.formInline.answer!=''){
                    this.$confirm('是否修改？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.changCostsay(_this.formInline).then((res)=>{
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