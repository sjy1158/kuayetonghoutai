<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>卡密管理</el-breadcrumb-item>
            <el-breadcrumb-item>卡密列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
            <el-form-item label="批次号">
                <el-input v-model="formInline.batchId" placeholder="请输入正确批次号"></el-input>
            </el-form-item>
            <el-form-item label="卡号查询">
                <el-input v-model="formInline.cardId" placeholder="请输入正确卡号"></el-input>
            </el-form-item>
            <el-form-item label="开始卡卡号">
                <el-input v-model="formInline.fromCardId" placeholder="请输入开始卡号"></el-input>
            </el-form-item>
            <el-form-item label="结束卡卡号">
                <el-input v-model="formInline.toCardId" placeholder="请输入结束卡号"></el-input>
            </el-form-item>
            <el-form-item label="卡状态">
                <el-select :value="formInline.status" placeholder="" @change="chose">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option label="已使用" value="1">已使用</el-option>
                    <el-option label="未使用" value="2">未使用</el-option>
                </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="卡管理员姓名">
                <el-input v-model="formInline.agentName" placeholder="请输入卡管理员姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="transferCard">划拨卡密</el-button>
                <el-button type="primary" @click="producePass">生成卡密</el-button>
                <el-button type="primary" @click="allsChange">批量修改</el-button>
                <el-button type="primary" @click="airRecharge">空中充值</el-button>
                <el-button type="primary" @click="cardRecharge">卡号充值</el-button>
                <el-button type="primary" @click="phoneShezhi">电话费率设置</el-button>
                <el-button type="danger" @click="Daochu">导出卡列表</el-button>
            </el-form-item>
        </el-form>
        <!--表格-->
        <div style="padding-left: 10px;padding-right: 10px;">
            <template>
                <el-table
                        v-loading="loading"
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%;margin: 0 auto"
                        @selection-change="handleSelectionChange">
                    <!--<el-table-column-->
                            <!--type="selection"-->
                            <!--width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="id"
                            label="ID编号"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="batchId"
                            label="批次号"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="agentName"
                            label="所属商"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="cardId"
                            label="卡号"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="password"
                            label="密码"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="金额"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="startTime"
                            label="开始时间"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="stopTime"
                            label="结束时间"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="days"
                            label="有效期"
                            width="145">
                    </el-table-column>
                    <el-table-column
                            prop="account"
                            label="充值号码"
                            width="145">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                          <span v-if="scope.row.status==0" @click="open(scope.row)">未使用</span>
                            <span v-if="scope.row.status==1">已使用</span>
                            <span v-if="scope.row.status==2">已冻结</span>
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
                    batchId:'',
                    cardId:'',
                    fromCardId:'',
                    toCardId:'',
                    status:'',
                    agentName:'',
                    pageNum:1,
                    num:10
                },
                total:'',
                //表格数据
                loading:true,
                tableData3: [],
                multipleSelection: []
            }
        },
        methods:{
            onSubmit(){
                    this.formInline.pageNum=1
                    this.loading=true;
                    this.getList(this.formInline);
                    this.$nextTick()
            },
            // 表格时间
            chose(val){
                this.formInline.status=val;
            },
            //分页
            getList(params){
                const _this = this;
                this.$api.getCardlist(params).then(function (res) {
                    _this.loading=false;
                    _this.total=res.sum;
                    for(var i=0;i<res.list.length;i++){
                        res.list[i].startTime=_this.$changTime.changeDate(res.list[i].startTime)
                        res.list[i].stopTime=_this.$changTime.changeDate(res.list[i].stopTime)
                    }
                    _this.tableData3 = res.list;
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
            //划拨卡密
            transferCard(){
                this.$router.push('/transferCard');
            },
            //生成卡密
            producePass(){
                this.$router.push('/producePass');
            },
            //批量修改
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //空中充值
            airRecharge(){
                this.$router.push('/airRecharge');
            },
            //卡号充值
            cardRecharge(){
                this.$router.push('/cardRecharge');
            },
            //费率设置
            phoneShezhi(){
                this.$router.push('/phoneShezhi');
            },
            //导出卡列表
            Daochu(){
                this.$api.daochuCardlist().then((res)=>{
                })
            },
            allsChange(){
                const _this = this;
                // if(this.multipleSelection.length==0){
                //     this.$message('请选择修改')
                //     return
                // }else{
                //     const idarr=[];
                //     this.multipleSelection.forEach((item)=>{
                //         idarr.push(item.cardId);
                //     });
                    this.$router.push({
                        path:'/allsChange',
                        query:{
                            obj:_this.formInline
                        }
                    })
                // }
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