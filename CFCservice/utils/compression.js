const imagemin = require('imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')

async function compressImg(imgPath, destination) {
  await imagemin([imgPath], {
    destination: destination,
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8]
      }),
      imageminMozjpeg({
        quality: 65, progressive: true
      })
    ]
  })
}

module.exports = compressImg