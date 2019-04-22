Component({
  /**
   * 页面的初始数据
   */
  data: {
    isCard: false,
    naviTitle: '',
    cardsToShow: [],
    pageSize: 5,
    isLoad: false,
    showBottomLoading: false
  },
  methods: {
    initData: function (db, name) {
      db.collection('card').where({
        name: name
      }).get({
        success: res => {
          const cardInfo = res.data[0]
          this.setData({
            naviTitle: cardInfo.name,
            cardList: cardInfo.cardList,
            cardsToShow: cardInfo.cardList.splice(0, this.data.pageSize)
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        },
        complete: res => {
          wx.hideLoading()
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (res) {
      wx.showLoading({
        title: '加载中...',
      })
      const db = wx.cloud.database()
      this.initData(db, res.name)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      this.setData({
        showBottomLoading: true
      })
      const curCarsToShow = this.data.cardsToShow
      const cardList = this.data.cardList
      if (curCarsToShow.length < cardList.length) {

        const start = curCarsToShow.length
        const moreCardsToShow = cardList.slice(start, start+this.data.pageSize)
        const cardsToShow = curCarsToShow.concat(moreCardsToShow)
        this.setData({
          cardsToShow
          // showBottomLoading: false
        })
      } else {
        this.setData({
          isLoad: true
        })
      }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  }
})
