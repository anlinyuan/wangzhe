<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/image/1.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/2.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/3.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
  <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <!-- css图片精灵优化 -->
        <div class="nav-item mb-3" v-for="(items,index) in navItems" :key="index">
          <i class="sprite sprite-item" :class="`${items.icon}`"></i>
          <div class="py-2">{{items.name}}</div>
        </div>
      </div>

      <div class="d-flex flex-wrap" v-if="flag">
        <div class="nav-item mb-3" v-for="(items,index) in MoreNavItems" :key="index">
          <i class="sprite sprite-item" :class="`${items.icon}`"></i>
          <div class="py-2">{{items.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm" @click="open"> 
        <i class="sprite sprite-arrow mr-1" :class="objectDown"></i>
        <span>{{openFlag}}</span>
      </div>
    </div>
  <!-- end of nav icons -->

    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <!-- 取到子组件的值，名为items的slot，上面绑定的数据category -->
      <template #items="{category}"> 
        <!-- routerLink默认为a标签，用tag换成div标签 -->
        <routerLink 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-3 mx-2 fs-lg d-flex" 
        v-for="(news,i) in category.newsList" :key="i">
          <span class="border border-radius text-blue mr-2">{{news.categoryName}}</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.updatedAt | date}}</span>
        </routerLink>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- 取到子组件的值，名为items的slot，上面绑定的数据category -->
      <template #items="{category}"> 
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <routerLink tag="div" class="p-2 text-center" 
          style="width:20%;"
          :to="`/heroes/${hero._id}`"
          v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100" alt="">
            <div>{{hero.name}}</div>
          </routerLink>
        </div> 
      </template>
    </m-list-card>

    <m-card icon="cc-menu-circle" title="精彩视频"></m-card>

  <!-- end of m-list-card -->

  </div>
</template>

<script>
//日期格式化 npm i dayjs 
import dayjs from "dayjs" 
export default {
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return{
      openFlag:"展开",
      flag:false,
      swiperOption: {
        pagination: {
          el:".pagination-home"
          },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:true,//修改swiper的父元素时，自动初始化swiper 
        loop:true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        }
      },
      newsCats:[],
      heroCats:[],
      navItems:[{
          name:"爆料站",
          icon:"sprite-news",
        },{
          name:"故事站",
          icon:"sprite-book",
        },{
          name:"周边商城",
          icon:"sprite-store",
        },
        {
          name:"体验服",
          icon:"sprite-tyf",
        }],
      MoreNavItems:[{
          name:"新人专区",
          icon:"sprite-xrzq",
        },{
          name:"荣耀·传承",
          icon:"sprite-rych",
        },{
          name:"王者营地",
          icon:"sprite-wzyd",
        },
        {
          name:"公众号",
          icon:"sprite-gzh",
        }],
    }
  },
  computed:{
    objectDown:function(){
      return {
        down:!this.flag,
      }
    }
  },
  methods:{
    open(){
      this.flag = this.flag?false:true;
      this.openFlag = this.openFlag=="展开"?"收起":"展开";
      
    },
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created(){
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>
<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    //一行四个，最后一个不要边框
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
.sprite-news {
  background-position: 63.546% 15.517%;
}
.sprite-book{
  background-position: 90.483% 15.614%;
}
.sprite-store{
  background-position: 36.746% 0.924%;
}
.sprite-tyf{
  background-position: 10.408% 15.517%;
}
.sprite-xrzq{
  background-position: 36.467% 15.287%;
}
.sprite-rych{
  background-position: 10.408% 15.517%;
}
.sprite-wzyd{
  background-position: 63.3% 0.927%;
}
.sprite-gzh{
  background-position: 0 96.207%;
}
</style>