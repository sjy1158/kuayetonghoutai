<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>电商购管理</el-breadcrumb-item>
            <el-breadcrumb-item>电商购头部分类</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="二级分类名称">
                    <el-input v-model="formInline.bigTypeName" placeholder="请输入二级分类名称（必填）"></el-input>
                </el-form-item>
                <!--图片地址-->
                <el-form-item label="图片地址">
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

                <el-form-item label="电商购头部分类" label-width="120">
                    <el-select :value="formInline.bigestType" style="width: 500px;" placeholder="请选择头部分类（必选）" @change="chose">
                        <el-option v-for="item in tabledate" :label="item.typeName" :value="item.typeId">{{item.typeName}}</el-option>
                        <!--<el-option label="审核失败" value="3">审核失败</el-option>-->
                    </el-select>
                </el-form-item>

                <el-form-item label="sql">
                    <el-input v-model="formInline.sql" placeholder="请输入sql（必填）"></el-input>
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
                    bigTypeName:'',
                    imageUrl:'',
                    bigestType:'',
                    sql:''
                },
                formInline2:{
                    id:'',
                    name:'',
                },
                postData:{
                    token:'',
                    key:''
                },
                tabledate:[],
                dialogVisible: false
            }
        },
        methods:{
            // 单张卡修改
            producePass(){
                const _this=this;
                if(this.formInline.bigTypeName!=''&&this.formInline.imageUrl!=''&&this.formInline.bigestType!=''&&this.formInline.sql!=''){
                    this.$confirm('是否添加？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.addBigType(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
                // this.$api.changeOnepage(this.formInline)
            },
            chose(val){
                this.formInline.bigestType=val;
            },
            //获取秘钥
            getKey(){
                const _this=this;
                this.$api.getkey().then((res)=>{
                    _this.postData.token=res.token;
                })
            },
            beforeUpload (file) {
                const keyname=Date.parse(new Date());
                this.postData.key=keyname;
            },
            handleSuccess (response, file, fileList) {
                this.formInline.imageUrl="http://image.kuayet.com/"+response.key;
            },
            handleRemove(file, fileList) {
                // alert(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.formInline.imageUrl = file.url;
                this.dialogVisible = true;
            },
            getList2(params){
                const _this=this;
                this.$api.getBeheader(params).then((res)=>{
                    _this.tabledate=res.list;
                })
            },
        },
        mounted(){
            this.getKey();
            this.getList2(this.formInline2);
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>