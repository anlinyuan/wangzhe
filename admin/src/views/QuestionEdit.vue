<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}题目 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="题目内容" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="题目分类" >
            <el-select v-model="model.categories" multiple>
                <el-option v-for="item in categories" :key="item._id"
                :label="item.name" :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
            
        <el-button type="text" @click="model.answers.push({})"><i class="el-icon-plus"></i>添加选项</el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,i) in model.answers" :key="i">
                <el-form-item label="名称">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item label="正确选项">
            <el-input v-model="model.right"></el-input>
        </el-form-item>

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
                categories:"",
                answers:[]
            },
            categories:[]
        }
    },
    methods: {
        afterUpload(res){
            this.$set(this.model,'icon',res.url)
            console.log(res)
        },
        async save(){
            // let res
            if(this.id){
                await this.$http.put(`/rest/questions/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/questions',this.model);
            }
            this.$router.push('/questions/list')
            this.$message({
                type:"success",
                message:"success" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/questions/${this.id}`)
            this.model = res.data
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
