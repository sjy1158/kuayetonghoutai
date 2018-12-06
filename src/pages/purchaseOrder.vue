<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购订单</el-breadcrumb-item>
        </el-breadcrumb>


        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
                <el-form-item label="订单状态">
                    <el-input v-model="formInline.status" placeholder="请输入订单状态"></el-input>
                </el-form-item>
                <el-form-item label="订单平台">
                    <el-input v-model="formInline.source" placeholder="请输入正确订单平台"></el-input>
                </el-form-item>
                <el-form-item label="时间日期范围">
                    <el-col :span="11">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请输入日期开始范围" v-model="formInline.fromTime"></el-date-picker>
                    </el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请输入日期结束范围" v-model="formInline.toTime" style="margin-left: 20px;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="float: left">查询</el-button>
                    <!--<el-button type="danger" @click="Daochu" style="float: left">导出用户列表</el-button>-->
                    <el-upload
                            v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'"
                            class="upload-demo"
                            ref="upload"
                            action="http://api.kuayet.com:8080/crossindustry/import/improtTaobaoExcel"
                            method="post"
                            limit="1"
                            accept=".xls"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false"
                            :before-upload="beforeAvatarUpload">
                        <el-button slot="trigger" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;float: right" type="success" @click="submitUpload">上传到服务器</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过500kb</div>-->
                    </el-upload>
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
                                prop="creatTime"
                                label="下单时间"
                                width="110">
                        </el-table-column>
                        <el-table-column
                                prop="description"
                                label="商品描述"
                                width="230">
                        </el-table-column>
                        <el-table-column
                                prop="wangwang"
                                label="掌柜旺旺"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="belongShop"
                                label="所属商家"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="订单状态"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="scale"
                                label="收入比例"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="payMoney"
                                label="支付金额"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="estimate"
                                label="效果预估"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="closeTime"
                                label="结算时间"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="closeMoney"
                                label="结算金额"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="estimateIncome"
                                label="预估收入"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="source"
                                label="成交平台"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="channel"
                                label="所属来源">
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
                    status:'',
                    source:'',
                    fromTime:'',
                    toTime:'',
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
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            // 列表操作
            onSubmit(){
                this.loading=true;
                this.getList(this.formInline);
            },
            getList(params){
                const _this=this;
                this.$api.getDianshanglist(params).then((res)=>{
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
            beforeAvatarUpload(file){
                const isXls = file.name.split('.')[1];
                if(isXls != 'xls'){
                    this.$message.error('上传文件只能是 xls 格式!');
                }else{
                    this.$message.success('文件上传成功');
                }
                return isXls;
                // const isXls = file.type;
                // alert(isXls);
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