<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>发现</el-breadcrumb-item>
            <el-breadcrumb-item>活动回顾</el-breadcrumb-item>
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
                            prop="image"
                            label="标题图片"
                            width="370">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="370">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="时间"
                            width="370">
                    </el-table-column>
                    <el-table-column
                            prop="activityUrl"
                            label="活动分享图片"
                            width="350">
                        <template slot-scope="scope">
                            <img :src="scope.row.activityUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="updateWord(scope.row.id)">删除</el-button>
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
        name: "userFeedback",
        data(){
            return{
                formInline:{
                    pageNum:1,
                    num:10,
                    id:''
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
                this.$api.getActiveback(params).then((res)=>{
                    console.log(JSON.stringify(res));
                    _this.loading=false;
                    _this.total=res.sum;
                    _this.tableData3=res.list;
                    console.log(JSON.stringify(res.list));
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
            updateWord (id) {
                this.formInline.id = id;
                this.getList(this.formInline);
                this.$nextTick();
            },
            onAdd(){
                this.$router.push('/addActiveback')
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