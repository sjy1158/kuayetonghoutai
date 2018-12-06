<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="账号">
                    <el-input v-model="formInline.account" placeholder="请输入账号（必填）"></el-input>
                </el-form-item>

                <el-form-item label="审核状态" label-width="120">
                    <el-select :value="formInline.type" style="width: 500px;" placeholder="请选择合伙人类型（必选）" @change="chose">
                        <el-option label="区域合伙人" value="1">区域合伙人</el-option>
                        <el-option label="城市合伙人" value="2">城市合伙人</el-option>
                        <!--<el-option label="审核失败" value="3">审核失败</el-option>-->
                    </el-select>
                </el-form-item>

                <el-form-item label="区域">
                    <el-input v-model="formInline.area" placeholder="请输入正确区域（必填）"></el-input>
                </el-form-item>

                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即添加</el-button>
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
                    account:'',
                    type:'',
                    area:''
                },
                postData:{
                    token:'',
                    key:''
                },
                dialogVisible: false
            }
        },
        methods:{
            // 单张卡修改
            producePass(){
                const _this=this;
                if(this.formInline.account!=''&&this.formInline.type!=''){
                    this.$confirm('是否添加？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.addParners(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
                // this.$api.changeOnepage(this.formInline)
            },
            chose(val){
                this.formInline.type=val;
            },
        },
        mounted(){
            this.getKey();
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>