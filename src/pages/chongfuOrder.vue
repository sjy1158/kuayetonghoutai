<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购订单</el-breadcrumb-item>
        </el-breadcrumb>


        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
                <el-form-item>
                    <el-button type="danger" @click="onSubmit(1)" style="float: left">清空重复订单</el-button>
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
                                prop="id"
                                label="重复订单数"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                prop="orderId"
                                label="订单号"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                prop="typeString"
                                label="订单类型"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                prop="orderName"
                                label="商品名称"
                                width="300">
                        </el-table-column>
                        <el-table-column
                                prop="leixing"
                                label="类型">
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
    </div>
</template>

<script>
    export default {
        name: "purchaseOrder",
        data(){
            return{
                fileList:[],
                formInline:{
                    isDelete: 0,
                    pageNum:1,
                    num:10
                },
                loading:true,
                tableData3:[],
                total:0,
                chanel:localStorage.getItem('header')
            }
        },
        methods:{
            // 列表操作
            onSubmit(num){
                this.formInline.isDelete = num;
                this.getList(this.formInline);
            },
            getList(params){
                const _this=this;
                this.$api.getChongfu(params).then((res)=>{
                    _this.loading=false;
                    _this.total=res.sum;
                    _this.tableData3=res.list
                })
            },
            handleSizeChange(val) {
                this.formInline.num=val;
                this.formInline.isDelete = 0;
                this.getList(this.formInline);
                this.$nextTick()
            },
            handleCurrentChange(val) {
                this.formInline.pageNum=val;
                this.formInline.isDelete = 0;
                this.getList(this.formInline);
                this.$nextTick()
            }
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
        }
    }
</script>

<style scoped>
    .upload-demo{
        display: inline-block;
        margin-left: 10px;
    }
</style>