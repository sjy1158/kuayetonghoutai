<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购广告位设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item>
                <el-button type="primary" @click="onAdd()">添加</el-button>
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
                            label="类型Id"
                            width="550">
                    </el-table-column>
                    <el-table-column
                            prop="advertiseImageUrl"
                            label="图片地址"
                            width="320">
                        <template slot-scope="scope">
                            <img :src="scope.row.advertiseImageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="opendelete(scope.row.id)" size="small">删除</el-button>
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
                    module:'3',
                    id:'',
                    pageNum:1,
                    num:10
                },
                tableData3:[],
                loading:true,
                total:0,
            }
        },
        methods:{
            getList(params){
                const _this=this;
                this.$api.getSettingsimage(params).then((res)=>{
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
                this.$router.push('/onlineSetting')
            },
            opendelete(id){
                this.formInline.id=id;
                this.getList(this.formInline);
                this.$nextTick()
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