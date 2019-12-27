const {
  MIME_TYPE_EPUB,
  UPLOAD_URL,
  UPLOAD_PATH
} = require('../utils/constant')
const fs = require('fs')
const Epub = require('../utils/epub')
const xml2js = require('xml2js').parseString

class Book {
  constructor(file, data) {
    if (file) {
      this.createBookFromFile(file)
    } else {
      this.createBookFromData(data)
    }
  }
  createBookFromFile(file) {
    const {
      destination,
      filename,
      mimetype = MIME_TYPE_EPUB,
      path,
      originalname
    } = file
    const suffix = mimetype === MIME_TYPE_EPUB ? '.epub' : ''
    const oldBookPath = path
    const bookPath = `${destination}/${filename}${suffix}`
    const url = `${UPLOAD_URL}/book/${filename}${suffix}`
    const unzipPath = `${UPLOAD_PATH}/unzip/${filename}`
    const unzipUrl = `${UPLOAD_URL}/unzip/${filename}`
    if (!fs.existsSync(unzipPath)) {
      fs.mkdirSync(unzipPath, { recursive: true })
    }
    if (fs.existsSync(oldBookPath) && !fs.existsSync(bookPath)) {
      fs.renameSync(oldBookPath, bookPath)
    }
    this.fileName = filename // 文件名
    this.path = `/book/${filename}${suffix}` // epub文件路径
    this.filePath = this.path // epub文件路径
    this.url = url // epub文件url
    this.title = '' // 标题
    this.author = '' // 作者
    this.publisher = '' // 出版社
    this.contents = [] // 目录
    this.coverUrl = '' // 封面图片URL
    this.coverPath = ''
    this.category = -1 // 分类ID
    this.categoryText = '' // 分类名称
    this.language = '' // 语种
    this.unzipPath = `/unzip/${filename}` // 解压后的电子书目录
    this.unzipUrl = unzipUrl // 解压后的电子书链接
    this.originalName = originalname
  }
  createBookFromData(data) {

  }
  parse() {
    return new Promise((resolve, reject) => {
      const bookPath = `${UPLOAD_PATH}${this.filePath}`
      if (!fs.existsSync(bookPath)) {
        reject(new Error('电子书不存在'))
      }
      const epub = new Epub(bookPath)
      epub.on('error', err => {
        reject(err)
      })
      epub.on('end', err => {
        if (err) {
          reject(err)
        } else {
          const {
            language,
            createor,
            createorFileAs,
            title,
            cover,
            publisher
          } = epub.metadata
          if (!title) {
            reject(new Error('图书标题为空'))
          } else {
            this.title = title
            this.language = language || 'en'
            this.author = createor || createorFileAs || 'unknow'
            this.publisher = publisher || 'unkonw'
            this.rootFile = epub.rootFile
            const handleImage = (err, file, mimeType) => {
              if (err) {
                reject(err)
              } else {
                const suffix = mimeType.split('/')[1]
                const coverPath = `${UPLOAD_PATH}/img/${this.fileName}.${suffix}`
                const coverUrl = `${UPLOAD_URL}/img/${this.fileName}.${suffix}`
                fs.writeFileSync(coverPath, file, 'binary')
                this.coverPath = `/img/${this.fileName}.${suffix}`
                this.coverUrl = coverUrl
                resolve(this)
              }
            }
            try {
              this.unzip()
              this.parseContents(epub)
              epub.getImage(cover, handleImage)
            } catch(err) {
              reject(err)
            }
          }
        }
      })
      epub.parse()
    })
  }
  unzip() {
    const AdmZip = require('adm-zip')
    const zip = new AdmZip(Book.genPath(this.path))
    zip.extractAllTo(Book.genPath(this.unzipPath), true)
  }
  parseContents(epub) {
    const getNcxFilePath = () => {
      const spine = epub && epub.spine
      const manifest = epub && epub.manifest
      const ncx = spine.toc && spine.toc.href
      const id = spine.toc && spine.toc.id
      if (ncx) {
        return ncx
      } else {
        return manifest[id].href
      }
    }
    const findParent = (array) => {
      return array.map(item => {
        return item
      })
    }
    const flatten = (array) => {
      return [].concat(...array.map(item => {
        return item
      }))
    }
    const ncxFilePath = Book.genPath(`${this.unzipPath}/${getNcxFilePath()}`)
    // console.log(ncxFilePath)
    if (fs.existsSync(ncxFilePath)) {
      return new Promise((resolve, reject) => {
        const xml = fs.readFileSync(ncxFilePath, 'utf-8')
        xml2js(xml, {
          explicitArray: false,
          ignoreAttrs: false
        }, (err, json) => {
          if (err) {
            reject(err)
          } else {
            const navMap = json.ncx.navMap
            if (navMap.navPoint && navMap.navPoint.length > 0) {
              navMap.navPoint = findParent(navMap.navPoint)
              const newNavMap = flatten(navMap.navPoint)
              const chapters = []
              epub.flow.forEach((chapter, index) => {
                if (index + 1 > newNavMap.length) {
                  return
                }
                const nav = newNavMap[index]
                chapter.text = `${UPLOAD_URL}/unzip/${this.fileName}/${chapter.href}`
                if (nav && nav.navLabel) {
                  chapter.label = nav.navLabel.text || ''
                } else {
                  chapter.label = ''
                }
                chapter.navId = nav['$'].id
                chapter.fileName = this.fileName
                chapter.order = index + 1
                chapters.push(chapter)
              })
            } else {
              reject(new Error('目录解析失败'))
            }
          }
        })
      })
    } else {
      throw new Error('目录文件不存在')
    }
  }
  static genPath(path) {
    if (path.startsWith('/')) {
      path = `/${path}`
    }
    return `${UPLOAD_PATH}${path}`
  }
}

module.exports = Book