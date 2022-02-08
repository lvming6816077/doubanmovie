<template>
  <div class="movie-comments" v-if="detailData.list.length">
    <h2 class="intro-title">
      {{title}}的影评· · · · ·
    </h2>
    <div class="scroll-wrap">
      <div class="comment-item" v-for="item in detailData.list||[]">
        <div class="top-content">
          <img class="avatar" :src="item.user.avatar"/>
          <span class="nickname">{{item.user.name}}</span>
          <div v-if="item.rating && item.rating.value" class="rankstar"><span class="rank-text">看过</span><rankstar :score="item.rating.value" /></div>
          <div class="time">{{item.create_time}}</div>
        </div>
        <div class="content three-line">{{item.abstract}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref,onMounted,computed, reactive} from 'vue'
  import service from '@/utils/service'
  import rankstar from '@/components/rankstar/rankstar.vue'
  import configapi from '@/utils/configapi'
  import Vuex from 'vuex'
  import {useRoute} from 'vue-router'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'moviecomments',// 组件的名称，尽量和文件名一致
    components: {
      rankstar
    },
    setup(){
      const store = Vuex.useStore()
      const title = computed(() => store.state.detailTitle);
      const incommentList = computed(() => store.state.commentList);

      let detailData = reactive({
        list:[]
      })
      const route = useRoute()
      let id = computed(() => route.query.id);
      onMounted(async () => {
        let data = await service.get(configapi.comments(id.value),{
          start:0,
          count:20
        })

        detailData.list = incommentList.value.concat(data.reviews || [])

      });

      return {
        detailData,
        title
      }
    }
  }
</script>
<style scoped lang="less">

  .intro-title {
    margin: 24px 0 12px 0;
    font-size: 16px;
    color: #007722;
  }
  .top-content {
    display: flex;
    align-items: center;
    .avatar {
      width: 24px;
      height: 24px;
    }
    .nickname {
      font-size: 13px;
      margin-left: 10px;
      color: #37a;
      margin-right: 10px;;
    }
    .time {
      font-size: 13px;
      margin-left: 10px;
      color: #999;
    }
  }
  .comment-item {
    padding: 20px 0px;
    position: relative;
    border-top: 0.5px solid #ddd;
    margin-bottom: 5px;
  }
  .rankstar {
    display: flex;
    align-items: center;
  }
  .rank-text {
    margin-right: 3px;
  }
  .content {
    margin-top: 10px;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
  }

</style>
