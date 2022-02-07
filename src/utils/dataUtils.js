/**
 * 创建存储器 基于LocalStorage的封装
 * 允许存储基于JSON格式的数据
 */
export default {
  /**
   * 通过key值获取值
   * @param {String} key - key值
   */
  getItem(key) {
    let item = window.localStorage.getItem(key)
    // 获取到数据后，直接转换成JSON对象
    return item ? window.JSON.parse(item) : null
  },
  /**
   * 通过key值存储数据
   * @param {String} key - key值
   * @param {*} value - 需要存储的数据，将会转换成字符串
   */
  setItem(key, value) {
    window.localStorage.setItem(key, window.JSON.stringify(value))
  },
  /**
   * 删除指定key值的数据
   * @param {string} key
   */
  removeItem(key) {
    window.localStorage.removeItem(key)
  },
  /**
   * 清空当前系统的存储
   */
  clearAllItems() {
    window.localStorage.clear()
  }
}
