<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
            <el-breadcrumb-item>批量修改卡密</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 10px;">
                <el-form-item label="有效期">
                    <el-input v-model="formInline.days" placeholder="请输入有效期（天）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="金额">
                    <el-input v-model="formInline.money" placeholder="请输入金额（元）"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="是否冻结">
                    <el-select :value="formInline.isFreeze" placeholder="" @change="chose" style="width: 500px;">
                        <el-option label="冻结" value="2">冻结</el-option>
                        <el-option label="已使用" value="1">已使用</el-option>
                        <el-option label="未使用" value="0">未使用</el-option>
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item label="时间日期范围">
                    <el-col :span="11">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请输入日期开始范围" v-model="formInline.startTime"></el-date-picker>
                    </el-col>
                    <br/>
                    <el-col :span="11">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请输入日期结束范围" v-model="formInline.stopTime" style="margin-top: 20px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitchange"  style="margin-left: 200px;">立即修改</el-button>
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
                idarr:[],
                formInline:{
                    cardId:this.$route.query.obj.cardId,
                    batchId:this.$route.query.obj.batchId,
                    fromCardId:this.$route.query.obj.fromCardId,
                    toCardId:this.$route.query.obj.toCardId,
                    status:this.$route.query.obj.status,
                    agentName:this.$route.query.obj.agentName,
                    days:'',
                    money:'',
                    isFreeze:'2',
                    startTime:'',
                    stopTime:''
                }
            }
        },
        methods:{
            chose(val){
                this.formInline.isFreeze=val;
            },
            onSubmitchange(){
                const _this = this;
                if(this.formInline.days!=''&&this.formInline.money!=''&&this.formInline.startTime!=''&&this.formInline.stopTime!=''){
                    this.$confirm('是否修改？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.allcardChange(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
            },
        },
        mounted(){
            // this.idarr=this.$route.query.idarr;
            // alert(this.$route.query.obj.cardId)
            // alert(JSON.stringify(this.$route.query.obj))
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>