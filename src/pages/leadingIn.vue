<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购订单导入</el-breadcrumb-item>
        </el-breadcrumb>


        <div>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="padding-left: 10px;padding-right: 10px;padding-top: 20px;">
                <el-form-item>
                    <p>(淘宝请上传后缀为.xls文件)</p>
                    <!--<el-button type="danger" @click="Daochu" style="float: left">导出用户列表</el-button>-->
                    <el-upload
                            v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'"
                            class="upload-demo"
                            ref="upload"
                            action="http://api.kuayet.com:8080/crossindustry/import/importTaoBaoTrade"
                            method="post"
                            limit="1"
                            accept=".xls"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false">
                        <el-button slot="trigger" type="primary">选取淘宝文件</el-button>
                        <el-button style="margin-left: 10px;float: right" type="success" @click="submitUpload">上传到服务器</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>
                <br/>
                <el-form-item>
                    <p>(京东请上传后缀为.csv文件)</p>
                    <!--<el-button type="danger" @click="Daochu" style="float: left">导出用户列表</el-button>-->
                    <el-upload
                            v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'"
                            class="upload-demo"
                            ref="jdupload"
                            action="http://api.kuayet.com:8080/crossindustry/import/importJingDongTrade"
                            method="post"
                            limit="1"
                            accept=".csv"
                            :on-preview="handlePreview2"
                            :on-remove="handleRemove2"
                            :file-list="fileList2"
                            :auto-upload="false">
                        <el-button slot="trigger" type="primary">选取京东文件</el-button>
                        <el-button style="margin-left: 10px;float: right" type="success" @click="submitUpload2">上传到服务器</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>
                <br/>
                <el-form-item>
                    <p>(拼多多请上传后缀为.xlsx文件)</p>
                    <!--<el-button type="danger" @click="Daochu" style="float: left">导出用户列表</el-button>-->
                    <el-upload
                            v-if="chanel=='%E8%B7%A8%E4%B8%9A%E9%80%9A'"
                            class="upload-demo"
                            ref="pdupload"
                            action="http://api.kuayet.com:8080/crossindustry/import/importPingDuoDuoTrade"
                            method="post"
                            limit="1"
                            accept=".xlsx"
                            :on-preview="handlePreview3"
                            :on-remove="handleRemove3"
                            :file-list="fileList3"
                            :auto-upload="false">
                        <el-button slot="trigger" type="primary">选取拼多多文件</el-button>
                        <el-button style="margin-left: 10px;float: right" type="success" @click="submitUpload3">上传到服务器</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-form-item label="时间选择">
                        <el-col :span="11">
                            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="请选择结算月份" v-model="formInline.jsDate"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-button type="primary" @click="jiesuan">结算</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchaseOrder",
        data(){
            return{
                fileList:[],
                fileList2:[],
                fileList3:[],
                formInline:{
                    jsDate: ''
                },
                loading:true,
                tableData3:[],
                total:0,
                chanel:localStorage.getItem('header')
            }
        },
        methods:{
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

            submitUpload2() {
                this.$refs.jdupload.submit();
            },
            handleRemove2(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview2(file) {
                console.log(file);
            },

            submitUpload3() {
                this.$refs.pdupload.submit();
            },
            handleRemove3(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview3(file) {
                console.log(file);
            },
            jiesuan () {
                this.$api.jiesuanByDate(this.formInline).then((res)=>{
                    console.log(res)
                })
            }
        },
        mounted(){
            this.loading=true;
        }
    }
</script>

<style scoped>
    .upload-demo{
        display: inline-block;
        margin-left: 10px;
    }
</style>