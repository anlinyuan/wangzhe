<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}管理员 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="用户名" >
            <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input type="text" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="身份">
            <el-radio-group v-model="model.admin">
            <el-radio label="管理员" value="1"></el-radio>
            <el-radio label="普通用户" value="0"></el-radio>
            </el-radio-group>
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
            model:{},
        }
    },
    methods: {
        async save(){
            // let res
            if(this.id){
                await this.$http.put(`/rest/admin_users/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/admin_users',this.model);
            }
            this.$router.push('/admin_users/list')
            this.$message({
                type:"success",
                message:"success" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/admin_users/${this.id}`)
            this.model = res.data
        },
    },
    created(){
        this.id&&this.fetch()
    }
}
</script>