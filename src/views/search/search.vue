<template>
  <div class="search-container">
    <h1 class="page-title">搜索：{{$route.query.searchText}}</h1>
    <div class="search-result">
      <div v-if="searchList.list.length == 0">暂无搜索数据</div>
      <div class="item-content" v-for="item in searchList.list">
        <img :src="item.target.cover_url" class="item-img" />
        <div class="left-content">
          <router-link :to="'/detail?id='+item.target.id"  class="title">{{item.target.title}}</router-link>
          <div class="rank-content">
            <rankstar :score="item.target.rating.value" class="rank-star"></rankstar>
            <div class="score-text">{{item.target.rating.value}}</div>
          </div>
          <div class="place">{{item.target.card_subtitle}}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import {reactive,ref,computed,onMounted,watch} from 'vue'
  
  import service from '@/utils/service'
  import Vuex from 'vuex'
  import {useRoute} from 'vue-router'
  import moment from 'moment'
  import rankstar from '@/components/rankstar/rankstar.vue'
  import configapi from '@/utils/configapi'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'search',// 组件的名称，尽量和文件名一致
    components:{
      rankstar
    },
    setup(){

      let movieData = ref({})
      let content = ref('')
      let searchList = reactive({
        list:[]
      })
      const route = useRoute()

      let searchText = computed(() => route.query.searchText);

      watch(
        () => route.query.searchText,
        async (v) => {
            let data = await service.get(configapi.search,{
            start:0,
            count:20,
            q:v
          })

          searchList.list = data.items.filter((item)=>{
            return item.target_type == 'movie'
          })
        },
        {
          deep: false, // 是否采用深度监听
          immediate: true // 首次加载是否执行
        }
      )


      onMounted(async ()=>{

        
      })
      

      const changeScore = (index)=>{
        let list = []
        
        starlist.list.forEach((item,_index)=>{
          if (_index <= index) {
            item.state = 'full'
          } else {
            item.state = 'normal'
          }
          list.push({...item})
          
        })
        starlist.list = list
      }
      

      return {
        searchList,
        changeScore
      }
    },
    computed: {

    },
    methods:{

    }
  }
</script>
<style scoped lang="less">
  .search-container {
    
    // width: 790px;
    margin: 0 auto;
  }
  .page-title {
    margin-top: 25px;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 30px;
    padding: 0;
    color: #494949;
  }
  .item-content {
    display: flex;
    padding: 10px;;
    .item-img {
      width: 48px;
      height: 69px;
      margin-right: 15px;
    }
    .title {
      font-size: 14px;
    }
    .rank-content {
      display: flex;
    }
    .rank-star {
      margin-top: 3px;
      margin-right: 3px;
    }
    .score-text {
      color: #e09015;
    }
  }
  

</style>
