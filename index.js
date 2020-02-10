// components/clip/clip.js
import canvasClip from './lib/clip.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    customStyle: {
      type: String
    },

    src: {
      type: String
    },

    loading: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    clipStyle: 'width: 500rpx; height: 400rpx; position: absolute; z-index: 999;top: 9999rpx; left: 9999rpx;'
  },

  lifetimes: {
    ready() {
      this.properties.loading && wx.showLoading({
        title: '',
        mask: true
      })
    }
  },

  observers: {
    src(val) {
      val && canvasClip('#j-clip', val, this).then(path => {
        this.triggerEvent('done', path)
        this.data.loading && setTimeout(function() {
          wx.hideLoading()
        })
      }).catch(err => {
        this.triggerEvent('fail', err)
        this.data.loading && wx.hideLoading()
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
