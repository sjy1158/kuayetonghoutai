<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>发现</el-breadcrumb-item>
            <el-breadcrumb-item>动态添加/删除</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="分类">
                <el-select v-model="formInline.type" placeholder="" @change="chose">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option label="电商购" value="1">电商购</el-option>
                    <el-option label="商家" value="2">商家</el-option>
                    <el-option label="日历" value="3">日历</el-option>
                    <!--<el-option label="未使用" value="2">未使用</el-option>-->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" v-show="formInline.type==2" @click="addDt(formInline.type)">添加商家动态</el-button>
                <el-button type="primary" v-show="formInline.type==3" @click="addDt(formInline.type)">添加日历动态</el-button>
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
                            prop="name"
                            label="昵称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="商品"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            label="动态图片"
                            width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="分享图片"
                            width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.shareUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="头像"
                            width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.headImage" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="动态类型"
                            width="200">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type==1">电商购</span>
                            <span v-if="scope.row.type==2">商家</span>
                            <span v-if="scope.row.type==3">日历</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="primary" @click="shenhe(scope.row.id)">删除</el-button>
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
                    id:'',
                    type:'',
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
                this.formInline.type=val;
                this.getList(this.formInline);
            },
            //分页
            getList(params){
                const _this = this;
                this.$api.getDongtai(params).then(function (res) {
                    console.log(JSON.stringify(res));
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
            shenhe (id) {
                this.formInline.id = id;
                this.getList(this.formInline);
                this.$nextTick()
            },
            addDt(type) {
               this.$router.push({
                   path:'/addDongtai',
                   query:{
                       type:type
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