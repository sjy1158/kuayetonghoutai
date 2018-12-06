<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
            <el-breadcrumb-item>常见问题</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item>
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
                            prop="type"
                            label="类型"
                            width="320">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="问题"
                            width="320">
                    </el-table-column>
                    <el-table-column
                            prop="answer"
                            label="答案"
                            width="320">
                    </el-table-column>
                    <el-table-column
                            prop="titleImageUrl"
                            label="图片地址"
                            width="320">
                        <template slot-scope="scope">
                            <img :src="scope.row.titleImageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="shenhe(scope.row.id)">删除</el-button>
                            <el-button type="primary" size="small" @click="changeCost(scope.row.id,scope.row)">修改</el-button>
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
                    id:'',
                    pageNum:1,
                    num:10
                },
                tableData3:[],
                loading:true,
                total:0,
                row:{},
            }
        },
        methods:{
            getList(params){
                const _this=this;
                this.$api.getCommonpro(params).then((res)=>{
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
            //常见问题添加
            onAdd(){
                this.$router.push('/addCommonpro');
            },
            // 删除
            shenhe(row){
                this.formInline.id=row;
                this.getList(this.formInline);
            },
            // 修改
            changeCost(id,obj){
                this.$router.push({
                    path:'/changeCommonpro',
                    query:{
                        costid:id,
                        rows:obj
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