<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商家名称">
                    <el-input v-model="formInline.name" placeholder="请输入商家名称（必填）"></el-input>
                </el-form-item>
                <el-form-item label="商家类型">
                    <el-input v-model="formInline.type" placeholder="请输入商家类型（必填）"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="formInline.account" placeholder="请设置商家登录账号（必填）"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formInline.password" placeholder="请设置商家登录密码（必填）"></el-input>
                </el-form-item>
                <!--图片地址-->
                <el-form-item label="商家头像地址">
                    <el-upload
                            action="http://up.qiniu.com/"
                            :data="postData"
                            list-type="picture-card"
                            limit="1"
                            :before-upload="beforeUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-error="handleError"
                            :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="formInline.imageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="平均消费">
                    <el-input v-model="formInline.averageMoney" placeholder="请输入平均消费金额"></el-input>
                </el-form-item>
                <el-form-item label="商家详细地址">
                    <el-input v-model="formInline.address" placeholder="请输入正确商家地址"></el-input>
                </el-form-item>
                <el-form-item label="开始营业时间">
                    <el-time-select
                            placeholder="起始时间"
                            v-model="formInline.startTime"
                            :picker-options="{
                              start: '00:00',
                              end: '24:00'
                            }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="结束营业时间">
                    <el-time-select
                            placeholder="结束时间"
                            v-model="formInline.stopTime"
                            :picker-options="{
                              start: '00:00',
                              end: '24:00'
                            }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.phone" placeholder="请输入正确手机号"></el-input>
                </el-form-item>
                <el-form-item label="商家介绍">
                    <el-input v-model="formInline.introduce" placeholder="请输入正确商家介绍"></el-input>
                </el-form-item>
                <el-form-item label="商家公告">
                    <el-input v-model="formInline.notice" placeholder="请输入商家公告"></el-input>
                </el-form-item>
                <el-form-item label="商家环境图片">
                    <el-upload
                            ref="upload"
                            action="http://up.qiniu.com/"
                            :data="postData2"
                            :file-list="imgarr"
                            list-type="picture-card"
                            :before-upload="beforeUpload2"
                            :on-preview="handlePictureCardPreview2"
                            :on-remove="handleRemove2"
                            :on-error="handleError2"
                            :on-success="handleSuccess2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" v-for="item in formInline.shopImage">
                        <img width="100%" :src="item" alt="">
                    </el-dialog>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "changeOnepage",
        data(){
            return{
                formInline:{
                    name:'',
                    account:'',
                    password:'',
                    type:'',
                    headUrl:'',
                    averageMoney:'',
                    startTime:'',
                    stopTime:'',
                    address:'',
                    phone:'',
                    introduce:'',
                    notice:'',
                    shopImage:''
                },
                postData:{
                    token:'',
                    key:''
                },
                postData2:{
                    token:'',
                    key:''
                },
                imageNum:0,
                imgarr:[],
                index:'',
                dialogVisible: false
            }
        },
        methods:{
            // 单张卡修改
            producePass(){
                const _this=this;
                    this.$confirm('是否添加？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                        if(_this.formInline.headUrl==''){
                            return _this.$message({
                                type:'error',
                                message:'请添加商家头像地址'
                            })
                        }
                        if(_this.formInline.phone==''||myreg.test(_this.formInline.phone)){
                        _this.$api.addStorephoto(_this.formInline).then((res)=>{
                        })
                        }else{
                            _this.$message({
                                type:'error',
                                message:'请输入正确手机号'
                            })
                        }
                    }).catch(()=>{
                        return
                    });
                // this.$api.changeOnepage(this.formInline)
            },
            //选择状态
            chose(val){
                this.formInline.type=val;
            },
            //获取秘钥
            getKey(){
                const _this=this;
                this.$api.getkey().then((res)=>{
                    _this.postData.token=res.token;
                    _this.postData2.token=res.token;
                })
            },
            beforeUpload (file) {
                const keyname=Date.parse(new Date());
                this.postData.key=keyname;
            },
            handleSuccess (response, file, fileList) {
                this.formInline.headUrl="http://image.kuayet.com/"+response.key;
            },
            handleRemove(file, fileList) {
                // alert(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.formInline.imageUrl = file.url;
                this.dialogVisible = true;
            },

            // 图片上窜2
            beforeUpload2 (file) {
                const keyname=Date.parse(new Date());
                this.postData2.key=keyname;
            },
            handleSuccess2 (response, file, fileList) {
                const img="http://image.kuayet.com/"+response.key;
                this.imgarr.push(img);
                this.formInline.shopImage=JSON.stringify(this.imgarr);
            },
            handleRemove2(file, fileList) {
            },
            handlePictureCardPreview2(file) {
                this.formInline.imageUrl = file.url;
                this.dialogVisible = true;
            }
        },
        mounted(){
            this.getKey();
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>