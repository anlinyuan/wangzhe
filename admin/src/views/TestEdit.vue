<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}试卷 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="试卷标题" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="试卷分类" >
            <el-select v-model="model.categories" multiple>
                <el-option v-for="item in categories" :key="item._id"
                :label="item.name" :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否公开试卷" >
            <el-radio v-model="model.public" label="0">公开</el-radio>
            <el-radio v-model="model.public" label="1">私密</el-radio>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>

    <el-form label-width="120px" @submit.native.prevent="saveQuestion" v-show="id">
        <el-button type="text" @click="AddQuestions()"><i class="el-icon-plus"></i>添加题目</el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(question,i) in questions" :key="i">
                <el-form-item label="题目内容" >
                    <el-input v-model="question.name"></el-input>
                </el-form-item>
                <el-form-item label="题目分类" >
                    <el-select v-model="question.categories" multiple>
                        <el-option v-for="item in categories" :key="item._id"
                        :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-button type="text" @click="question.answers.push({})"><i class="el-icon-plus"></i>添加选项</el-button>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="12" v-for="(item,i) in question.answers" :key="i">
                        <el-form-item label="名称">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="正确选项">
                    <el-input v-model="question.right"></el-input>
                </el-form-item>
            </el-col>
        </el-row>   
        
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script> 
export default {
    props:{
        id:{}
    },
    data(){
        return {
            model:{
                name:"",
                questions:[],
                categories:[],
            },
            questions:[{
                name:"",
                categories:[],
                answers:[],
                right:""
            }],
            questionChooes:[],
            categories:[]
        }
    },
    methods: {
        AddQuestions(){
            this.questions.push({
                name:"",
                categories:[],
                answers:[],
                right:""
            })        
        },
        async save(){
            // let res
            if(this.id){
                await this.$http.put(`/rest/tests/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/tests',this.model);
            }
            this.$router.push('/tests/list')
            this.$message({
                type:"success",
                message:"保存试卷成功" 
            })
        },
        async saveQuestion(){
            console.log(this.questions[0])
            // let questionList = []
            if(!this.questions[0]._id){
                for(let i=0;i<this.questions.length;i++){
                    let a = await this.$http.post('/rest/questions',this.questions[i]);
                    this.model.questions[i]=a.data._id;
                }
            }else{
                for(let i=0;i<this.questions.length;i++){
                    await this.$http.put(`/rest/questions/${this.questions[i]._id}`,this.questions[i])
                }
            }
            // this.$router.push('/tests/list')
            this.$message({
                type:"success",
                message:"保存题目成功" 
            })
            this.save()
        },
        async fetch(){
            const res = await this.$http.get(`/rest/tests/${this.id}`)
            this.model = res.data
            this.questions = this.model.questions
            console.log(this.model)
            console.log(this.questions)
        },
        async fetchCategories(){
            const res = await this.$http.get(`/rest/categories`)
            this.categories = res.data
        }
    },
    created(){
        this.fetchCategories()
        this.id&&this.fetch()
    }
}
</script>
