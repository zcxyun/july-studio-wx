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
      const index = e.currentTarget.dataset.index
      const urls = this.properties.cardList.map(item => item.headerImg)
      wx.previewImage({
        urls: urls,
        current: index
      })
    }
  }
})
