Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    isCard: true,
    list: [],
    tabCur: 0,
    mainCur: 0,
    verticalNavTop: 0,
    load: true,
    pageCur: ''
  },
  methods: {
    onMore(e) {
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: '/pages/more/more?name=' + name
      })
    },
    tabSelect(e) {
      this.setData({
        tabCur: e.currentTarget.dataset.id,
        mainCur: e.currentTarget.dataset.id,
        verticalNavTop: (e.currentTarget.dataset.id - 1) * 50
      })
    },
    verticalMain(e) {
      let that = this;
      let list = this.data.list;
      let tabHeight = 0;
      if (this.data.load) {
        for (let i = 0; i < list.length; i++) {
          let view = wx.createSelectorQuery().in(this).select("#main-" + list[i].id);
          view.fields({
            size: true
          }, data => {
            list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            list[i].bottom = tabHeight;
          }).exec();
        }
        that.setData({
          load: false,
          list: list
        })
      }
      let scrollTop = e.detail.scrollTop + 20;
      for (let i = 0; i < list.length; i++) {
        if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
          that.setData({
            verticalNavTop: (list[i].id - 1) * 50,
            tabCur: list[i].id
          })
          return false
        }
      }
    },
    activeTabBar: function () {
      if (typeof (this.getTabBar === 'function') && this.getTabBar()) {
        this.getTabBar().setData({
          pageCur: 'category'
        })
      }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title: '加载中...',
      })
      this.activeTabBar()
      this.initData()
    },

    initData: function() {
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('card').where({
        name: _.nin(['画室展示', '作品墙', '部分作品'])
      }).get({
        success: res => {
          for (let i of res.data) {
            i.cardList.splice(3)
          }
          this.setData({
            list: res.data
          })
          console.log('[数据库] [查询记录] 成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      wx.hideLoading()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  }
})
