<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>合伙人管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="合伙人姓名">
                <el-input v-model="formInline.name" placeholder="请输入正确合伙人姓名"></el-input>
            </el-form-item>
            <el-form-item label="合伙人手机号">
                <el-input v-model="formInline.account" placeholder="请输入正确合伙人手机号"></el-input>
            </el-form-item>
                <el-form-item label="可提现开始余额">
                    <el-input v-model="formInline.fromMoney" placeholder="请输入开始余额" style=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formInline.toMoney" placeholder="请输入结束余额" style=""></el-input>
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
                            prop="phoneId"
                            label="合伙人手机号"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="nickName"
                            label="合伙人昵称"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="canWithdrawMoney"
                            label="合伙人可提现余额"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="合伙人类型"
                            width="350">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type==1">区域合伙人</span>
                            <span v-if="scope.row.type==2">城市合伙人</span>
                            <span v-if="scope.row.type==3">创客</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openchange(scope.row.userId)" size="small">修改</el-button>
                            <el-button type="danger" @click="openchange(scope.row.userId)" size="small">删除</el-button>
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
            return {
                formInline: {
                    account: '',
                    name: '',
                    fromMoney: '',
                    toMoney: '',
                    pageNum: 1,
                    num: 10,
                    id:''
                },
                loading: true,
                tableData3: [],
                total: 0,
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
                this.$api.getParnerslist(params).then((res)=>{
                    _this.loading=false;
                    _this.total=res.sum;
                    _this.tableData3=res.list;
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
                this.$router.push('/addPartner')
            },
            //修改
            openchange(id){
                this.$router.push({
                    path:'/changeMg',
                    query:{
                        mgid:id
                    }
                })
            },
            //删除
            opendelete(id){
                this.formInline.id=id;
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