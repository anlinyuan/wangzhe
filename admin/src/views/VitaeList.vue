<template>
    <div>
        <h1>简历列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <!-- <el-table-column prop="parent.name" label="上级分类">
            </el-table-column> -->
            <el-table-column prop="name" label="简历姓名">
            </el-table-column>
            <el-table-column prop="user.username" label="用户名">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
                <template slot-scope="scope">
                <el-button type="text" size="small"
                @click="$router.push(`/vitaes/edit/${scope.row._id}`)">编辑</el-button>
                <el-button type="text" size="small"
                @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[],
        }
    },
    methods:{
        async fetch(){
            let i=[]
            if(i.length!=0){
                console.log(1)
            }
            const res = await this.$http.get('/rest/vitaes')
            // const r = await this.$http.post("/search/questions",{
            //     // category_id:"603101a15366ebf854108253",
            //     // keyword:"下列",
            //     // last_id:"604390093100f0798a5d6e28",//11
            //     // last_id:"60499824897f85180767ba8f",//22
            //     // last_id:"60499831897f85180767ba90",//t33
            //     last_id:"604391243100f0798a5d6e2e",//33
            //     from:3,
            //     to:1,
            //     num:1,
            //     admin:0,
            // })
            // console.log(r)
            // const r = await this.$http.put(`/rest/answers/60439f9c5a4d347b25a5b152`,{
            //     accept:0,
            //     pass:0
            // })
            // console.log(r)


            // const r = await this.$http.get("/recruit_item/60438e1f5769d178e0e04d36")
            // console.log(r)

            // const r = await this.$http.post("/email",{
            //     vitae_id:"60439e0c96b4d27aa38e92b9",
            //     recruit_id:"60438f033100f0798a5d6e25",
            // })
            // console.log(r)
            // const r = await this.$http.get('/recruit_item/603c3f4890ae292baf6e402b')
            // console.log(r)
            this.items = res.data
            
        },
        async remove(row){
            this.$confirm(`是否删除 ${row.title} 简历？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`/rest/vitaes/${row._id}`)
                if(res.data.success){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
                this.fetch()
                
            })
        }
    },
    created(){
        this.fetch()
    }
}
</script>
