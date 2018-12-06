<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡管理员</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="管理员账号">
                <el-input v-model="formInline.account" placeholder="请输入正确管理员账号"></el-input>
            </el-form-item>
            <el-form-item label="管理员姓名">
                <el-input v-model="formInline.name" placeholder="请输入正确管理员姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onAdd">添加</el-button>
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
                            prop="agentId"
                            label="管理员Id"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="accountNumber"
                            label="管理员账号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="password"
                            label="管理员密码"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="phoneId"
                            label="手机号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="充值金额（元）"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                            width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openchange(scope.row.accountNumber,scope.row)" size="small">修改</el-button>
                            <el-button type="danger" @click="opendelete(scope.row.accountNumber)" size="small">删除</el-button>
                            <el-button type="success" @click="cardchongzhi(scope.row.agentId)" size="small">充值</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "cardAdministrator",
        data(){
            return{
                formInline:{
                    account:'',
                    name:'',
                    pageNum:1,
                    num:10,
                    id:''
                },
                loading:true,
                tableData3:[],
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
                this.$api.getCardad(params).then((res)=>{
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
            //跳转修改
            openchange(accountNumber,obj){
                this.$router.push({
                    path:'/changeOnepage',
                    query:{
                        accountNumber:accountNumber,
                        rows:obj
                    }
                })
            },
            //删除
            opendelete(accountNumber){
                this.formInline.id=accountNumber;
                this.getList(this.formInline);
                this.$nextTick()
            },
            //添加
            onAdd(){
                this.$router.push('/addAdmian')
            },
            //充值
            cardchongzhi(id){
                debugger
                this.$router.push({
                    path:'/cardChongzhi',
                    query:{
                        id:id
                    }
                })
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