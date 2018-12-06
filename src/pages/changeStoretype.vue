<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>商家管理</el-breadcrumb-item>
            <el-breadcrumb-item>商家类型</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商家类型名称">
                    <el-input v-model="formInline.name" placeholder="请输入商家类型名称（选填）"></el-input>
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

                <el-form-item label="商家类型级别" label-width="120">
                    <el-select :value="formInline.level" style="width: 500px;" placeholder="请选择商家类型级别（必选）" @change="chose">
                        <el-option label="一级别" value="1">一级别</el-option>
                        <el-option label="二级别" value="2">二级别</el-option>
                        <!--<el-option label="审核失败" value="3">审核失败</el-option>-->
                    </el-select>
                </el-form-item>

                <el-form-item label="父级类型名称" v-if="formInline.level=='2'">
                    <el-input v-model="formInline.supTypeName" placeholder="请输入父级类型名称"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="producePass" style="margin-left: 200px;">立即修改</el-button>
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
                    id:this.$route.query.storeid,
                    name:this.$route.query.obj.name,
                    imageUrl:'',
                    level:'',
                    supTypeName:this.$route.query.obj.superiorName
                },
                postData:{
                    token:'',
                    key:''
                },
                dialogVisible: false
            }
        },
        methods:{
            // 单张卡修改
            producePass(){
                const _this=this;
                if(this.formInline.name!=''&&this.formInline.level!=''){
                    this.$confirm('是否修改？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.changeStoretype(_this.formInline).then((res)=>{
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
                this.formInline.level=val;
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
            }
        },
        mounted(){
            if(this.$route.query.obj.level=='1'){
                this.formInline.level='1'
            }else if(this.$route.query.obj.level=='2'){
                this.formInline.level='2'
            }
            this.getKey();
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>