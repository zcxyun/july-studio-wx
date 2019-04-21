// components/card-swiper/card-swiper.js
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: Array,
    dotStyle: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    previewImage() {
      const urls = this.properties.swiperList.map(item => item.url)
      wx.previewImage({
        urls
      })
    }
  }
})
