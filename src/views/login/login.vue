<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-logo"></div>
      <div class="login-title">用户登陆</div>
      <div class="input-wrap">
        <div><input class="login-input" type="text" placeholder="手机号 / 邮箱" v-model="loginInfo.username"/></div>
        <div><input class="login-input" type="password" placeholder="密码" v-model="loginInfo.password"/></div>
        <div class="login-btn" @click="login">登陆</div>
      </div>
      <div class="error-tips" v-if="loginInfo.errorInfo">用户名或密码错误</div>
      <div class="tips">lvming/abc123</div>
    </div>
  </div>
</template>

<script>
  import {reactive,ref,computed,onMounted,getCurrentInstance} from 'vue'
  
  import service from '@/utils/service'
  import Vuex from 'vuex'
  /**
   * 待办事项页面组件
   */
  export default {
    name: 'login',// 组件的名称，尽量和文件名一致
    data() {
      return {
        prevRoute: null
      }
    },
    components: {
    },
    setup(){

      let loginInfo = reactive({
        username:'',
        password:'',
        errorInfo: false
      })

      const userInfo = {
        nickname:'吕小鸣',
        age:30,
        username:'',
        avatar:'https://qiniu.nihaoshijie.com.cn/images/image-1559844211742.jpeg'
      }

      const store = Vuex.useStore()
      const { proxy } = getCurrentInstance()

      const login = ()=>{
        // 验证用户名密码
        if (loginInfo.username == 'lvming' && loginInfo.password == 'abc123') {
          store.commit('setUser',userInfo)
          loginInfo.errorInfo = false
          if (proxy.prevRoute) {
            proxy.$router.push(proxy.prevRoute)
          }
        } else {
          loginInfo.errorInfo = true
        }
      }
      

      return {
        loginInfo,
        login
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{
          // 获取vm this得到上一个页面路由from
          vm.prevRoute = from;
      })
    }
  }
</script>
<style scoped lang="less">
  .login-container {
    overflow: hidden;
  }
  .login-content {
    min-height: 300px;
    width: 340px;
    padding: 50px 30px 100px;
    margin: 0 auto;
    margin-top: 100px;
    overflow: hidden;
    position: relative;
    background: #fff;
    border: 1px solid #d8d8d8;
  }
  .login-title {
    border-bottom: 2px solid #494949;
    color: #333;
    font-weight: 600;
    font-size: 18px;
    width: 150px;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .login-logo {
    width: 225px;
    height: 44px;;
    margin: 0 auto;
    background-size: cover;
    background-image: url('./imgs/logo.png');
  }
  .input-wrap {
    text-align: center;
  }
  .login-input {
    width: 280px;
    font-size: 13px;
    padding: 10px;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #e4e6e5;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(255,0,0,0);
    background: transparent;
    outline: none;
    margin-top: 7px;
  }
  .login-btn {
    width: 280px;
    height: 36px;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
    outline: 0;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 10px;
    background-color: #41ac52;
  }
  .tips {
    margin-top: 10px;
    color: #ddd;
    text-align: center;
  }
  .error-tips {
    color: red;
    text-align: left;
    width: 280px;
    margin: 0 auto;
  }

</style>
