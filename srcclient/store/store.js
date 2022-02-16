
import {createStore} from 'vuex'
import dataUtils from '../utils/dataUtils'
const myPlugin = (store) => {
  store.subscribe((mutation, state) => {
    // 每次调用mutation，在这里持久化数据
    // dataUtils.setItem('todoList', state.todoItems)
    // dataUtils.setItem('recycleList', state.recycleItems)
  })
}
export default createStore({
  plugins: [myPlugin],
  state: {
    detailTitle:'',
    userInfo:{},
    commentList:[],
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
    // /*
    // * 设置搜索词
    // */
    // setSearchText(state, str){
    //   state.searchText = str
    // }
  },
  actions: {

  }
})