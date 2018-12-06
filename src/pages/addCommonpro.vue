<template>
    <div>
        <el-breadcrumb separator="/" style="height: 40px;background: white;line-height: 40px;padding-left: 10px;padding-right: 10px;">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户端管理</el-breadcrumb-item>
            <el-breadcrumb-item>常见问题</el-breadcrumb-item>
            <el-breadcrumb-item>添加</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="width: 500px;height: auto;margin: 0 auto;margin-top: 20px!important;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="问题类型">
                    <el-input v-model="formInline.type" placeholder="请输入问题类型（必填）"></el-input>
                </el-form-item>
                <el-form-item label="问题">
                    <el-input v-model="formInline.title" placeholder="请输入问题（必填）"></el-input>
                </el-form-item>
                <el-form-item label="答案">
                    <el-input v-model="formInline.answer" placeholder="请输入答案（必填）"></el-input>
                </el-form-item>
                <!--图片地址-->
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
                    type:'',
                    title:'',
                    answer:'',
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
                if(this.formInline.type!=''&&this.formInline.title!=''&&this.formInline.answer!=''){
                    this.$confirm('是否添加？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        _this.$api.addCompro(_this.formInline).then((res)=>{
                        })
                    }).catch(()=>{
                        return
                    });
                }else{
                    this.$message('请输入正确完整信息')
                }
                // this.$api.changeOnepage(this.formInline)
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
                this.formInline.titleImageUrl="http://image.kuayet.com/"+response.key;
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
            this.getKey();
        }
    }
</script>

<style scoped>
    .el-input{
        width: 500px!important;
    }
</style>