<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}岗位 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="岗位名称" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="岗位介绍" >
            <el-input v-model="model.intro"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" >
            <el-select v-model="model.department" placeholder="请选择">
                <el-option v-for="item in department" :key="item._id"
                :label="item.name" :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="考试" >
            <el-input v-model="model.test"></el-input>
        </el-form-item>

        <el-date-picker
        v-model="model.start"
        type="datetime"
        placeholder="选择开始日期时间">
        </el-date-picker>

        <el-date-picker
        v-model="model.end"
        type="datetime"
        placeholder="选择结束日期时间">
        </el-date-picker>

        <el-form-item label="招聘人数" >
            <el-input v-model="model.num"></el-input>
        </el-form-item>

        <el-form-item label="岗位要求" >
            <el-input v-model="model.qualification"></el-input>
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
            },
            department:[]
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
                await this.$http.put(`/rest/recruits/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/recruits',this.model);
            }
            this.$router.push('/recruits/list')
            this.$message({
                type:"success",
                message:"success" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/recruits/${this.id}`)
            this.model = res.data
            const r = await this.$http.get(`/recruit_item/${this.id}`)
            console.log(r)
        },
        async fetchCategories(){
            const res = await this.$http.get(`/rest/departments`)
            this.department= res.data
        }
    },
    created(){
        this.fetchCategories()
        this.id&&this.fetch()
    }
}
</script>
