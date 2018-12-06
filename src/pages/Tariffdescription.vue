<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
            <el-breadcrumb-item>资费说明</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="商家名称">
                <el-input v-model="formInline.account" placeholder="请输入正确商家名称"></el-input>
            </el-form-item>
            <el-form-item label="卡使用时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="开始时间" v-model="formInline.startTime"></el-date-picker>
                </el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="结束时间" v-model="formInline.stopTime" style="margin-left: 20px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onSubmit">添加</el-button>
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
                            prop="shopName"
                            label="商家名称 "
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="金额"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="applyTime"
                            label="申请时间"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="审核状态 "
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="aliPayAccount"
                            label="支付宝号"
                            width="240">
                    </el-table-column>
                    <el-table-column
                            prop="realName"
                            label="商家真实姓名"
                            width="240">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="shenhe(scope.row)">删除</el-button>
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
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="row" style="margin-left: 200px;">
                <el-form-item label="支付宝号" label-width="120">
                    <el-input v-model="row.aliPayAccount" auto-complete="off" style="width: 500px;" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="提现金额" label-width="120">
                    <el-input v-model="row.money" auto-complete="off" style="width: 500px;" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="商家姓名" label-width="120">
                    <el-input v-model="row.shopName" auto-complete="off" style="width: 500px;" disabled="disabled"></el-input>
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
            getList(params){
                const _this=this;
                this.$api.storeGet(params).then((res)=>{
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
            // 删除
            shenhe(row){
                this.formInline.status = '';
                this.row=row;
                this.formInline.id=row.id;
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