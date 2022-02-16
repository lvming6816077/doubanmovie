<template>
  <div class="movie-info"  v-if="detailData.id">
    <h1 class="title">{{detailData.title}} {{detailData.original_title}}<span class="year">（{{detailData.year}}）</span></h1>
    <div class="desc-content" >
      <img class="mv-img" :src="detailData.cover_url" />
      <div class="mv-desc">
        <p>导演: <a href="#" v-if="detailData.directors && detailData.directors.length"> {{detailData.directors[0].name}}</a></p>
        <p>主演: <a href="#" v-for="(item,index) in actors.short" :key="index">{{item.name}} <template v-if="index != actors.short.length -1">/</template> </a><span @click="expand" class="more-actors" v-if="actors.isShowMore">更多..</span></p>
        <p>类型: <span class="it">{{detailData.genres.join('/')}}</span></p>
        <p>制片国家/地区: <span class="it">{{detailData.countries.join('/')}}</span></p>
        <p>语言: <span class="it">{{detailData.languages.join('/')}}</span></p>
        <p>上映日期: <span class="it">{{detailData.pubdate.join('/')}}</span></p>
        <p>片长: <span class="it">{{detailData.durations.join('/')}}</span></p>
        <p>又名: <span class="it">{{detailData.aka.join('/')}}</span></p>
      </div>
      <div class="mv-rank">
        <div class="rank-title">豆瓣评分</div>
        <div class="rank-score">
          <div class="score"><strong class="num">{{detailData.rating.value}}</strong></div>
          <div class="score-star">
            <rankstar :score="detailData.rating.value" class="rankstar"/>
            <div class="score-comment"><a href="#">{{detailData.rating.count}}</a>人评价</div>
          </div>
        </div>
        <div class="score-rate">
          <div v-for="(item) in rate.list" class="rate-item" :key="item.index">
            <span>{{item.index}} 星</span>
            <span class="wline" :style="{width:item.width+'px'}"></span>
            <span class="percent">{{item.count.toFixed(1)}} %</span>
          </div>
        </div>
        <div class="better-content">
          <div v-for="(item,index) in rate.betterList" class="better-item">好于 <a href="#">{{(item.rank*100).toFixed(1)+'%'}} {{item.type}}</a></div>
        </div>
      </div>
    </div>
    <div class="opera-box">
      <div>请评分：</div>
      <div>
        <img src="https://img3.doubanio.com/f/shire/5bbf02b7b5ec12b23e214a580b6f9e481108488c/pics/add-review.gif">&nbsp;
        <a href="javascript:void(0)" class="comment-link" @click="goPublish">写影评</a>
      </div>
    </div>
    <div class="intro">
      <h2 class="intro-title">
        {{detailData.title}}的剧情简介· · · · · ·
      </h2>
      <div style="text-indent:20px;">
        {{detailData.intro}}
      </div>
    </div>
  </div>
</template>

<script>
  import {ref,onMounted, reactive,computed} from 'vue'
  import service from '@/utils/service'
  import rankstar from '@/components/rankstar/rankstar.vue'
  import configapi from '@/utils/configapi'
  import Vuex from 'vuex'
  import {useRoute} from 'vue-router'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'movieinfo',// 组件的名称，尽量和文件名一致
    components: {
      rankstar 
    },
    setup(){
      const store = Vuex.useStore()
      let detailData = ref({})
      let actors = reactive({
        orgin:[],
        short:[],
        isShowMore: true
      })
      let rate = reactive({
        list:[],
        betterList:[]
      })
      const route = useRoute()
      let id = computed(() => route.query.id);
      onMounted(async () => {
        
        detailData.value = await service.get(configapi.detail(id.value),{})

        store.commit('setTitle',detailData.value.title)

        actors.orgin = detailData.value.actors||[]
        actors.short = actors.orgin.slice(0,3)
        actors.isShowMore = actors.orgin.length > 3


        let rateData = await service.get(configapi.rate(id.value),{})

        rate.list = dealRateData(rateData)
        rate.betterList = rateData.type_ranks||[]

      });

      const dealRateData = (rateData)=>{
        let maxwidth = 70
        let list = []

        for (let i = 0 ; i < rateData.stats.length ; i++) {
          let r = rateData.stats[i].toFixed(3)*100
          list.push({
            index: i+1,
            count:r,
            width: r*maxwidth/100
          })
        }
        return list.reverse()
      }

      const expand = ()=>{
        actors.short = actors.orgin
        actors.isShowMore = false
      }

      
      
      return {
        detailData,
        actors,
        expand,
        rate
      }
    },
    methods:{
      goPublish(){
        if (this.$store.state.userInfo.nickname) {
          this.$router.push('/publish?id='+this.detailData.id)
        } else {
          this.$router.push('/login')
        }
      }
    }
  }
</script>
<style scoped lang="less">

  .title {
    font-size: 26px;
    font-weight: bold;
    color: #494949;
    .year {
      color: #888;
    }
  }
  .desc-content {
    display: flex;
    margin-top: 13px;
  }
  .mv-img {
    width: 135px;
    height: 200px;
  }
  .mv-desc {
    font-size: 13px;
    margin-left:15px;
    max-width: 333px;
    margin-right: 15px;
    p {
      margin: 2px 0;
      color: #666;
      .it {
        color: #111;
      }
    }
  }
  .more-actors {
    color: #aaa;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: #aaa;
    }
  }
  .mv-rank {
    width: 155px;
    margin: 2px 0 0 0;
    padding: 0 0 0 15px;
    border-left: 1px solid #eaeaea;
    color: #9b9b9b;
    
  }
  .rank-score {
    margin-top: 5px;
    display: flex;
    .num {
      color: #494949;
      padding: 0;
      font-size: 28px;
    }
  }
  .score-star {
    margin-left: 10px;
    padding-top: 5px;
    .rankstar {
      transform: scale(1.3);
      transform-origin: 0 0;
    }
  }
  .score-comment {
    margin-top: 7px;
  }
  .rate-item {
    display: flex;
  }
  .wline {
    height: 10px;
    margin: 1px 4px;
    background-color: #ffd596;
    falign-self: center;
  }
  .better-content {
    position: relative;
    padding: 15px 0;
    border-top: 1px solid #eaeaea;
    color: #9b9b9b;
    margin-top: 20px;
  }
  .better-item {
    margin-top: 1px;
  }
  .intro-title {
    margin: 24px 0 12px 0;
    font-size: 16px;
    color: #007722;
  }
  .comment-link {
    font-size: 13px;
  }
</style>
