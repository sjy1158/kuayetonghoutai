<template>
    <div class="getQcode">
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购编辑缩略图</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="content1" style="background: white;height: 568px;width: 320px;margin: 0 auto;margin-top: 20px!important;">
            <div id="title" style="">
                <div class="title">
                    <!--标题-->
                    <div class="title_item" style=" white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                        <img v-show="row.source=='拼多多'" src="../assets/pinduoduo@3x.png" alt="">
                        <img v-show="row.source=='京东'" src="../assets/jingdong@3x.png" alt="">
                        <img v-show="row.source=='淘宝'" src="../assets/taobao@3x.png" alt="">
                        <span>{{row.name}}</span>
                    </div>
                    <!--折扣-->
                    <div class="title_item2">
                        <span style="color: #FF0000;vertical-align: middle;">
                            <span style="font-size: 12px;">¥</span>
                            <span style="font-size: 16px;font-weight: bold">{{row.price}}</span>
                            <span style="font-size: 12px;">元</span>
                        </span>
                        <span style="font-size: 12px;color: #717171;vertical-align: middle;padding-left: 10px;">已售{{row.salesVolume}}件</span>
                        <div style="display: inline-block" class="discon">
                            <div class="disconsize" style="position: absolute;height: 19px;width: 60%;line-height: 21px;text-align: center;color: white;font-size: 10px;letter-spacing: 2px;">¥{{row.deduction}}</div>
                            <img src="../assets/coupons@3x.png" alt="" style="width: 90px;height: 19px;">
                        </div>
                    </div>
                    <!--大图-->
                    <div style="margin-top: 20px;">
                        <img id="imgUrl" :src="row.imageUrl" alt="" style="width: 100%;height: 346px;">
                    </div>
                    <div class="footer">
                        <div class="left_title" style="float: left;margin-top: 40px;">
                            <img src="../assets/logo@8x.png" alt="" style="width: 42px;height: 42px;vertical-align: middle;">
                            <div style="height: 42px;width: auto;display: inline-block;vertical-align: middle;padding-left: 10px;">
                                <p style="margin: 0px!important;">跨业通</p>
                                <p style="margin: 0px!important;">免费模式共创平台</p>
                            </div>
                        </div>
                        <!--二维码-->
                        <div style="float: right;margin-top: 9px;height: 83px;width: 83px;position: relative">
                            <img src="../assets/border@3x.png" alt="" style="width: 83px;height: 83px;">
                            <div id="qrcode" style="position: absolute;top: 50%;margin-top: -37.5px;left: 50%;margin-left: -37.5px;"></div>
                            <!--<vue-qr :logoSrc="config.imagePath" :text="config.value" :size="75" :margin="75" style="position: absolute;top: 50%;margin-top: -37.5px;left: 50%;margin-left: -37.5px;"></vue-qr>-->
                                <!--<img src="../assets/codeqr.jpg" alt="" style="width: 75px;height: 75px;position: absolute;top: 50%;margin-top: -37.5px;left:50%;margin-left: -37.5px;">-->
                            <p style="color: #717171;font-size: 12px;margin: 0px!important;padding-top: 4px;width: 100px;">长按识别二维码</p>
                        </div>
                        <!--<p style="color: #717171;font-size: 12px;margin: 0px!important;padding-top: 4px;">长按识别二维码</p>-->
                    </div>
                </div>
            </div>
        </div>
        <div style="width: 300px;height: 50px;margin: 0 auto;margin-top: 10px!important;text-align: center;line-height: 50px;">
            <a href="javascript:;" rel="external nofollow" class="btn" id="download">请先下载此截图在进行上传</a>
        </div>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="添加截图">
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
                        <img width="100%" :src="formInline.shareUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="内容">
                     <textarea cols="20" style="width: 500px;padding-left: 10px;padding-top: 10px;resize: both;resize: vertical;" placeholder="(必填)" v-model="formInline.content">

                    </textarea>
                </el-form-item>
                <el-form-item label="图片列表">
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
                    <el-dialog :visible.sync="dialogVisible" v-for="item in formInline.image">
                        <img width="100%" :src="item" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="text-align: center;margin-top: 10px;margin-bottom: 20px;margin-left: 180px;" @click="bianji">立即编辑</el-button>
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
                imgUrl: '',
                row:this.$route.query.row,
                imageUrl: '',
                formInline: {
                    adminid:storage.getToken(),
                    content:'',
                    image:'',
                    shareUrl:'',
                    type:1,
                    proId:this.$route.query.row.id
                },
                postData:{
                    token:'',
                    key:''
                },
                postData2:{
                    token:'',
                    key:''
                },
                imgarr:[],
            }
        },
        methods: {
            getQCode (url) {
                let qrcode = new QRCode('qrcode', {
                    width: 75,
                    height: 75, // 高度
                    text: url
                })
            },
            toImage () {
                const _this = this;
                html2canvas(document.querySelector('#content1'),{
                    backgroundColor: null,
                    scale:3,
                    useCORS: true,  // 允许加载跨域图片
                    tainttest: true // 检测每张图片都已经加载完成
                }).then((canvas) => {
                    // _this.imageUrl = canvas.toDataURL("image/png")
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';
                    document.getElementById("download").setAttribute('href', canvas.toDataURL("image/png"));
                    //下载下来的图片名字
                    document.getElementById("download").setAttribute('download', 'share.png');
                    // console.log(_this.imgUrl)
                    document.querySelector('#content1').innerHTML = '';
                    document.querySelector('#content1').appendChild(canvas)
                });

            },
            getKey(){
                const _this=this;
                this.$api.getkey().then((res)=>{
                    _this.postData.token=res.token;
                    _this.postData2.token = res.token;
                })
            },
            beforeUpload (file) {
                const keyname=Date.parse(new Date());
                this.postData.key=keyname;
            },
            handleSuccess (response, file, fileList) {
                this.formInline.shareUrl="http://image.kuayet.com/"+response.key;
                // alert(this.formInline.shareUrl);
            },
            handleRemove(file, fileList) {
                // alert(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.formInline.shareUrl = file.url;
                this.dialogVisible = true;
            },
            // 图片上传2
            beforeUpload2 (file) {
                const keyname=Date.parse(new Date());
                this.postData2.key=keyname;
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
                this.$confirm('是否编辑？','提示',{
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
            this.getQCode(this.row.url);
            this.toImage();
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