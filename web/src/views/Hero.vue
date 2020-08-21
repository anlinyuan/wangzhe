<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" alt="">
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v=>v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-2">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">
            皮肤:2 &gt;
          </router-link>
        </div>
      </div>
    </div>

    <div class="pt-3 pb-1 border-bottom">
      <div class="nav pb-1 jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" :to="`/heroes/${id}`">英雄初识</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">进阶攻略</router-link>
        </div>
      </div>
    </div>

    <div class="d-flex mx-2 my-3">
      <div class="border-btn flex-1 px-4 py-3 d-flex jc-center mr-1">
          <i class="iconfont icon-cc-menu-circle text-primary fs-xxl text-weight"></i>
          <span class="pl-2">英雄介绍视频</span>
      </div>
      <div class="border-btn flex-1 px-4 py-3 mx-1 fs-md d-flex jc-center">
        <i class="iconfont icon-cc-menu-circle text-primary fs-xxl text-weight"></i>
        <span class="pl-2">一图识英雄</span>       
      </div>
    </div>
    
    <div class="nav-photo">
      <ul style="display:flex">
        <li v-for="(skillPhoto,index) in model.skills" :key="index" 
        @click="flag=index" class="flex-1 mx-3" >
          <img :src="skillPhoto.icon" alt="" class="w-100 nav-photo-item" :class="{active:flag===index}">
        </li>
      </ul>
      <ul>
        <li>
          <div>
            <span>{{model.skills[flag].name}}</span>
            <span>{{model.skills[flag].delay}},{{model.skills[flag].cost}}</span>
          </div>
          <p>{{model.skills[flag].description}}</p>
          <p></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    id:{required : true}
  },
  data(){
    return {
      model:null,
      flag:0,
    }
  },
  methods:{
    async fetch(){
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created(){
    this.fetch()
  }
}
</script>
<style lang="scss">
.page-hero{
  .top{
    height: 50vw;
    background:#fff no-repeat top center;
    background-size:auto 100%;
  }
  .info{
    //背景透明度渐变
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores{
      .badge{
        display:inline-block;
        margin:0 0.25rem;
        width:1rem;
        height:1rem;
        line-height: 0.9rem;
        text-align:center;
        border-radius:50%;
        font-size:0.7rem;
        border:1px solid rgba(255,255,255,0.2)
      }
    }
  }
  .nav-photo{
    .nav-photo-item{
      border:2px solid rgba(255,255,255,0);
      border-radius:50%
    }
    .active{
      border:2px solid #db9e3f;
      border-radius:50%
    }
    ul{
      padding:0;
      list-style: none
    }
  }
}
</style>