
<template>
<el-container style="height: 100vh">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- :default-openeds="['1']"默认展开第一个，unique-opened只展开一个 :default-active高亮-->
    <el-menu router  unique-opened :default-active="$route.path">
      <!-- <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>

        <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">英雄</template>
          <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
          <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>运营管理</template>
        <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>系统设置</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">管理员</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>题目设置</template>
        <el-menu-item-group>
          <template slot="title">试题</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/questions/create">新增题目</el-menu-item>
          <el-menu-item index="/questions/list">题目列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">面试题</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/interviews/create">新增题目</el-menu-item>
          <el-menu-item index="/interviews/list">题目列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">试卷</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/tests/create">新增试卷</el-menu-item>
          <el-menu-item index="/tests/list">试卷列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title"><i class="el-icon-message"></i>考试设置</template>
        <el-menu-item-group>
          <template slot="title">考试场次</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/test_items/create">新增考试</el-menu-item>
          <el-menu-item index="/test_items/list">考试列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">学生答卷</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/answers/create">新增答卷</el-menu-item>
          <el-menu-item index="/answers/list">答卷列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title"><i class="el-icon-message"></i>招聘设置</template>
        <el-menu-item-group>
          <template slot="title">部门</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/departments/create">新增部门</el-menu-item>
          <el-menu-item index="/departments/list">部门列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">岗位</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/recruits/create">新增岗位</el-menu-item>
          <el-menu-item index="/recruits/list">岗位列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">简历</template>
          <!-- index路径前面要/ -->
          <el-menu-item index="/vitaes/create">新增简历</el-menu-item>
          <el-menu-item index="/vitaes/list">简历列表</el-menu-item>
        </el-menu-item-group>        
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>林小媛</span>
    </el-header>
    
    <el-main>
      <!-- 用路由的路径来区分路由 -->
      <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container> 
</el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>