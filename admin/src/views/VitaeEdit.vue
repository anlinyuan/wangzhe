<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}简历 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="选择岗位" >
            <el-select v-model="model.recruits" multiple>
                <el-option v-for="item in recruits" :key="item._id"
                :label="item.name" :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="名字" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="用户id" >
            <el-input v-model="model.user"></el-input>
        </el-form-item>
        <el-form-item label="学号" >
            <el-input v-model="model.student_id"></el-input>
        </el-form-item>
        <el-form-item label="照片" >
            <!-- action,上传地址，在main.js中
            getAuthHeaders()加请求头，在main.js中 -->
            <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload">
            <img v-if="model.avator" :src="model.avator" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="电话" >
            <el-input v-model="model.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
            <el-input v-model="model.email"></el-input>
        </el-form-item>
        <el-form-item label="个人网站" >
            <el-input v-model="model.personal_website"></el-input>
        </el-form-item>
        <el-form-item label="年级" >
            <el-input v-model="model.grade"></el-input>
        </el-form-item>
        <el-form-item label="学院" >
            <el-input v-model="model.academic"></el-input>
        </el-form-item>
        <el-form-item label="专业" >
            <el-input v-model="model.major"></el-input>
        </el-form-item>
        <el-form-item label="项目经历" >
            <el-input v-model="model.projects"></el-input>
        </el-form-item>
        <el-form-item label="获奖情况" >
            <el-input v-model="model.awards"></el-input>
        </el-form-item>
        <el-form-item label="所掌握的编程语言" >
            <el-input v-model="model.programing"></el-input>
        </el-form-item>
        <el-form-item label="语言技能" >
            <el-input v-model="model.language_skill"></el-input>
        </el-form-item>
        <el-form-item label="自我评价" >
            <el-input v-model="model.self_evalute"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script> 
// import { VueEditor } from "vue2-editor";
export default {
    props:{
        id:{}
    },
    components: {
        // VueEditor
    },
    data(){
        return {
            model:{},
            parents:[],
            recruits:[],
            choose_recruits:[]
        }
    },
    methods: {
        afterUpload(res){
            this.$set(this.model,'avator',res.url)
            console.log(res)
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            console.log(1);
            const formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post("upload", formData);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },
        async save(){
            console.log(this.model)
            if(this.id){
                await this.$http.put(`/rest/vitaes/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/vitaes',this.model);
            }
            this.$router.push('/vitaes/list')
            this.$message({
                type:"success",
                message:"success" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/vitaes/${this.id}`)
            this.model = res.data
            
        },
        async fetchCategories(){
            const res = await this.$http.get(`/rest/recruits`)
            this.recruits = res.data
        }
    },
    created(){
        this.fetchCategories()
        this.id&&this.fetch()
    }
}
</script>