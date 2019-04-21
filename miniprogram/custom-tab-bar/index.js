//index.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  // properties: {
  //   pageCur: {
  //     type: String,
  //     value: 'home'
  //   }
  // },
  data: {
    pageCur: 'home'
  },
  methods: {
    NavChange: function (e) {
      const pageCur = e.currentTarget.dataset.cur
      // if (app.globalData.pageCur !== pageCur) {
        // app.globalData.pageCur = pageCur
        wx.switchTab({
          url: `/pages/${pageCur}/${pageCur}`
        })
      // }
    } 
  }
})
