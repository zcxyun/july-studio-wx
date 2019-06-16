import { chunk } from '../../utils/collection.js'
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    dotStyle: true,
    isCard: false,
    cardsInfo: [],
    iconSwiperList: []
  },

  methods: {
    onMore(e) {
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: '/pages/more/more?name=' + name
      })
    },
    activeTabBar: function () {
      if (typeof (this.getTabBar === 'function') && this.getTabBar()) {
        this.getTabBar().setData({
          pageCur: 'home'
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
      this.initBanner(db)
      this.initIcons(db)
      this.initCards(db)
    },
    initBanner: function(db) {
      db.collection('banner').get({
        success: res => {
          this.setData({
            swiperList: res.data
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
    initIcons: function (db) {
      db.collection('icon').get({
        success: res => {
          this.setData({
            iconSwiperList: chunk(res.data, 8)
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
    initCards: function (db) {
      const command = db.command
      db.collection('card').where({
        name: command.nin(['画室展示', '作品墙', '部分作品'])
      }).get({
        success: res => {
          for (let i of res.data) {
            i.cardList.splice(3)
          }
          this.setData({
            cardsInfo: res.data
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
