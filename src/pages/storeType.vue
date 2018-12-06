<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家类型</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="商家名称">
                <el-input v-model="formInline.name" placeholder="请输入正确商家名称"></el-input>
            </el-form-item>
            <el-form-item label="商家类型级别">
                <el-input v-model="formInline.level" placeholder="请输入正确商家类型级别"></el-input>
            </el-form-item>
            <el-form-item label="上级类型名称">
                <el-input v-model="formInline.superiorTypeName" placeholder="请输入正确上级商家类型名称 "></el-input>
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
                            prop="id"
                            label="类型Id"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="商家类型名称"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            label="商家类型级别"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="superiorName"
                            label="上级商家类型名称">
                    </el-table-column>
                    <el-table-column
                            prop="imageUrl"
                            label="商家类型图片">
                        <template slot-scope="scope">
                            <img :src="scope.row.imageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="修改">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="openchange(scope.row.id,scope.row)" size="small">修改</el-button>
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
                    name:'',
                    level:'',
                    superiorTypeName:'',
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
                this.formInline.pageNum=1
                this.loading=true;
                this.getList(this.formInline);
                this.$nextTick()
            },
            getList(params){
                const _this=this;
                this.$api.getStoretype(params).then((res)=>{
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
                this.$router.push('/addShoptype')
            },
            openchange(id,row){
                this.$router.push({
                    path:'/changeStoretype',
                    query:{
                        storeid:id,
                        obj:row
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