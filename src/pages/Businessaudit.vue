<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家审核</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="商家名称">
                <el-input v-model="formInline.shopName" placeholder="请输入正确商家名称"></el-input>
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
                            width="105">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="105">
                    </el-table-column>
                    <el-table-column
                            prop="shopType"
                            label="商家类型"
                            width="105">
                    </el-table-column>
                    <el-table-column
                            prop="averageMoney"
                            label="人均消费"
                            width="105">
                    </el-table-column>
                    <el-table-column
                            prop="specificAddress"
                            label="详细地址"
                            width="105">
                    </el-table-column>
                    <el-table-column
                            prop="shopHeadImageUrl"
                            label="商家头像"
                            width="105">
                        <template slot-scope="scope">
                            <img :src="scope.row.shopHeadImageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="startTime"
                            label="营业开始时间"
                            width="125">
                    </el-table-column>
                    <el-table-column
                            prop="stopTime"
                            label="营业结束时间"
                            width="125">
                    </el-table-column>
                    <el-table-column
                            prop="introduce"
                            label="商家介绍"
                            width="135">
                    </el-table-column>
                    <el-table-column
                            prop="notice"
                            label="商家公告"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="商家手机号"
                            width="135">
                    </el-table-column>
                    <el-table-column
                            prop="submitTime"
                            label="提交时间"
                            width="135">
                    </el-table-column>
                    <el-table-column
                            prop="statusString"
                            label="审核状态"
                            width="135">
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
        <el-dialog title="商家审核" :visible.sync="dialogFormVisible">
            <el-form :model="formInline" style="margin-left: 200px;">
                <el-form-item label="审核状态" label-width="120">
                    <el-select :value="formInline.status" style="width: 500px;" placeholder="" @change="chose">
                        <el-option label="审核通过" value="1">审核通过</el-option>
                        <el-option label="审核失败" value="2">审核失败</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="失败原因" label-width="120" v-show="formInline.status==2">
                    <el-input v-model="formInline.failReason" auto-complete="off" style="width: 500px;"></el-input>
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
                    shopName:'',
                    shopId:'',
                    status:'',
                    failReason:'',
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
                this.$api.getStore(params).then((res)=>{
                    if(res.message!=null){
                        this.$message({
                            type:'success',
                            message:res.message
                        })
                    }
                    for(var i=0;i<res.list.length;i++){
                        res.list[i].startTime=_this.$changTime.changeDate(res.list[i].startTime);
                        res.list[i].stopTime=_this.$changTime.changeDate(res.list[i].stopTime);
                        res.list[i].submitTime=_this.$changTime.changeDate(res.list[i].submitTime);
                        // res.list[i].startTime=_this.$changTime.changeDate(res.list[i].startTime);
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
                this.formInline.shopId=row.shopId;
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