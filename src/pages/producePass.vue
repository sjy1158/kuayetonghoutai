<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
            <el-breadcrumb-item>生成卡密</el-breadcrumb-item>
        </el-breadcrumb>
        <!--表单提交-->
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="数量">
                    <el-input v-model="formInline.amount" placeholder="请输入数量（张）（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="金额">
                    <el-input v-model="formInline.money" placeholder="请输入金额（必填）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="有效期">
                    <el-input v-model="formInline.days" placeholder="请输入有效期（天）（必填）"></el-input>
                </el-form-item>
                <el-form-item label="批次号">
                    <el-input v-model="formInline.cardBatchId" placeholder="请输入有效期（天）（必填）"></el-input>
                </el-form-item>
                <el-form-item label="卡使用时间">
                    <el-col :span="11">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间（必填）" v-model="formInline.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <br/>
                    <el-col :span="11">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束时间（必填）" v-model="formInline.stopTime" style="width: 100%;margin-top: 10px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即生成</el-button>
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
                    amount:'',
                    money:'',
                    days:'',
                    cardBatchId:new Date().getTime(),
                    startTime:'',
                    stopTime:''
                }
            }
        },
        methods:{
            producePass(){
                const _this=this;
                if(this.formInline.amount!=''&&this.formInline.money!=''&&this.formInline.days!=''&&this.formInline.startTime!=''&&this.formInline.stopTime!=''){
                    this.$confirm('是否生成？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.proDucePass(_this.formInline).then(function (res) {
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