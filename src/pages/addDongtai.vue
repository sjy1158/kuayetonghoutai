<template>
    <div class="getQcode">
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>发现</el-breadcrumb-item>
            <el-breadcrumb-item>动态添加删除</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="内容">
                     <textarea cols="20" style="width: 500px;padding-left: 10px;padding-top: 10px;resize: both;resize: vertical;" placeholder="(必填)" v-model="formInline.content">

                    </textarea>
                </el-form-item>
                <el-form-item label="图片列表">
                    <el-upload
                            ref="upload"
                            action="http://up.qiniu.com/"
                            :data="postData"
                            :file-list="imgarr"
                            list-type="picture-card"
                            :before-upload="beforeUpload2"
                            :on-preview="handlePictureCardPreview2"
                            :on-remove="handleRemove2"
                            :on-error="handleError2"
                            :on-success="handleSuccess2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" v-for="item in formInline.image">
                        <img width="100%" :src="item" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="text-align: center;margin-top: 10px;margin-bottom: 20px;margin-left: 180px;" @click="bianji">立即添加</el-button>
        </div>
        <!--<a href="javascript:;" rel="external nofollow" class="btn" id="download" style="display: none">截图下载</a>-->
    </div>
</template>

<script>
    import { storage } from '@/util'
    import html2canvas from 'html2canvas'
    import QRCode from 'qrcodejs2'
    export default {
        name: "getQcode",
        data () {
            return {
                formInline: {
                    adminid:storage.getToken(),
                    content:'',
                    image:'',
                    type:this.$route.query.type
                },
                postData:{
                    token:'',
                    key:''
                },
                imgarr:[],
            }
        },
        methods: {
            getKey(){
                const _this=this;
                this.$api.getkey().then((res)=>{
                    _this.postData.token=res.token;
                })
            },
            // 图片上传2
            beforeUpload2 (file) {
                const keyname=Date.parse(new Date());
                this.postData.key=keyname;
            },
            handleSuccess2 (response, file, fileList) {
                const img="http://image.kuayet.com/"+response.key;
                this.imgarr.push(img);
                this.formInline.image=JSON.stringify(this.imgarr);
            },
            handleRemove2(file, fileList) {
            },
            handlePictureCardPreview2(file) {
                this.formInline.image = file.url;
                this.dialogVisible = true;
            },
            bianji(){
                const _this=this;
                this.$confirm('是否添加？','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    if(_this.formInline.content!=''&&_this.formInline.imageUrl!=''&&_this.formInline.image!=''){
                        _this.$api.saveImage(_this.formInline).then((res)=>{
                        })
                    }else{
                        _this.$message({
                            type:'error',
                            message:'请输入正确完整信息'
                        })
                    }
                }).catch(()=>{
                    return
                });
            }
        },
        // computed () {
        //     this.getQCode();
        // },
        // created () {
        //     this.getChange("http://pic.58pic.com/58pic/15/63/07/42Q58PIC42U_1024.jpg");
        // },
        mounted () {
            this.getKey();
        }
    }
</script>

<style scoped>
    .getQcode{
        /*height: 100%;*/
        /*width: 100%;*/
        /*position: relative;*/
        /*background: white;*/
    }
    .title{
        padding: 0px 20px;
        /*height: 17px;*/
        /*background: yellow;*/
    }
    .title .title_item{
        width: 100%;
        height: 17px;
        padding-top: 20px;
        line-height: 17px;
        /*height: 100%;*/
        /*background: black;*/
    }
    .title .title_item img{
        height: 12px;
        width: 12px;
        vertical-align: middle;
    }
    .title_item span{
        font-size: 12px;
        vertical-align: middle;
    }
    .title .title_item2{
        width: 100%;
        height: 28px;
        /*background: #3a8ee6;*/
        margin-top: 10px;
        line-height: 28px;
        position: relative;
        /*padding-top: 20px;*/
        /*line-height: 17px;*/
    }
    .title .title_item2 span{
        /*vertical-align: middle;*/
    }
    .title .title_item2 .discon{
        position: absolute;
        right: 0px;
        top: 50%;
        margin-top: -9.5px;
    }
    .title .title_item2 .discon{
        vertical-align: middle;
    }
    .title .title_item2 span:first-child{

    }
    .footer{
        margin-top: 0.15rem;
        /*height: 120px;*/
    }
    .footer p:first-child{
        color: #F08400;
        font-size: 20px;
        letter-spacing: 5px;
        font-weight: bold;
    }
    .footer p:nth-child(2){
        font-size: 12px;
        color: #393939;
    }
</style>