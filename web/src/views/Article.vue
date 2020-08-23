<template>
<!-- v-if 因为model一开始为null，如果没有v-if进入页面就会报错 -->
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <router-link tag="div" :to="`/`"
      class="iconfont icon-Active text-blue "></router-link>
      <strong class="flex-1 text-blue pl-2 text-ellipsis">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">2019-06-19</div>
    </div>

  <!-- 内容 -->

  <div v-html="model.body" class="px-2 article-body fs-lg"></div>

  <!-- 相关资讯 -->
  <div class="px-3 py-3">
    <div class="d-flex ai-center mb-3">
      <i class="iconfont icon-xiangguanlianjie"></i>
      <strong class="text-blue fs-lg ml-1 ">相关资讯</strong>
    </div>
    <div>
      <router-link tag="div" class="py-1 d-flex"
      v-for="item in model.related"
      :key="item._id"
      :to="`/articles/${item._id}`">
      <div class="w-100  text-ellipsis flex-1"> {{item.title}}</div>
      <div class="text-grey fs-xs">2019-06-19</div>
      </router-link>
    </div>
  </div>

  </div>
</template>
<script>
export default {
  props:{
    id:{required:true}
  },
  data(){
    return {
      model:null
    }
  },
  //点击相关资讯进入的是同一个组件，created已经存在，不会去更新数据
  //用watch监听变化
  watch:{
    id:'fetch',
    // id(){
    //   this.fetch()
    // }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`articles/${this.id}`)
      this.model=res.data
    }
  },
  created(){
    this.fetch()
  }
}
</script>
<style lang="scss">
  .page-article{
    .icon-Active{
      font-size: 1.7rem
    }
    .article-body{
      img{
        max-width: 100%;
        height: auto;
      }
      iframe{
        width:100%;
        height: auto;
      }
    }
  }
</style>