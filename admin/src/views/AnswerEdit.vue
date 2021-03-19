<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}答卷 </h1>
    <h4>考试名称 : {{test.name}} </h4>

    <el-form label-width="120px" label-position="top" @submit.native.prevent="save">
        <el-form-item label="答题者" >
            <el-select v-model="model.user">
                <el-option v-for="item in admin" :key="item._id"
                :label="item.username" :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="答题者姓名" >
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <h4>单选题</h4>
        <el-form-item v-for="(item,i) in test.single_choice.id" :key="item._id"
        :label="(i+1)+'、'+item.name" >
            <el-radio v-for="(answer,j) in item.answers" :key="answer._id"
            v-model="model.single_choice[i].choose" :label="String(j)">
                {{answer.name}}
            </el-radio>
        </el-form-item>

        <h4>多选题</h4>
        <el-form-item v-for="(item,i) in test.multiple_choice.id" :key="item._id"
        :label="(i+1)+'、'+item.name" >
            <el-checkbox-group v-model="model.multiple_choice[i].choose">
                <el-checkbox  v-for="(answer,j) in item.answers" :key="answer._id"
                :label="String(j)">{{answer.name}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <h4>判断题</h4>
        <el-form-item v-for="(item,i) in test.ture_or_false.id" :key="item._id"
        :label="(i+1)+'、'+item.name" >
            <el-radio v-for="(answer,j) in item.answers" :key="answer._id"
            v-model="model.ture_or_false[i].choose" :label="String(j)">
                {{answer.name}}
            </el-radio>
        </el-form-item>
        <h4>主观题</h4>
        <el-form-item v-for="(item,i) in test.subjective.id" :key="item._id"
        :label="(i+1)+'、'+item.name" >
            <el-input v-model="model.subjective[i].choose"></el-input>
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
                user:"",
                categories:"",
                test:"",
                ture_or_false:[], //判断题
                single_choice:[], //单选题
                multiple_choice:[],//不定项
                subjective:[], //主观题
                pass:"",
                score:"",
                accept:""
            },
            categories:[],
            test:{
                single_choice:{id:[]},
                ture_or_false:{id:[]},
                multiple_choice:{id:[]},
                subjective:{id:[]}
            },
            name:"aaa",
            ture_or_false:[], //判断题
            single_choice:[], //单选题
            multiple_choice:[],//不定项
            subjective:[], //主观题
            admin:[],
            test_id:"",
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
                await this.$http.put(`/rest/answers/${this.id}`,this.model)
            }else{
                await this.$http.post('/rest/answers',this.model);
            }
            // console.log("this.model")
            // console.log(this.model)
            this.$router.push('/answers/list')
            this.$message({
                type:"success",
                message:"success" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/answers/${this.id}`)
            this.model = res.data
            // this.test_id = this.model.test
            this.test = this.model.test
            // console.log(this.model)
            this.modelData()

        },
        async fetchTestItemID(){
            let testitem_id = this.$route.query.testitem_id
            // console.log(this.$route.query.testitem_id)
            // if(!this.test_id){
            //     if(this.$route.query.test_id){
            //         this.test_id = this.$route.query.test_id
            //     }
            // }
            // if(this.$route.query.testitem_id){
            //     this.model.test_item = this.$route.query.testitem_id
            // }
            const res = await this.$http.get(`/rest/test_items/${testitem_id}`)
            console.log(res)
            this.test = res.data.test
            this.model.test_item = testitem_id
            this.modelData()

            
            // console.log(this.model.single_choice[0].choose)
        },
        async fetchTestID(){
            this.test_id = this.$route.query.test_id
            // console.log(this.$route.query.testitem_id)
            // if(!this.test_id){
            //     if(this.$route.query.test_id){
            //         this.test_id = this.$route.query.test_id
            //     }
            // }
            // if(this.$route.query.testitem_id){
            //     this.model.test_item = this.$route.query.testitem_id
            // }
            const res = await this.$http.get(`/rest/tests/${this.test_id}`)
            console.log(res)
            this.test = res.data
            this.modelData()

            
            // console.log(this.model.single_choice[0].choose)
        },
        async modelData(){
            this.model.test = this.test._id
            console.log(this.model)
            // this.model.user="5f351fa5a51a09ba1cb87a8f"
            // this.model.name="123"
            // this.model.pass="1"
            // this.model.score = 60

            this.test.single_choice.id.forEach((value)=>{
                this.model.single_choice.push({
                    question:value._id,
                    choose:""
                })
                // this.model.single_choice[index].question = value._id
            })
            this.test.ture_or_false.id.forEach((value)=>{
                this.model.ture_or_false.push({
                    question:value._id,
                    choose:""
                })
                // this.model.ture_or_false[index].question = value._id
            })
            this.test.multiple_choice.id.forEach((value)=>{
                this.model.multiple_choice.push({
                    question:value._id,
                    choose:[]
                })
                // this.model.multiple_choice[index].question = value._id
            })
            this.test.subjective.id.forEach((value)=>{
                this.model.subjective.push({
                    question:value._id,
                    choose:""
                })
                // this.model.subjective[index].question = value._id
            })
            const admin = await this.$http.get('/rest/admin_users')
            this.admin = admin.data
            console.log(this.model)
        }
    },
    created(){
        if(this.id){
            this.fetch()
        }else if(this.$route.query.test_id){
            this.fetchTestID()
        }
        else if(this.$route.query.testitem_id){
            this.fetchTestItemID()
        }
        // this.id&&this.fetch()
        // !this.id&&this.fetchTest()
    }
}
</script>
