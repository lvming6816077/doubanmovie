<template>
  <div class="scoll-wrap">
    <div class="scroll-content" ref="scrollContent">
      <slot></slot>
    </div>
    <div class="control">
      <div class="left" @click="prePage"></div>
      <div class="right" @click="nextPage"></div>
    </div>
  </div>
</template>

<script>
/**
 * 单条已删除事项组件
 */

import { getCurrentInstance,ref } from 'vue';
export default {
  name: "slider",
  components:{
  },

  setup(props, context) {
    const { proxy } = getCurrentInstance()
    let translateX = 0
    const unit = 675 // (115 + 10 + 10)*5
    const prePage = ()=>{
      translateX = translateX - unit
      if (translateX <= 0) {
        translateX = 0
      }
      
      proxy.$refs.scrollContent.style.transform = 'translateX(-'+translateX+'px)'
    }
    const nextPage = ()=>{
      translateX = translateX + unit
      let maxwidth = proxy.$refs.scrollContent.clientWidth
      if (translateX >= maxwidth) {
        translateX = Math.max(maxwidth-unit,translateX-unit)
      }
      
      proxy.$refs.scrollContent.style.transform = 'translateX(-'+translateX+'px)'
    }

    return {
      prePage,
      nextPage
    };
  },
};
</script>

<style scoped lang="less">
  .scoll-wrap {
    overflow: hidden;
  }
  .scroll-content {
    white-space: nowrap;
    display: inline-block;
  }
  .control {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .left {
    width: 18px;
    height: 18px;
    background-image: url('./imgs/slide_swithc_2.png');
    cursor: pointer;
  }
  .right {
    margin-left: 15px;;
    width: 18px;
    height: 18px;
    background-image: url('./imgs/slide_swithc_2.png');
    background-position-x: -18px;
    cursor: pointer;
  }
  .scroll-content {
    transition: transform 500ms;
    transition-timing-function: ease-in-out;
  }
</style>
