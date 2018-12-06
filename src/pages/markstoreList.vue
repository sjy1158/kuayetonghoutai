<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" placeholder="请输入正确真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.phone" placeholder="请输入正确手机号"></el-input>
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
                            prop="title"
                            label="商家名称"
                            width="310">
                    </el-table-column>
                    <el-table-column
                            prop="specificAddress"
                            label="商家地址"
                            width="310">
                    </el-table-column>
                    <el-table-column
                            prop="salesVolume"
                            label="销量"
                            width="310">
                    </el-table-column>
                    <el-table-column
                            prop="shopType"
                            label="商家类型"
                            width="310">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号">
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
        name: "cardAdministrator",
        data(){
            return{
                formInline:{
                    name:'',
                    phone:'',
                    pageNum:1,
                    num:10
                },
                tableData3:[],
                loading:true,
                total:0,
            }
        },
        methods:{
            onSubmit(){
                this.loading=true;
                this.getList(this.formInline);
            },
            getList(params){
                const _this=this;
                this.$api.getStoreList(params).then((res)=>{
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
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
        }
    }
</script>

<style scoped>

</style>