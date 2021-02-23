<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}题目 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="考试名称" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="试卷ID" >
            <el-input v-model="model.test"></el-input>
        </el-form-item>

        <el-date-picker
        v-model="model.start"
        type="datetime"
        placeholder="选择日期时间">
        </el-date-picker>

        <el-date-picker
        v-model="model.end"
        type="datetime"
        placeholder="选择日期时间">
        </el-date-picker>

        <el-form-item label="参与人员" >
            <el-input v-model="model.examinee"></el-input>
        </el-form-item>
        <!-- <el-form-item label="参与人员" >
            <el-select v-model="model.examinee" multiple>
                <el-option v-for="item in examinee" :key="item._id"
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

                <el-form-item label="是否为正确选项">
                    <el-input v-model="item.flag"></el-input>
                </el-form-item>
            </el-col>
        </el-row> -->
            
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
                await this.$http.put(`/rest/test_items/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/test_items',this.model);
            }
            this.$router.push('/test_items/list')
            this.$message({
                type:"success",
                message:"success" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/test_items/${this.id}`)
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
