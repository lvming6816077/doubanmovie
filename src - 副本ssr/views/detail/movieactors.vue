<template>
  <div class="movie-actors" v-if="detailData.list.length">
    <h2 class="intro-title">
      {{title}}的演职员· · · · ·
    </h2>
    <div class="scroll-wrap">
      <div class="scroll-content">
        <div class="actor-item" v-for="item in detailData.list" :key="item.id">
          <img class="actor-img" :src="item.cover_url" />
          <div class="actor-name one-line">{{item.name}}</div>
          <div class="actor-character one-line">{{item.character}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {ref,onMounted,computed, reactive} from 'vue'
  import service from '@/utils/service'
  import configapi from '@/utils/configapi'
  import Vuex from 'vuex'
  import {useRoute} from 'vue-router'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'movieactors',// 组件的名称，尽量和文件名一致
    components: {
    },
    setup(){
      const store = Vuex.useStore()
      const title = computed(() => store.state.detailTitle);
      let detailData = reactive({
        list:[]
      })
      const route = useRoute()
      let id = computed(() => route.query.id);
      onMounted(async () => {
        let data = await service.get(configapi.actors(id.value))

        detailData.list = data.directors.concat(data.actors)

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
  .actor-item {
    display: inline-block;
    margin-right: 20px;
  }
  .scroll-wrap {
    overflow-x: auto;
    overflow-y: hidden;
  }
  .scroll-content {
    display: inline-block;
    white-space: nowrap;
  }
  .actor-name {
    width: 90px;
    color: #111;
    font-size: 13px;
    text-align: center;
  }
  .actor-character {
    color: #9b9b9b;
    font-size: 13px;
    text-align: center;
    width: 94px;
  }
  .actor-img {
    width: 95px;
    height: 133px;
    object-fit: cover;
    background-color:#ccc;
  }
  ::-webkit-scrollbar-track {
    background: #f6f6f6;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #cdcdcd;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-corner {
    background: #f6f6f6;
  }
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
</style>
