<template>
    <m-card :icon="icon" :title="title">
      <div class="nav jc-between">
          <!-- 第一个active表示类名，第二个表示变量 如果active等于当前索引值就高亮 -->
        <div class="nav-item" :class="{active:active===i}"
        v-for="(category,i) in categories" :key="i"
        @click="$refs.list.swiper.slideTo(i)">
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <!-- autoHeight: true 自适应高度而不是以最高的那个为高度 -->
        <swiper ref="list" :options="{autoHeight: true}"
      @slide-change="() => active = $refs.list.swiper.realIndex">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <!-- v-for="(category,i) in categories" :key="i" -->
            <!-- v-for循环出来的category（第二个）绑定给:category -->
            <!-- 父组件通过名字items定位到这个slot，取出category数据 -->
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>
<script>
//日期格式化 npm i dayjs 

export default {

    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        categories:{type:Array,required:true}
    },
    data(){
        return {
            //判断是否激活
            active:0,
        }
    }
}
</script>