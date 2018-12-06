<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户提现</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="账号">
                <el-input v-model="formInline.account" placeholder="请输入正确账号"></el-input>
            </el-form-item>
            <el-form-item label="时间">
                <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="开始时间" v-model="formInline.fromTime"></el-date-picker>
                </el-col>
                <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="结束时间" v-model="formInline.toTime" style="margin-left: 20px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="卡状态">
                <el-select :value="formInline.checkStatus" placeholder="" @change="chose2">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option label="审核中" value="0">审核中</el-option>
                    <el-option label="审核成功" value="1">审核成功</el-option>
                    <el-option label="审核失败" value="2">审核失败</el-option>
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
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="withdrawMoney"
                            label="提交金额"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="balance"
                            label="剩余余额"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="realName"
                            label="姓名"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="aliPayAccount"
                            label="转账账号"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="submitDate"
                            label="提交时间"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="statusString"
                            label="审核状态"
                            width="220">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="shenhe(scope.row)">审核</el-button>
                        </template>
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
        <!--弹出框-->
        <el-dialog title="用户提现审核" :visible.sync="dialogFormVisible">
            <el-form :model="row" style="margin-left: 200px;">
                <el-form-item label="支付宝号" label-width="120">
                    <el-input v-model="row.aliPayAccount" auto-complete="off" style="width: 500px;" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="提现金额" label-width="120">
                    <el-input v-model="row.withdrawMoney" auto-complete="off" style="width: 500px;" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" label-width="120">
                    <el-input v-model="row.realName" auto-complete="off" style="width: 500px;" disabled="disabled"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="formInline" style="margin-left: 200px;">
                <el-form-item label="审核状态" label-width="120">
                    <el-select :value="formInline.status" style="width: 500px;" placeholder="" @change="chose">
                        <el-option label="审核通过" value="1">审核通过</el-option>
                        <el-option label="审核失败" value="2">审核失败</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="失败原因" label-width="120" v-show="formInline.status==2">
                    <el-input v-model="formInline.message" auto-complete="off" style="width: 500px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="openSure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "cardAdministrator",
        data(){
            return{
                formInline:{
                    id:'',
                    account:'',
                    status:'',
                    message:'',
                    shopName:'',
                    fromTime:'',
                    toTime:'',
                    checkStatus:'',
                    pageNum:1,
                    num:10
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                tableData3:[],
                loading:true,
                total:0,
                row:{},
            }
        },
        methods:{
            onSubmit(){
                this.formInline.pageNum=1;
                this.loading=true;
                this.getList(this.formInline);
                this.$nextTick()
            },
            getList(params){
                const _this=this;
                this.$api.userCash(params).then((res)=>{
                    if(res.message!=null){
                        this.$message({
                            type:'success',
                            message:res.message
                        })
                    }
                    for(var i=0;i<res.list.length;i++){
                        res.list[i].submitDate=_this.$changTime.changeDate(res.list[i].submitDate);
                    }
                    _this.loading=false;
                    _this.total=res.sum;
                    _this.tableData3=res.list
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
            //添加合伙人
            onAdd(){
                this.$router.push('/addHeadline')
            },
            // 审核
            shenhe(row){
                this.dialogFormVisible = true;
                this.formInline.status = '';
                this.row=row;
                this.formInline.id=row.id;
            },
            // 点击确定
            openSure(){
                if(this.formInline.status!=''){
                    this.dialogFormVisible=false;
                    this.getList(this.formInline);
                }else{

                }
            },
            //选择状态
            chose(val){
                this.formInline.status=val;
            },
            chose2(val){
                this.formInline.checkStatus=val;
            },
            //修改
            openchange(id){
                this.$router.push({
                    path:'/changeHeader',
                    query:{
                        id:id
                    }
                });
            }
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
        }
    }
</script>

<style scoped>

</style>