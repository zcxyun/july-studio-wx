// pages/more/more.js
import moreData from '../../data/more.js'
Component({
  /**
   * 页面的初始数据
   */
  data: {
    // cardsInfo: moreData.cardsInfo,
    isCard: false,
    cardInfo: {}
  },
  methods: {
    initData: function (db, name) {
      db.collection('card').where({
        name: name
      }).get({
        success: res => {
          this.setData({
            cardInfo: res.data[0]
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
     * 生命周期函数--监听页面加载
     */
    onLoad: function (res) {
      const db = wx.cloud.database()
      this.initData(db, res.name)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
