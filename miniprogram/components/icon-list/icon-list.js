// components/icon-list/icon-list.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    iconSwiperList: Array,
    dotStyle: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onIconTap(e) {
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: '/pages/more/more?name=' + name
      })
    }
  }
})
