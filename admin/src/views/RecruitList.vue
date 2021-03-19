<template>
    <div>
        <h1>试卷列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="name" label="岗位名称">
            </el-table-column>
            <el-table-column prop="department.name" label="所属部门">
            </el-table-column>
            <el-table-column prop="intro" label="岗位信息">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
                <template slot-scope="scope">
                <el-button type="text" size="small"
                @click="$router.push(`/recruits/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('/rest/recruits')
            this.items = res.data
        },
        async remove(row){
            this.$confirm(`是否删除 ${row.name} 岗位？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.delete(`/rest/recruits/${row._id}`)
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
