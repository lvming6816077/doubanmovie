<template>
  <div class="home-container">
    <div class="left-content">
      <div class="now-play play-section">
          <h2 class="title">正在热映</h2>
          <div class="section-bottom" v-if="nowplayList.length">
            <slider>
              <mitem v-for="item in nowplayList" :itemData="item" :key="item.id" /> 
            </slider>
          </div>
      </div>
      <div class="recent-play play-section">
          <h2 class="title">最近热门电影</h2>
          <div class="section-bottom" v-if="recentplayList.length">
            <slider>
              <div v-for="(item,index) in recentplayList" :key="index" class="recent-item">
                <mitem v-for="(_item,_index) in item" :itemData="_item" :key="_item.id" /> 
              </div>
            </slider>
          </div>
      </div>
    </div>
    <div class="right-content">
      <div class="top-rank">
        <h2 class="title">一周口碑榜</h2>
        <div v-for="(item,index) in rankList" :key="index" class="rank-item">
          {{index+1}}<router-link :to="'/detail?id='+item.id"  class="rank-link">{{item.title}}</router-link>
        </div>
      </div>
      <div class="coopt">
        <h2 class="title">合作联系</h2>
          <ul>
            <li>电影合作邮箱：douban@lvming.com</li>
            <li>电视剧合作邮箱：douban@lvming.com</li>
          </ul>
      </div>
      <div class="fans">
        <h2 class="title">关注作者</h2>
        <div class="fans-list">
          <div class="fans-item">
            <div class="fans-img weibo"></div>
            <div>
              <a href="#">微博</a>
            </div>
          </div>
          <div class="fans-item">
            <div class="fans-img weixin"></div>
            <div>
              <a href="#">微信</a>
            </div>
          </div>
          <div class="fans-item">
            <div class="fans-img zhihu"></div>
            <div>
              <a href="#">知乎</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mitem from '@/components/mitem/mitem.vue'
  import slider from '@/components/slider/slider.vue'
  import {reactive,ref,computed,onMounted} from 'vue'
  
  import service from '@/utils/service'
  import Vuex from 'vuex'
  import configapi from '@/utils/configapi'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'home',// 组件的名称，尽量和文件名一致
    components: {
      mitem,
      slider
    },
    setup(){
      let nowplayList = ref([])
      let recentplayList = ref([])
      let rankList = ref([])

      // 将数据进行分组
      let toArray = (data)=>{
        let n = 10 // 10个一组
        let len = data.length
        let num = len % n == 0 ? len/n : Math.floor(len/n)+1
        let res = []
        for (var i = 0 ; i < num ; i++) {
          res.push(data.slice(i*n,i*n+n))
        }

        return res
      }
      onMounted(async () => {
        let data = await service.get(configapi.nowmovie,{
          start:0,
          count:50,
        })
        nowplayList.value = data.subject_collection_items || [];

        let recentData = await service.get(configapi.recentmovie,{
          start:0,
          count:50,
        })
        recentplayList.value = toArray(recentData.subject_collection_items || []);

        let rankData = await service.get(configapi.toprank,{
          start:0,
          count:10,
        })

        rankList.value = rankData.subject_collection_items || [];

      });
      const store = Vuex.useStore()


      return {
        nowplayList,
        recentplayList,
        rankList
      }
    }
  }
</script>
<style scoped lang="less">
  .home-container {
    display: flex;
  }
  .left-content {
    width: 705px;
  }
  .right-content {
    width: 300px;
    margin-left: 20px;
  }

  .title {
    font-size: 16px;;
    color: #111;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 18px;
  }
  .now-play {
    min-height: 344px;
  }
  .recent-play {
    min-height: 565px;
  }
  .play-section {
    padding: 15px;
  }
  .recent-item {
    display: inline-block;
    width: 675px;
    white-space: normal;
  }
  .top-rank {
    margin-top: 68px;
  }
  .rank-item {
    padding: 7px 0;
    border-bottom: 1px solid #eaeaea;
    font-size: 13px;
    margin-bottom: 5px;
  }
  .rank-link {
    margin-left: 7px;
  }
  .coopt,.fans {
    margin-top: 50px;
  }
  .fans-list {
    display: flex;
  }
  .fans-item {
    text-align: center;
    margin-right: 20px;
  }
  .fans-img {
    width:40px;
    height: 40px;
    background-size: cover;
    margin-bottom: 10px;

    &.weibo {
      background-image: url('./imgs/home_weibo@2x.jpg');
    }
    &.weixin {
      background-image: url('./imgs/home_weixin@2x.jpg');
    }
    &.zhihu {
      border-radius: 3px;
      background-image: url('./imgs/home_zhihu@2x.jpg');
    }
  }
</style>
