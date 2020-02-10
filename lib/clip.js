
/** canvas 裁图
* 1. 后台downloadFile域名下需添加 url域名
*/

/**
 * @param {String} cancasId
 * @param {String} url  原图地址
 * @param {String} 组件
 * @param {Number} canvasWidth 
 * @param {Number} canvasHeight
 * @param {Number} ratio 裁图宽高比
 */

const canvasClip = (canvasId, url, self, cw = 500, ch = 400, ratio = 5 / 4) => {

  const pixelRatio = 750 / wx.getSystemInfoSync().windowWidth
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().in(self)
      .select('#j-clip')
      .fields({
        node: true,
        size: true,
      })
      .exec(res => {
        const canvas = res[0].node
        canvas.width = cw
        canvas.height = ch
        const ctx = canvas.getContext('2d')
        const img = canvas.createImage()

        img.onload = () => {
          const canvasWidth = cw / pixelRatio
          const canvasHeight = ch / pixelRatio
          let x = 0
          let y = 0
          let imgWidth = img.width // 图片宽
          let imgHeight = img.height // 图片高
          let sImgWidth
          let sImgHeight

          if ((imgWidth / imgHeight) > ratio) {
            sImgHeight = ch
            sImgWidth = (sImgHeight * imgWidth) / imgHeight
            x = -(sImgWidth - cw) / 2
          } else {
            sImgWidth = cw
            sImgHeight = (sImgWidth * imgHeight) / imgWidth
            y = -(sImgHeight - ch) / 2
          }
          ctx.drawImage(img, x, y, sImgWidth, sImgHeight)

          wx.canvasToTempFilePath({
            canvasId: canvasId,
            canvas: canvas,
            success: res => {
              const path = res.tempFilePath
              resolve(path)
              console.log('************* path', path)
            },
            fail: (err) => {
              reject('裁图：存储canvas到临时路径失败', err)
            }
          })
        }
        img.src = url
      })
  })
}

export default canvasClip