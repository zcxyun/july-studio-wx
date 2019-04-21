// components/card-list/card-list.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cardList: Array,
    isCard: Boolean
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
    onPhoto(e) {
      const headerImg = e.currentTarget.dataset.headerImg
      wx.previewImage({
        urls: [headerImg]
      })
    }
  }
})
