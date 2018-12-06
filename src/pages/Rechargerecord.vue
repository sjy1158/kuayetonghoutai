<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>充值记录</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="卡号">
                <el-input v-model="formInline.cardId" placeholder="请输入正确卡卡号"></el-input>
            </el-form-item>
            <el-form-item label="充值账号">
                <el-input v-model="formInline.account" placeholder="请输入正确充值账号"></el-input>
            </el-form-item>
            <el-form-item label="充值方式">
                <el-select :value="formInline.rechargeWay" placeholder="" @change="chose">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option label="卡充值" value="0">卡充值</el-option>
                    <el-option label="空中充值" value="1">空中充值</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!--表格-->
        <div style="padding-left: 10px;padding-right: 10px;">
            <template>
                <el-table
                        v-loading="loading"
                        :data="tableData3"
                        style="width: 100%;margin: 0 auto"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            prop="userId"
                            label="用户Id"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="cardId"
                            label="卡号"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="account"
                            label="账号"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="value"
                            label="充值金额"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="rechargeDate"
                            label="充值日期"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="agentAccount"
                            label="所属管理员账号"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="rechargeWay"
                            label="充值方式">
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <div class="block" style="text-align: center!important;margin-top: 20px;margin-bottom: 20px;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formInline.pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="formInline.num"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        name: "cardPassword",
        data(){
            return{
                formInline:{
                    cardId:'',
                    account:'',
                    rechargeWay:'',
                    pageNum:1,
                    num:10
                },
                loading:true,
                tableData3:[],
                total:0,
            }
        },
        methods:{
            onSubmit(){
                this.formInline.pageNum=1;
                this.loading=true;
                this.getList(this.formInline);
                this.$nextTick()
            },
            chose(val){
                this.formInline.rechargeWay=val;
            },
            getList(params){
                const _this=this;
                this.$api.getRechage(params).then((res)=>{
                    for(var i=0;i<res.list.length;i++){
                        res.list[i].rechargeDate=_this.$changTime.changeDate(res.list[i].rechargeDate);
                    }
                    _this.loading=false;
                    _this.total=res.sum;
                    _this.tableData3 = res.list;
                })
            },
            handleSizeChange(val) {
                this.formInline.num=val;
                this.getList(this.formInline);
                this.$nextTick()
            },
            handleCurrentChange(val) {
                this.formInline.pageNum=val;
                this.getList(this.formInline);
                this.$nextTick()
            },
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
        }
    }
</script>

<style scoped>

</style>