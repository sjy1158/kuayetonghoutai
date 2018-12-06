<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购头部分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="电商购头部分类">
                <el-select :value="formInline.bigestType" placeholder="" @change="chose">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option v-for="item in tabledate" :label="item.typeName" :value="item.typeId">{{item.typeName}}</el-option>
                    <!--<el-option label="未使用" value="2">未使用</el-option>-->
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="addonSubmit">电商购头部分类设置</el-button>
                <el-button type="primary" @click="addFenlei">添加列表分类</el-button>
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
                            prop="bigTypeId"
                            label="主键"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="typeName"
                            label="类型名称"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="typeImageUrl"
                            label="图片"
                            width="260">
                        <template slot-scope="scope">
                            <img :src="scope.row.typeImageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="sqlString"
                            label="sql"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="bigestTypeName"
                            label="头部分类"
                            width="260">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="shenhe(scope.row.bigTypeId)">删除</el-button>
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


        <el-dialog title="电商购头部设置" :visible.sync="dialogFormVisible">
            <el-form :model="formInline2" style="margin-left: 200px;">
                <el-form-item label="头部分类信息" label-width="120">
                    <el-input v-model="formInline2.name" auto-complete="off" style="width: 500px;" placeholder="请输入头部信息"></el-input>
                </el-form-item>
                <el-button type="primary" @click="addDiscon" size="small" style="margin-left: 200px">添加</el-button>
            </el-form>
            <div v-for="item in tabledate" style="margin-left: 300px;width: 200px;">
                <li style="list-style: none;margin-top: 20px;">
                    <span style="color: red;">{{item.typeName}}</span>
                    <el-button type="danger" @click="openchange(item.typeId)" size="small" style="float: right; margin-top: -5px;">删除</el-button>
                </li>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "cardPassword",
        data(){
            return{
                formInline:{
                    bigestType:'',
                    id:'',
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
                this.formInline.id='';
                this.loading=true;
                this.getList(this.formInline);
                this.$nextTick()
            },
            // 表格时间
            chose(val){
                // this.formInline2.id=val;
                this.formInline.bigestType=val;
            },
            //分页
            getList(params){
                const _this = this;
                this.$api.getPuremane(params).then(function (res) {
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
            addDiscon(){
                this.formInline2.id='';
                const _this=this;
                if(this.formInline2.name!=''){
                    this.$confirm('是否添加？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.getList2(_this.formInline2);
                        setTimeout(()=>{
                            _this.formInline2.name='';
                        },100)
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
            },
            // 头部分类添加
            addonSubmit(){
                this.dialogFormVisible=true;
                if(this.dialogFormVisible){
                    this.formInline2.name='';
                    this.getList2(this.formInline2);
                }else{
                    this.formInline2.id='';
                }
            },
            openchange(id){
                this.formInline2.id=id;
                this.getList2(this.formInline2);
            },
            shenhe(id){
                this.formInline.id=id;
                this.getList(this.formInline)
            },

            //添加列表分类
            addFenlei(params){
                this.$router.push({
                    path:'/addShoptab',
                })
            }
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
            this.getList2(this.formInline2);
        }
    }
</script>

<style scoped>

</style>