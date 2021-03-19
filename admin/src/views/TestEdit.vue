<template>
  <div class="about">
    <h1>{{id?"编辑":"新建"}}试卷 </h1>
    <!-- 单选 -->
    <el-form label-width="120px" @submit.native.prevent="saveQuestion(single_choice,0)" v-show="id">
        <el-form-item label="单选题每题的分数" >
            <el-input v-model="model.single_choice.score"></el-input>
        </el-form-item>
        <el-button type="text" @click="AddQuestions(0)">
            <i class="el-icon-plus"></i>添加单选题
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(question,i) in single_choice" :key="i">
                <el-form-item label="题目内容" >
                    <el-input v-model="question.name"></el-input>
                </el-form-item>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="12" v-for="(item,i) in question.answers" :key="i">
                        <el-form-item label="选项" label-width="100px">
                            <el-radio v-model="question.right" :label="String(i)">
                                <el-input v-model="item.name"></el-input>
                            </el-radio>    
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item label="正确选项">
                    <el-input v-model="question.right"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button size="small" type="danger" 
                    @click="single_choice.splice(i,1)">删除</el-button>
                </el-form-item>   
            </el-col>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-row>   
    </el-form>
    <!-- 多选 -->
    <el-form label-width="120px" @submit.native.prevent="saveQuestion(multiple_choice,1)" v-show="id">
        <el-form-item label="多选题每题的分数" >
            <el-input v-model="model.multiple_choice.score"></el-input>
        </el-form-item>
        <el-button type="text" @click="AddQuestions(1)">
            <i class="el-icon-plus"></i>添加多选题
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(question,i) in multiple_choice" :key="i">
                <el-form-item label="题目内容" >
                    <el-input v-model="question.name"></el-input>
                </el-form-item>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-checkbox-group v-model="question.right">
                        <el-checkbox v-for="(item,i) in question.answers" :key="i"
                        :label="String(i)" style="margin-left:60px">
                            <el-form-item label="选项" label-width="50px">
                                    <el-input v-model="item.name"></el-input>
                                </el-form-item>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-row>
                <el-form-item>
                    <el-button size="small" type="danger" 
                    @click="multiple_choice.splice(i,1)">删除</el-button>
                </el-form-item>                
            </el-col>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-row>   
    </el-form>
    <!-- 判断 -->
    <el-form label-width="120px" @submit.native.prevent="saveQuestion(ture_or_false,2)" v-show="id">
        <el-form-item label="判断题每题的分数" >
            <el-input v-model="model.ture_or_false.score"></el-input>
        </el-form-item>
        <el-button type="text" @click="AddQuestions(2)">
            <i class="el-icon-plus"></i>添加判断题
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(question,i) in ture_or_false" :key="i">
                <el-form-item label="题目内容" >
                    <el-input v-model="question.name"></el-input>
                </el-form-item>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="12" v-for="(item,i) in question.answers" :key="i">
                        <el-form-item label="名称">
                            <el-radio v-model="question.right" :label="String(i)">
                                <el-input v-model="item.name"></el-input>
                            </el-radio>    
                        </el-form-item>
                        <!-- <el-form-item label="名称">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item> -->
                    </el-col>
                </el-row>
                <!-- <el-form-item label="正确选项">
                    <el-input v-model="question.right"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button size="small" type="danger" 
                    @click="ture_or_false.splice(i,1)">删除</el-button>
                </el-form-item>
            </el-col>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-row>   
    </el-form>
    <!-- 主观 -->
    <el-form label-width="120px" @submit.native.prevent="saveQuestion(subjective,3)" v-show="id">
        <el-form-item label="主观题每题的分数" >
            <el-input v-model="model.subjective.score"></el-input>
        </el-form-item>
        <el-button type="text" @click="AddQuestions(3)">
            <i class="el-icon-plus"></i>添加主观题
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(question,i) in subjective" :key="i">
                <el-form-item label="题目内容" >
                    <el-input v-model="question.name"></el-input>
                </el-form-item>
                <el-form-item label="正确选项">
                    <el-input v-model="question.right"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="danger" 
                    @click="subjective.splice(i,1)">删除</el-button>
                </el-form-item>
            </el-col>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-row>   
    </el-form>  
    <h1>试卷基本信息 </h1>
    <!-- 试卷基本内容 -->
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
        <el-form-item label="创建者" >
            <el-select v-model="model.author">
                <el-option v-for="item in admin" :key="item._id"
                :label="item.username" :value="item._id">
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
                ture_or_false:{
                    score:"",
                    id:[]
                }, //判断题
                single_choice:{
                    score:"",
                    id:[]
                }, //单选题
                multiple_choice:{
                    score:"",
                    id:[]
                },//不定项
                subjective:{
                    score:"",
                    id:[]
                }, //主观题
                categories:[],
            },
            // single_choice:[{
            //     name:"",
            //     categories:[],
            //     answers:[],
            //     right:""
            // }],
            ture_or_false:[], //判断题
            single_choice:[], //单选题
            multiple_choice:[],//不定项
            subjective:[], //主观题

            questionChooes:[],
            categories:[],
            admin:[],
        }
    },
    methods: {
        AddQuestions(id){
            console.log(id)
            switch (id){
                case 0:
                    this.single_choice.push({
                        name:"",
                        categories:"603101a15366ebf854108253",
                        answers:[{},{},{},{}],
                        right:""
                    }) 
                    break;  
                case 1:
                    this.multiple_choice.push({
                        name:"",
                        categories:"603e1f14d2f7244421f3df2b",
                        answers:[{},{},{},{}],
                        right:[]
                    }) 
                    break;  
                case 2:
                    this.ture_or_false.push({
                        name:"",
                        categories:"603e1f31d2f7244421f3df2c",
                        answers:[{},{}],
                        right:""
                    }) 
                    break; 
                case 3:
                    this.subjective.push({
                        name:"",
                        categories:"603e1f85d2f7244421f3df2d",
                        // answers:[{}],
                        right:""
                    }) 
                    break; 
                default:
                    break;
            }      
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
        async saveQuestion(data,id){
            console.log(id)
            console.log(data)
            const res = await this.$http.put('/questions/test',data);
            console.log("res")
            console.log(res)
            
            res.data.forEach((value,index) => {
                switch (id){
                    case 0:
                        this.model.single_choice.id[index] = value
                        break;
                    case 1:
                        this.model.multiple_choice.id[index] = value
                        break;  
                    case 2:
                        this.model.ture_or_false.id[index] = value
                        break; 
                    case 3:
                        this.model.subjective.id[index] = value
                        break; 
                    default:
                        break;
                }
                // console.log(value)
           
            });
         
            this.$message({
                type:"success",
                message:"保存题目成功" 
            })
        },
        async fetch(){
            const res = await this.$http.get(`/rest/tests/${this.id}`)
            this.model = res.data
            console.log(this.model)
            this.single_choice = this.model.single_choice.id
            this.ture_or_false = this.model.ture_or_false.id
            this.multiple_choice = this.model.multiple_choice.id
            this.subjective = this.model.subjective.id
            for(let i=0;i<this.multiple_choice.length;i++){
                this.multiple_choice[i].right = this.multiple_choice[i].right.split(",")
            }
            console.log(this.multiple_choice)
        },
        async fetchCategories(){
            const res = await this.$http.get(`/rest/categories`)
            this.categories = res.data
            const admin = await this.$http.get('/rest/admin_users')
            this.admin = admin.data
        }
    },
    created(){
        this.fetchCategories()
        this.id&&this.fetch()
    }
}
</script>
