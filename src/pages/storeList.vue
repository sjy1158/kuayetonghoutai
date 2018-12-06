<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" placeholder="请输入正确真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.phone" placeholder="请输入正确手机号"></el-input>
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
                            prop="title"
                            label="商家名称"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="specificAddress"
                            label="商家地址"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="salesVolume"
                            label="销量"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="shopType"
                            label="商家类型"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="手机号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="shopHeadImageUrl"
                            label="图片地址"
                            width="200">
                        <template slot-scope="scope">
                            <img :src="scope.row.shopHeadImageUrl" alt="" style="width: 50px;height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="disconSet(scope.row.shopId)" size="small">折扣设置</el-button>
                            <el-button type="primary" @click="openchange2(scope.row.shopId,scope.row)" size="small">修改</el-button>
                            <el-button type="danger" @click="deleteList(scope.row.shopId)" size="small">删除</el-button>
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
        <el-dialog title="折扣设置" :visible.sync="dialogFormVisible">
            <el-form :model="formInline2" style="margin-left: 200px;">
                <el-form-item label="满多少钱" label-width="120">
                    <el-input v-model="formInline2.requireValue" auto-complete="off" style="width: 500px;" placeholder="请输入满减价格"></el-input>
                </el-form-item>
                <el-form-item label="抵扣多少" label-width="120">
                    <el-input v-model="formInline2.value" auto-complete="off" style="width: 500px;" placeholder="请输入抵扣价格"></el-input>
                </el-form-item>
                <el-button type="primary" @click="addDiscon" size="small" style="margin-left: 200px">添加</el-button>
            </el-form>
            <div v-for="item in tabledate" style="margin-left: 300px;width: 200px;">
                <li style="list-style: none"><span style="color: red;">{{item.requireValue}}抵{{item.value}}</span><el-button type="danger" @click="openchange(item.id)" size="small">删除</el-button></li>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                    id:'',
                    name:'',
                    phone:'',
                    pageNum:1,
                    num:10
                },
                formInline2:{
                    id:'',
                    shopId:'',
                    requireValue:'',
                    value:''
                },
                dialogTableVisible: false,
                dialogFormVisible: false,
                tableData3:[],
                tabledate:[],
                loading:true,
                total:0,
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
                this.$api.getStoreList(params).then((res)=>{
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

            //删除
            deleteList(id){
                this.formInline.id=id;
                this.getList(this.formInline)
            },
            //添加合伙人
            onAdd(){
                this.$router.push('/addStore')
            },
            openchange(id){
               this.formInline2.id=id;
               this.adddis(this.formInline2);
            },
            //折扣设置
            disconSet(id){
                this.formInline2.id='';
                this.dialogFormVisible = true;
                if(this.dialogFormVisible){
                    this.formInline2.value='';
                    this.formInline2.requireValue='';
                    this.formInline2.shopId=id;
                    this.adddis(this.formInline2);
                }else{
                    this.formInline2.shopId='';
                }
            },
            adddis(params){
                this.$api.getDiscon(params).then((res)=>{
                    this.tabledate=res.list;
                })
            },
            addDiscon(){
                this.formInline2.id='';
                const _this=this;
                if(this.formInline2.requireValue!=''&&this.formInline2.value!=''){
                    this.$confirm('是否添加？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.adddis(_this.formInline2);
                        setTimeout(()=>{
                            _this.formInline2.requireValue='';
                            _this.formInline2.value='';
                        },100)
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
                // alert(JSON.stringify(this.formInline2));
            },
            // 折扣添加
            //修改
            openchange2(id,obj){
                this.$router.push({
                    path:'/changeDiscon',
                    query:{
                        disconid:id,
                        rows:obj
                    }
                })
            }
        },
        mounted(){
            this.loading=true;
            this.getList(this.formInline);
            // alert(JSON.stringify(this.formInline2));
        }
    }
</script>

<style scoped>
    li{
        margin-top: 20px;
    }
    li button{
        float: right;
        margin-top: -5px;
    }
</style>