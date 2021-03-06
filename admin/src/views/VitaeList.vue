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
            const res = await this.$http.get('/rest/vitaes')
            // const r = await this.$http.get("/schedule/603c3f4890ae292baf6e402b")
            // console.log(r)
            // const r = await this.$http.get('/recruit_item/603c3f4890ae292baf6e402b')
            // console.log(r)
            this.items = res.data
            
        },
        async remove(row){
            this.$confirm(`是否删除简历${row.title}？`, '提示', {
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
