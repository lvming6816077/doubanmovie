<template>
  <div class="publish-container">
    <h1 class="page-title">写评论</h1>
    <div class="movie-info" v-if="movieData.title">
      <img class="info-img" :src="movieData.cover_url"/>
      <div class="right-info">
        <div class="title">{{movieData.title}}</div>
        <div class="desc">{{movieData.card_subtitle}} {{movieData.rating.value}}分({{movieData.rating.count}}评价)</div>
      </div>
    </div>
    <div class="score-add">
      <div>给个评价吧：</div>
      <div class="rankstar">
        <div :class="['star-item',item.state]" v-for="(item,index) in starlist.list||[]" :key="index" @mouseenter="changeScore(index)"></div>
      </div>
    </div>
    <div class="text-input">
      <textarea id="commentInput" placeholder="写评论" v-model.trim="content"></textarea>
    </div>
    <div id="submitBtn" @click="submit">提交</div>
  </div>
</template>

<script>
  import {reactive,ref,computed,onMounted} from 'vue'
  
  import service from '@/utils/service'
  import Vuex from 'vuex'
  import moment from 'moment'
  import {useRoute} from 'vue-router'
  import configapi from '@/utils/configapi'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'publish',// 组件的名称，尽量和文件名一致
    components: {
    },
    setup(){

      let movieData = ref({})
      let content = ref('')
      // 评星组件
      let starlist = reactive({
        list:new Array(5).fill({state:'normal'})
      })

      const route = useRoute()
      // 获取url上的id参数
      let id = computed(() => route.query.id);
      // 请求电影基本信息数据
      onMounted(async () => {
        
        let data = await service.get(configapi.detail(id.value),{})
        movieData.value = data
      });
      
      // 评星结果
      const changeScore = (index)=>{
        let list = []
        // 根据鼠标坐在星的index顺序，将之前的星变成实心
        starlist.list.forEach((item,_index)=>{
          if (_index <= index) {
            item.state = 'full' // 实心
          } else {
            item.state = 'normal'// 空心
          }
          list.push({...item})
          
        })
        starlist.list = list
      }
      
      return {
        movieData,
        starlist,
        content,
        changeScore
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      }
    },
    methods:{
      submit(){
        // 根据starlist.list数组中full的项得到星数
        let count = 0
        this.starlist.list.forEach((item)=>{
          if (item.state == 'full') {
            count++
          }
        })
        // 构造评论列表需要的数据
        this.$store.commit('setCommentList',{
          rating:{
            value: count
          },
          user:{// 从用户信息Store中获取头像和昵称
            avatar:this.userInfo.avatar,
            name:this.userInfo.name
          },
          // 发表时间
          create_time:moment().format('YYYY-MM-DD HH:mm:ss'),
          // 内容
          abstract:this.content
        })

        this.$router.push('/detail?id='+this.movieData.id)
      }
    }
  }
</script>
<style scoped lang="less">
  .publish-container {
    
    width: 590px;
    margin: 0 auto;
  }
  .page-title {
    font-size: 14px;
    margin-top: 5px;
    color: #007722;
  }
  .movie-info {
    display: flex;
    width: 590px;
    height: 62px;
    margin: 0 auto;
    margin-top: 10px;
    background-color: #f8f8f8;
    overflow: hidden;
  }
  .info-img {
    width: 48px;
    height: 62px;
    margin-right: 15px;
  }
  .right-info {
    padding: 10px 40px 0 0;
    margin-bottom: 5px;
    
    .title {
      color: #37a;
      font-size: 14px;
      line-height: 1.4;
    }
    .desc {
      margin-top: 2px;
      color: #999;
    }
  }
  .rankstar {
    display: flex;
    align-items: center;
  }
  .star-item {
    width: 16px;
    height: 16px;
    background-size: cover;
    cursor: pointer;
    &.normal {
      background-image: url('./imgs/star.png');
    }
    &.full {
      background-image: url('./imgs/star-fill.png');
    }
  }
  .score-add {
    margin-top: 30px;
    display: flex;
  }
  .text-input {
    margin-top: 20px;
  }
  #commentInput {
    outline: none;
    border: none;
    border-top: 1px solid #ddd;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    padding: 16px 10px;
    width: 100%;
    min-height: 400px;
    overflow: auto;
    font-size: 14px;
  }
  #submitBtn {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #3db04d;
    width: 28px;
    cursor: pointer;
  }

</style>
