<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>关键字判断</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="关键字">
                    <el-input v-model="formInline.word" placeholder="请输入正确关键字信息（必填：如 内衣,内裤,...逗号分隔）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="电商购头部分类">
                    <el-select :value="formInline.source" placeholder="" @change="chose" style="width: 500px;">
                        <el-option label="全部" value="">全部</el-option>
                        <el-option label="淘宝" value="1">淘宝</el-option>
                        <el-option label="淘宝" value="2">京东</el-option>
                        <el-option label="淘宝" value="3">拼多多</el-option>
                        <!--<el-option label="未使用" value="2">未使用</el-option>-->
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即判断</el-button>
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
                    word:'',
                    source:''
                }
            }
        },
        methods:{
            chose(val){
                this.formInline.source = val;
            },
            // 单张卡修改
            producePass(){
                const _this=this;
                if(this.formInline.word!=''){
                    this.$confirm('是否更新？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.judgeWord(_this.formInline).then((res)=>{
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