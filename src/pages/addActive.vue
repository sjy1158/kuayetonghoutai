<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>发现</el-breadcrumb-item>
            <el-breadcrumb-item>活动预告</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <!--表单-->
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 20px;">
                <el-form-item label="活动标题">
                    <el-input v-model="formInline.title" placeholder="请输入活动标题（必填）" style="width: 500px;"></el-input>
                </el-form-item>
                <el-form-item label="活动列表图片（只能添加一张）">
                    <el-upload
                            action="http://up.qiniu.com/"
                            :data="postData2"
                            list-type="picture-card"
                            limit="1"
                            :before-upload="beforeUpload2"
                            :on-preview="handlePictureCardPreview2"
                            :on-remove="handleRemove2"
                            :on-error="handleError2"
                            :on-success="handleSuccess2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="formInline.image" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="活动内容" style="margin-bottom: 0px!important;">
                         <textarea cols="20" style="width: 500px;padding-left: 10px;padding-top: 10px;resize: both;resize: vertical;" placeholder="(必填)" ref="textValue" @blur.prevent="changeCount()">

                        </textarea>
                </el-form-item>
                <p style="color: red;font-size: 14px;">完成一段内容请点击保存<button style="margin-left: 20px;" type="button" @click="saveText()">保存</button></p>
                <el-form-item label="图片地址" style="">
                    <el-upload
                            ref="upload"
                            action="http://up.qiniu.com/"
                            :data="postData"
                            :file-list="formInline.detalis.imageUrl"
                            list-type="picture-card"
                            :before-upload="beforeUpload"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-error="handleError"
                            :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" v-for="item in imgUrl">
                        <img width="100%" :src="item" alt="">
                    </el-dialog>
                </el-form-item>
                <br/>
                <el-form-item label="转发图片">
                    <el-upload
                            action="http://up.qiniu.com/"
                            :data="postData3"
                            list-type="picture-card"
                            limit="1"
                            :before-upload="beforeUpload3"
                            :on-preview="handlePictureCardPreview3"
                            :on-remove="handleRemove3"
                            :on-error="handleErro3"
                            :on-success="handleSuccess3">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="formInline.activityUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <el-button type="primary" style="text-align: center;margin-top: 10px;margin-bottom: 20px;margin-left: 180px;" @click="bianji">立即编辑</el-button>
        </div>
        <!--表单ending-->
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor'
    import { Message } from 'element-ui'
    export default {
        name: "addActive",
        data(){
            return {
                contentarr:[],
                imgUrl: [],
                // content: [],
                formInline:{
                    image:'',
                    title:'',
                    // time:'2018-10-16 10:20:26',
                    activityUrl:'',
                    detalis:{}
                },
                postData:{
                    token:'',
                    key:''
                },
                // 第一张蹄片
                postData2:{
                    token:'',
                    key:''
                },
                postData3:{
                    token:'',
                    key:''
                }
            }
        },
        methods:{
            //添加活动图片
            getKey(){
                const _this=this;
                this.$api.getkey().then((res)=>{
                    _this.postData.token=res.token;
                    _this.postData2.token=res.token;
                    _this.postData3.token=res.token;
                })
            },
            saveText(){
                if(this.$refs.textValue.value!=''){
                    this.contentarr.push(this.$refs.textValue.value);
                    this.imgUrl.push(this.$refs.textValue.value);
                    Message({
                        type:'success',
                        message:'第'+this.contentarr.length+'段落保存成功'
                    });
                    this.$refs.textValue.value = '';
                }else{
                    return false;
                }
            },

            beforeUpload (file) {
                const keyname=Date.parse(new Date());
                this.postData.key=keyname;
            },
            handleSuccess (response, file, fileList) {
                const img ="http://image.kuayet.com/"+response.key;
                this.imgUrl.push(img);
            },
            handleRemove(file, fileList) {
                // alert(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.formInline.imageUrl = file.url;
                this.dialogVisible = true;
            },
            // 第二章图片
            beforeUpload2 (file) {
                const keyname=Date.parse(new Date());
                this.postData2.key=keyname;
            },
            handleSuccess2 (response, file, fileList) {
                this.formInline.image="http://image.kuayet.com/"+response.key;
            },
            handleRemove2(file, fileList) {
                // alert(file, fileList);
            },
            handlePictureCardPreview2(file) {
                this.formInline.imageUrl = file.url;
                this.dialogVisible = true;
            },
            // 第三章图片
            beforeUpload3 (file) {
                const keyname=Date.parse(new Date());
                this.postData3.key=keyname;
            },
            handleSuccess3 (response, file, fileList) {
                this.formInline.activityUrl="http://image.kuayet.com/"+response.key;
            },
            handleRemove3(file, fileList) {
                // alert(file, fileList);
            },
            handlePictureCardPreview3(file) {
                this.formInline.imageUrl = file.url;
                this.dialogVisible = true;
            },
            bianji(){
               for (let i = 0;i<this.imgUrl.length;i++) {
                   this.formInline.detalis[i] = this.imgUrl[i]
               }
               // alert(JSON.stringify(this.formInline));
               this.$api.addActivity(this.formInline).then((res)=>{
                   // alert(JSON.stringify(res));
               })
            }
        },
        mounted () {
            this.getKey();
        }
    }
</script>

<style scoped>

</style>