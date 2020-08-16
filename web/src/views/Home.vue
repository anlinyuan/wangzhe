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
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
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
        swiperOption: {
        pagination: ".pagination-home",
      },
      newsCats:[],
      heroCats:[]
    }
  },
  methods:{
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
</style>