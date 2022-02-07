<template>
  <div class="nav-wapper">
    <div class="nav-header">
        <div class="nav-logo" @click="$router.push('/')"></div>
        <div class="nav-search">
            <input id="inp" placeholder="搜索电影、电视剧、综艺、影人" v-model.trim="searchText"/>
            <div class="search-btn" @click="goSearch"></div>
        </div>
        <div v-if="user.nickname" class="nickname">
          {{user.nickname}}，<a>退出</a>
        </div>
        <div class="nickname" v-else @click="$router.push('/login')">
          请登陆
        </div>
    </div>
  </div>
</template>

<script>
  import {ref,onMounted,computed, reactive,watchEffect} from 'vue'
  import Vuex from 'vuex'
  import {useRoute} from 'vue-router'
  /**
   * 顶部区域
   */
  export default  {
    name: 'navheader',

    setup(props,context){
      const store = Vuex.useStore()
      const router = useRoute()
      const user = computed(() => store.state.userInfo);
      const searchText = ref('');

      watchEffect(()=>{
        searchText.value = router.query.searchText
      })


      return {
        user,
        searchText
      }
    },
    methods:{
      goSearch(){
        this.$router.push({
          path:'/search',
          query:{
            searchText:this.searchText
          }
        })
      }
    }

  }
</script>

<style scoped lang="less">
  .nav-wapper {
      background-color:#f0f3f5;
      width: 100%;
  }
  .nav-header {
    width: 1040px;
    margin: 0 auto;
    height:75px;
    overflow: hidden;
    background-color:#f0f3f5;
    display: flex;
    position: relative;
  }


  .nav-logo {
      width: 230px;
      height: 54px;
      background-image: url('./imgs/lg_movie@2x.png');
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: 54% 50%;
      margin-top: 11px;
      align-self: flex-start;
      cursor: pointer;
  }

  .nav-search {
      margin-left: -30px;
      height: 32px;
      align-self: center;
      background-image: url('./imgs/nav_mv_bg.png');
      border-radius: 3px;
      background-color: #fff;
      display: flex;
      #inp {
          width: 460px;
          height: 28px;
          outline: none;
          background-color: #fff;
          border: none;
          -webkit-appearance: none;
          margin-top: 2px;
          text-indent: 11px;
      }
  }
  .search-btn {
      width: 35px;
      height: 32px;
      background-image: url('./imgs/nav_mv_bg.png');
      background-position: -40px 35px;
      border-radius: 3px;
      cursor: pointer;
  }
  .nickname {
      position: absolute;
      top:28px;
      right:10px;
      cursor: pointer;
  }
</style>
