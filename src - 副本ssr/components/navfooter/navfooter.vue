<template>
  <div id="footer">
    <span id="icp" class="fleft gray-link">
      © 2021－2022 movie.com, all rights reserved 《Vue3.0》
    </span>
  </div>
</template>

<script>
/**
 * 顶部区域
 */
export default {
  name: "navfooter",
  setup(props, context) {

  },
};
</script>

<style scoped lang="less">
#footer {
  color: #999;
  padding: 6px 0;
  margin-top: 40px;
  overflow: hidden;
  zoom: 1;
  border-top: 1px dashed #ddd;
  text-align: center;
}
</style>
