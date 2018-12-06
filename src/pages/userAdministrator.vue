<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="手机号">
                <el-input v-model="formInline.phone" placeholder="请输入正确手机号"></el-input>
            </el-form-item>
            <el-form-item label="卡管理员姓名">
                <el-input v-model="formInline.agent" placeholder="请输入正确卡管理员姓名"></el-input>
            </el-form-item>
            <el-form-item label="金额起始范围">
                <el-input v-model="formInline.moneyFrom" placeholder="请输入正确金额开始范围"></el-input>
            </el-form-item>
            <el-form-item label="金额结束范围">
                <el-input v-model="formInline.moneyTo" placeholder="请输入正确金额结束范围"></el-input>
            </el-form-item>
            <el-form-item label="时间日期范围">
                <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请输入日期开始范围" v-model="formInline.deadFrom"></el-date-picker>
                </el-col>
                <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请输入日期结束范围" v-model="formInline.deadTo" style="margin-left: 20px;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="danger" @click="Daochu">导出用户列表</el-button>
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
                            label="账号"
                            width="225">
                    </el-table-column>
                    <el-table-column
                            prop="balance"
                            label="金额"
                            width="225">
                    </el-table-column>
                    <el-table-column
                            prop="registerTime"
                            label="注册时间"
                            width="225">
                    </el-table-column>
                    <el-table-column
                            prop="deadLineString"
                            label="有效期"
                            width="225">
                    </el-table-column>
                    <el-table-column
                            label="用户类型"
                            width="225">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type==0">普通用户</span>
                            <span v-if="scope.row.type==1">区域合伙人</span>
                            <span v-if="scope.row.type==2">城市合伙人</span>
                            <span v-if="scope.row.type==3">创客</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="agentName"
                            label="所属代理人"
                            width="225">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openchange(scope.row.userId,scope.row)" size="small">修改</el-button>
                            <el-button type="danger" @click="opendelete(scope.row.userId)" size="small">删除</el-button>
                            <el-button type="primary" v-if="scope.row.type==0" @click=becomeChuangke(scope.row.userId) size="small">成为创客</el-button>
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
        data(){
            return{
                formInline:{
                    phone:'',
                    agent:'',
                    moneyFrom:'',
                    moneyTo:'',
                    deadFrom:'',
                    deadTo:'',
                    id:'',
                    userId:'',
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
                this.loading=true;
                this.getList(this.formInline);
            },
            getList(params){
                const _this=this;
                this.$api.getAlluser(params).then((res)=>{
                    _this.loading=false;
                    _this.total=res.sum;
                    for(var i=0;i<res.list.length;i++){
                        res.list[i].registerTime=_this.$changTime.changeDate(res.list[i].registerTime)
                    }
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

            openchange(id,obj){
                this.$router.push({
                    path:'/changeUser',
                    query:{
                        userId:id,
                        rows:obj
                    }
                })
            },
            opendelete(id){
                this.formInline.id=id;
                this.getList(this.formInline);
                this.$nextTick()
            },
            // 成为创客
            becomeChuangke(userId){
                this.formInline.userId = userId;
                this.getList(this.formInline);
                this.$nextTick();
            },
            //导出用户列表
            Daochu(){
                this.$api.daochuUserList().then((res)=>{
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