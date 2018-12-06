<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>发现</el-breadcrumb-item>
            <el-breadcrumb-item>电商购缩略图编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
                <el-form-item label="商品名字">
                    <el-input v-model="formInline.name" placeholder="请输入正确商品名字"></el-input>
                </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formInline.source" placeholder="" @change="chose">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option label="淘宝" value="淘宝">淘宝</el-option>
                    <el-option label="京东" value="京东">京东</el-option>
                    <el-option label="拼多多" value="拼多多">拼多多</el-option>
                    <!--<el-option label="未使用" value="2">未使用</el-option>-->
                </el-select>
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
                        ref="multipleTable"
                        :data="tableData3"
                        style="width: 100%;margin: 0 auto"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            prop="id"
                            label="商品id"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="商品名称"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="source"
                            label="商品来源"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="url"
                            label="二维码地址"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label=商品价格"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="salesVolume"
                            label="商品销量"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            label="商品图片"
                            width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.imageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="deduction"
                            label="商品折扣">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="primary" @click="shenhe(scope.row)">编辑</el-button>
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
        name: "cardPassword",
        data(){
            return{
                formInline:{
                    name:'',
                    source:'',
                    pageNum:1,
                    num:10
                },
                formInline2:{
                    id:'',
                    name:'',
                },
                tabledate:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                total:'',
                //表格数据
                loading:true,
                tableData3: [],
                multipleSelection: []
            }
        },
        methods:{
            onSubmit(){
                this.formInline.pageNum=1;
                this.loading=true;
                this.getList(this.formInline);
                this.$nextTick()
            },
            // 表格时间
            chose(val){
                // this.formInline2.id=val;
                this.formInline.source=val;
                this.getList(this.formInline);
            },
            //分页
            getList(params){
                const _this = this;
                this.$api.getTaobaoList(params).then(function (res) {
                    _this.loading=false;
                    _this.total=res.sum;
                    _this.tableData3 = res.list;
                })
            },
            //获取下了
            getList2(params){
                const _this=this;
                this.$api.getBeheader(params).then((res)=>{
                    _this.tabledate=res.list;
                })
            },
            handleSizeChange(val) {
                this.formInline.num=val;
                this.getList(this.formInline)
                this.$nextTick()
            },
            handleCurrentChange(val) {
                this.formInline.pageNum=val;
                this.getList(this.formInline)
                this.$nextTick()
            },
            shenhe (row) {
                this.$router.push({
                    path:'/getQcode',
                    query:{
                        row:row
                    }
                })
            }
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
            // this.getList2(this.formInline2);
        }
    }
</script>

<style scoped>

</style>