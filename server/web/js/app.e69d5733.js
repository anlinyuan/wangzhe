(function(t){function e(e){for(var a,r,c=e[0],l=e[1],o=e[2],u=0,p=[];u<c.length;u++)r=c[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);d&&d(e);while(p.length)p.shift()();return n.push.apply(n,o||[]),s()}function s(){for(var t,e=0;e<n.length;e++){for(var s=n[e],a=!0,r=1;r<s.length;r++){var l=s[r];0!==i[l]&&(a=!1)}a&&(n.splice(e--,1),t=c(c.s=s[0]))}return t}var a={},i={app:0},n=[];function r(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"a3c5e481"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.e=function(t){var e=[],s=i[t];if(0!==s)if(s)e.push(s[2]);else{var a=new Promise((function(e,a){s=i[t]=[e,a]}));e.push(s[2]=a);var n,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=r(t);var o=new Error;n=function(e){l.onerror=l.onload=null,clearTimeout(u);var s=i[t];if(0!==s){if(s){var a=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;o.message="Loading chunk "+t+" failed.\n("+a+": "+n+")",o.name="ChunkLoadError",o.type=a,o.request=n,s[1](o)}i[t]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:l})}),12e4);l.onerror=l.onload=n,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,s){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(s,a,function(e){return t[e]}.bind(null,a));return s},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var d=o;n.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"0972":function(t,e,s){},1399:function(t,e,s){"use strict";var a=s("ef4a"),i=s.n(a);i.a},"21bb":function(t,e,s){"use strict";var a=s("2dad"),i=s.n(a);i.a},"23e5":function(t,e,s){t.exports=s.p+"img/2.435cedc1.jpeg"},"2dad":function(t,e,s){},3836:function(t,e,s){t.exports=s.p+"img/3.b2a7065b.jpeg"},"49c5":function(t,e,s){},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},n=[],r=s("2877"),c={},l=Object(r["a"])(c,i,n,!1,null,null,null),o=l.exports,u=(s("be35"),s("78a7"),s("d3b7"),s("8c4f")),d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("swiper",{attrs:{options:t.swiperOption}},[a("swiper-slide",[a("img",{staticClass:"w-100",attrs:{src:s("bf2d"),alt:""}})]),a("swiper-slide",[a("img",{staticClass:"w-100",attrs:{src:s("23e5"),alt:""}})]),a("swiper-slide",[a("img",{staticClass:"w-100",attrs:{src:s("3836"),alt:""}})]),a("div",{staticClass:"swiper-pagination pagination-home text-right px-3 pb-1",attrs:{slot:"pagination"},slot:"pagination"})],1),a("div",{staticClass:"nav-icons bg-white mt-3 text-center pt-3 text-dark-1"},[a("div",{staticClass:"d-flex flex-wrap"},t._l(t.navItems,(function(e,s){return a("div",{key:s,staticClass:"nav-item mb-3"},[a("i",{staticClass:"sprite sprite-item",class:""+e.icon}),a("div",{staticClass:"py-2"},[t._v(t._s(e.name))])])})),0),t.flag?a("div",{staticClass:"d-flex flex-wrap"},t._l(t.MoreNavItems,(function(e,s){return a("div",{key:s,staticClass:"nav-item mb-3"},[a("i",{staticClass:"sprite sprite-item",class:""+e.icon}),a("div",{staticClass:"py-2"},[t._v(t._s(e.name))])])})),0):t._e(),a("div",{staticClass:"bg-light py-2 fs-sm",on:{click:t.open}},[a("i",{staticClass:"sprite sprite-arrow mr-1",class:t.objectDown}),a("span",[t._v(t._s(t.openFlag))])])]),a("m-list-card",{attrs:{icon:"cc-menu-circle",title:"新闻资讯",categories:t.newsCats},scopedSlots:t._u([{key:"items",fn:function(e){var s=e.category;return t._l(s.newsList,(function(e,s){return a("routerLink",{key:s,staticClass:"py-3 mx-2 fs-lg d-flex",attrs:{tag:"div",to:"/articles/"+e._id}},[a("span",{staticClass:"border border-radius text-blue mr-2"},[t._v(t._s(e.categoryName))]),a("span",{staticClass:"flex-1 text-dark-1 text-ellipsis pr-2"},[t._v(t._s(e.title))]),a("span",{staticClass:"text-grey-1 fs-sm"},[t._v(t._s(t._f("date")(e.updatedAt)))])])}))}}])}),a("m-list-card",{attrs:{icon:"card-hero",title:"英雄列表",categories:t.heroCats},scopedSlots:t._u([{key:"items",fn:function(e){var s=e.category;return[a("div",{staticClass:"d-flex flex-wrap",staticStyle:{margin:"0 -0.5rem"}},t._l(s.heroList,(function(e,s){return a("routerLink",{key:s,staticClass:"p-2 text-center",staticStyle:{width:"20%"},attrs:{tag:"div",to:"/heroes/"+e._id}},[a("img",{staticClass:"w-100",attrs:{src:e.avatar,alt:""}}),a("div",[t._v(t._s(e.name))])])})),1)]}}])}),a("m-card",{attrs:{icon:"cc-menu-circle",title:"精彩视频"}})],1)},p=[],f=(s("96cf"),s("1da1")),v=s("5a0c"),m=s.n(v),g={filters:{date:function(t){return m()(t).format("MM/DD")}},data:function(){return{openFlag:"展开",flag:!1,swiperOption:{pagination:{el:".pagination-home"},observer:!0,observeParents:!0,loop:!0,autoplay:{delay:2e3,disableOnInteraction:!1}},newsCats:[],heroCats:[],navItems:[{name:"爆料站",icon:"sprite-news"},{name:"故事站",icon:"sprite-book"},{name:"周边商城",icon:"sprite-store"},{name:"体验服",icon:"sprite-tyf"}],MoreNavItems:[{name:"新人专区",icon:"sprite-xrzq"},{name:"荣耀·传承",icon:"sprite-rych"},{name:"王者营地",icon:"sprite-wzyd"},{name:"公众号",icon:"sprite-gzh"}]}},computed:{objectDown:function(){return{down:!this.flag}}},methods:{open:function(){this.flag=!this.flag,this.openFlag="展开"==this.openFlag?"收起":"展开"},fetchNewsCats:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("news/list");case 2:s=e.sent,t.newsCats=s.data;case 4:case"end":return e.stop()}}),e)})))()},fetchHeroCats:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("heroes/list");case 2:s=e.sent,t.heroCats=s.data;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.fetchNewsCats(),this.fetchHeroCats()}},_=g,b=(s("21bb"),Object(r["a"])(_,d,p,!1,null,null,null)),h=b.exports,C=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),s("div",{staticClass:"bg-primary pt-3 pb-2"},[s("div",{staticClass:"nav nav-inverse pb-1 jc-around"},[s("div",{staticClass:"nav-item active"},[s("router-link",{staticClass:"nav-link",attrs:{tag:"div",to:"/"}},[t._v("首页")])],1),s("div",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{tag:"div",to:"/"}},[t._v("攻略中心")])],1),s("div",{staticClass:"nav-item"},[s("router-link",{staticClass:"nav-link",attrs:{tag:"div",to:"/"}},[t._v("赛事中心")])],1)])]),s("router-view")],1)},x=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topbar bg-black py-2 px-3 d-flex ai-center"},[a("img",{attrs:{src:s("cf05"),height:"30",alt:""}}),a("div",{staticClass:"px-2 flex-1"},[a("div",{staticClass:"text-white"},[t._v("王者荣耀")]),a("div",{staticClass:"text-grey-1 fs-xxs"},[t._v("团队成就更多")])]),a("button",{staticClass:"btn bg-primary",attrs:{type:"button"}},[t._v("立即下载")])])}],y=(s("a006"),{}),w=Object(r["a"])(y,C,x,!1,null,null,null),k=w.exports,j=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.model?s("div",{staticClass:"page-article"},[s("div",{staticClass:"d-flex py-3 px-2 border-bottom"},[s("router-link",{staticClass:"iconfont icon-Active text-blue ",attrs:{tag:"div",to:"/"}}),s("strong",{staticClass:"flex-1 text-blue pl-2 text-ellipsis"},[t._v(" "+t._s(t.model.title)+" ")]),s("div",{staticClass:"text-grey fs-xs"},[t._v("2019-06-19")])],1),s("div",{staticClass:"px-2 article-body fs-lg",domProps:{innerHTML:t._s(t.model.body)}}),s("div",{staticClass:"px-3 py-3"},[t._m(0),s("div",t._l(t.model.related,(function(e){return s("router-link",{key:e._id,staticClass:"py-1 d-flex",attrs:{tag:"div",to:"/articles/"+e._id}},[s("div",{staticClass:"w-100  text-ellipsis flex-1"},[t._v(" "+t._s(e.title))]),s("div",{staticClass:"text-grey fs-xs"},[t._v("2019-06-19")])])})),1)])]):t._e()},O=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"d-flex ai-center mb-3"},[s("i",{staticClass:"iconfont icon-xiangguanlianjie"}),s("strong",{staticClass:"text-blue fs-lg ml-1 "},[t._v("相关资讯")])])}],$={props:{id:{required:!0}},data:function(){return{model:null}},watch:{id:"fetch"},methods:{fetch:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("articles/".concat(t.id));case 2:s=e.sent,t.model=s.data;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.fetch()}},E=$,S=(s("1399"),Object(r["a"])(E,j,O,!1,null,null,null)),P=S.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.model?a("div",{staticClass:"page-hero"},[a("div",{staticClass:"topbar bg-black py-2 px-3 d-flex ai-center text-white"},[a("img",{attrs:{src:s("cf05"),height:"30",alt:""}}),t._m(0),a("router-link",{attrs:{to:"/",tag:"div"}},[t._v("更多英雄 >")])],1),a("div",{staticClass:"top",style:{"background-image":"url("+t.model.banner+")"}},[a("div",{staticClass:"info text-white p-3 d-flex flex-column h-100 jc-end"},[a("div",{staticClass:"fs-sm"},[t._v(t._s(t.model.title))]),a("h2",{staticClass:"my-2"},[t._v(t._s(t.model.name))]),a("div",{staticClass:"fs-sm"},[t._v(t._s(t.model.categories.map((function(t){return t.name})).join("/")))]),a("div",{staticClass:"d-flex jc-between pt-2"},[t.model.scores?a("div",{staticClass:"scores d-flex ai-center"},[a("span",[t._v("难度")]),a("span",{staticClass:"badge bg-primary"},[t._v(t._s(t.model.scores.difficult))]),a("span",[t._v("技能")]),a("span",{staticClass:"badge bg-blue-2"},[t._v(t._s(t.model.scores.skills))]),a("span",[t._v("攻击")]),a("span",{staticClass:"badge bg-danger"},[t._v(t._s(t.model.scores.attack))]),a("span",[t._v("生存")]),a("span",{staticClass:"badge bg-dark"},[t._v(t._s(t.model.scores.survive))])]):t._e(),a("router-link",{staticClass:"text-grey fs-sm",attrs:{to:"/",tag:"span"}},[t._v(" 皮肤:2 > ")])],1)])]),a("div",{staticClass:"pt-3 pb-1 border-bottom bg-white"},[a("div",{staticClass:"nav pb-1 jc-around"},[a("div",{staticClass:"nav-item active"},[a("router-link",{staticClass:"nav-link",attrs:{tag:"div",to:"/heroes/"+t.id}},[t._v("英雄初识")])],1),a("div",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{tag:"div",to:"/"}},[t._v("进阶攻略")])],1)])]),t._m(1),a("div",{staticClass:"nav-photo bg-white"},[a("ul",{staticClass:"d-flex",staticStyle:{margin:"0"}},t._l(t.model.skills,(function(e,s){return a("li",{key:s,staticClass:"flex-1 mx-3",on:{click:function(e){t.flag=s}}},[a("img",{staticClass:"w-100 nav-photo-item",class:{active:t.flag===s},attrs:{src:e.icon,alt:""}})])})),0),a("ul",{staticClass:"mx-3 my-4"},[a("li",[a("div",{staticClass:"mb-2"},[a("span",{staticClass:"text-weight fs-xl"},[t._v(t._s(t.model.skills[t.flag].name))]),a("span",{staticClass:"px-4 text-grey-2"},[t._v("(冷却值："+t._s(t.model.skills[t.flag].delay)+",消耗："+t._s(t.model.skills[t.flag].cost)+"）")])]),a("p",{staticClass:"pb-2"},[t._v(t._s(t.model.skills[t.flag].description))]),a("p")])])]),a("m-card",{attrs:{icon:"cc-menu-circle",title:"出装推荐"}},[a("div",[a("p",{staticClass:"m-0 fs-lg"},[t._v("顺风出装")]),a("div",{staticClass:"d-flex border-bottom mb-2"},t._l(t.model.items1,(function(e,s){return a("div",{key:s,staticClass:"jc-between flex-1 text-ellipsis px-2 pt-1 "},[a("img",{staticClass:"w-100 hero-item",attrs:{src:e.icon,alt:""}}),a("p",{staticClass:"text-center m-0 fs-xs pb-2"},[t._v(t._s(e.name))])])})),0)]),a("div",[a("p",{staticClass:"m-0 fs-lg"},[t._v("逆风出装")]),a("div",{staticClass:"d-flex "},t._l(t.model.items2,(function(e,s){return a("div",{key:s,staticClass:"jc-between flex-1 text-ellipsis px-2 pt-1"},[a("img",{staticClass:"w-100 hero-item",attrs:{src:e.icon,alt:""}}),a("p",{staticClass:"text-center m-0 fs-xs"},[t._v(t._s(e.name))])])})),0)])]),a("m-card",{attrs:{icon:"cc-menu-circle",title:"使用技巧"}},[t._v(t._s(this.model.usageTips))]),a("m-card",{attrs:{icon:"cc-menu-circle",title:"对抗技巧"}},[t._v(t._s(this.model.battleTipes))]),a("m-card",{attrs:{icon:"cc-menu-circle",title:"团战思路"}},[t._v(t._s(this.model.teamTipes))]),a("m-card",{staticClass:"partners",attrs:{icon:"cc-menu-circle",title:"英雄关系"}},[a("p",{staticClass:"mt-0 mb-2 fs-lg"},[t._v("最佳搭档")]),a("div",{staticClass:"border-bottom"},t._l(t.model.partners,(function(e,s){return a("div",{key:s,staticClass:"d-flex mb-4"},[a("img",{staticClass:"photo",attrs:{src:e.hero.avatar,alt:""}}),a("p",{staticClass:"m-0 pl-3"},[t._v(t._s(e.description))])])})),0)])],1):t._e()},L=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"px-2 flex-1"},[s("span",{staticClass:"text-white"},[t._v("王者荣耀")]),s("span",{staticClass:"ml-2"},[t._v("攻略站")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bg-white"},[s("div",{staticClass:"d-flex px-2 py-4 jc-around"},[s("div",{staticClass:"border-btn flex-1 px-4 py-3 d-flex jc-center "},[s("i",{staticClass:"iconfont icon-cc-menu-circle text-primary fs-xxl text-weight"}),s("span",{staticClass:"pl-2"},[t._v("英雄介绍视频")])]),s("div",{staticClass:"border-btn flex-1 px-4 py-3 mx-1 fs-md d-flex jc-center"},[s("i",{staticClass:"iconfont icon-cc-menu-circle text-primary fs-xxl text-weight"}),s("span",{staticClass:"pl-2"},[t._v("一图识英雄")])])])])}],T={props:{id:{required:!0}},data:function(){return{model:null,flag:0}},methods:{fetch:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("heroes/".concat(t.id));case 2:s=e.sent,t.model=s.data;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.fetch()}},q=T,M=(s("6e94"),Object(r["a"])(q,R,L,!1,null,null,null)),A=M.exports;a["a"].use(u["a"]);var I=[{path:"/",component:k,children:[{path:"/",name:"home",component:h},{path:"/articles/:id",name:"article",component:P,props:!0}]},{path:"/heroes/:id",name:"hero",component:A,props:!0},{path:"/about",name:"About",component:function(){return s.e("about").then(s.bind(null,"f820"))}}],N=new u["a"]({routes:I}),D=N,F=s("7212"),H=s.n(F),U=(s("dfa4"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card bg-white p-3 mt-3"},[s("div",{staticClass:"card-header d-flex ai-center pb-3"},[s("i",{staticClass:"iconfont",class:"icon-"+t.icon}),s("div",{staticClass:"fs-xl flex-1 px-2"},[t._v(t._s(t.title))]),s("i",{staticClass:"iconfont icon-menu"})]),s("div",{staticClass:"card-body pt-3"},[t._t("default")],2)])}),z=[],J={props:{title:{type:String,required:!0},icon:{type:String,required:!0}}},V=J,B=(s("e60d"),Object(r["a"])(V,U,z,!1,null,null,null)),G=B.exports,K=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("m-card",{attrs:{icon:t.icon,title:t.title}},[s("div",{staticClass:"nav jc-between"},t._l(t.categories,(function(e,a){return s("div",{key:a,staticClass:"nav-item",class:{active:t.active===a},on:{click:function(e){return t.$refs.list.swiper.slideTo(a)}}},[s("div",{staticClass:"nav-link"},[t._v(t._s(e.name))])])})),0),s("div",{staticClass:"pt-3"},[s("swiper",{ref:"list",attrs:{options:{autoHeight:!0}},on:{"slide-change":function(){return t.active=t.$refs.list.swiper.realIndex}}},t._l(t.categories,(function(e,a){return s("swiper-slide",{key:a},[t._t("items",null,{category:e})],2)})),1)],1)])},Q=[],W={props:{title:{type:String,required:!0},icon:{type:String,required:!0},categories:{type:Array,required:!0}},data:function(){return{active:0}}},X=W,Y=Object(r["a"])(X,K,Q,!1,null,null,null),Z=Y.exports,tt=s("bc3a"),et=s.n(tt);a["a"].config.productionTip=!1,a["a"].use(H.a),a["a"].component("m-card",G),a["a"].component("m-list-card",Z),a["a"].prototype.$http=et.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_API_URL||"/web/api"}),new a["a"]({router:D,render:function(t){return t(o)}}).$mount("#app")},"6e94":function(t,e,s){"use strict";var a=s("49c5"),i=s.n(a);i.a},"78a7":function(t,e,s){},a006:function(t,e,s){"use strict";var a=s("0972"),i=s.n(a);i.a},be35:function(t,e,s){},bf2d:function(t,e,s){t.exports=s.p+"img/1.b6d97e76.jpeg"},cf05:function(t,e,s){t.exports=s.p+"img/logo.b3b3bca8.png"},e60d:function(t,e,s){"use strict";var a=s("e9ec"),i=s.n(a);i.a},e9ec:function(t,e,s){},ef4a:function(t,e,s){}});
//# sourceMappingURL=app.e69d5733.js.map