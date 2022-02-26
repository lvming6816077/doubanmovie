
import { createStore as _createRouter } from 'vuex'
import service  from '../utils/service'
import configapi from '../utils/configapi'

export function createStore () {
  return _createRouter({
    state: {
      detailTitle:'',
      userInfo:{},
      commentList:[],
      nowplayList:[],
      recentplayList:[],
      rankList:[]
    },
    mutations: {
      /*
      * 设置title
      */
      setTitle(state, title){
        state.detailTitle = title
      },
      /*
      * 设置当前用户信息
      */
      setUser(state, obj){
        state.userInfo = obj
      },
      /*
      * 添加评论
      */
      setCommentList(state, obj){
        state.commentList.push(obj)
      },
      /*
      * 设置首屏数据
      */
      setHomeData(state, obj){

        state.rankList = obj.rankList.subject_collection_items || [];
        state.nowplayList = obj.nowplayList.subject_collection_items || [];
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
        state.recentplayList = toArray(obj.recentplayList.subject_collection_items || []);
      },
    },
    actions: {
      async getHomeMovieData(context, obj){
        // 请求正在热映数据
        let nowplayList = await service.get(configapi.nowmovie,{
          start:0,
          count:50,
        })
        // 请求最近热映数据
        let recentplayList = await service.get(configapi.recentmovie,{
          start:0,
          count:50,
        })
        // 请求榜单映数据
        let rankList = await service.get(configapi.toprank,{
          start:0,
          count:10,
        })

        context.commit('setHomeData',{
          nowplayList,
          recentplayList,
          rankList
        })
      }
    }
  })
}
