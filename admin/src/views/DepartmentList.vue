<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>

            <el-table-column prop="name" label="部门名称">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
                <template slot-scope="scope">
                <el-button type="text" size="small"
                @click="$router.push(`/departments/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('/rest/departments')
            this.items = res.data
        },
        async remove(row){
            this.$confirm(`是否删除 ${row.name} 部门？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`/rest/departments/${row._id}`)
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
