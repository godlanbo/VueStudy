const Book = require('../model/Book')
const { insert, queryOne, querySql, update } = require('../db/mysql')
const _ = require('lodash')

function exists(book) {
  const {
    title,
    author,
    publisher
  } = book
  const sql = `select * from book where title='${title}' and author='${author}' and publisher='${publisher}';`
  return queryOne(sql)
}

async function removeBook(book) {
  if (book) {
    book.reset()
    if (book.fileName) {
      const removeBookSql = `delete from book where fileName='${book.fileName}';`
      const removeContents = `delete from contents where fileName='${book.fileName}';`
      await querySql(removeBookSql)
      await querySql(removeContents)
    }
  }
}

async function insertContents(book) {
  const contents = book.getContents()
  if (contents && contents.length > 0) {
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i]
      const _content = _.pick(content, [
        'fileName',
        'id',
        'href',
        'text',
        'order',
        'level',
        'label',
        'pid',
        'navId'
      ])
      await insert(_content, 'contents')
    }
  }
}

function insertBook(book) {
  return new Promise(async (resolve, reject) => {
    try {
      if (book instanceof Book) {
        const result = await exists(book)
        if (result) {
          await removeBook(book)
          reject(new Error('电子书已经存在'))
        } else {
          await insert(book.toDb(), 'book')
          await insertContents(book)
          resolve()
        }
      } else {
        reject(new Error('添加的图书对象不存在'))
      }
    } catch(err) {
      reject(err)
    }
  })
}

function updateBook(book) {
  return new Promise(async (resolve, reject) => {
    try {
      if (book instanceof Book) {
        const result = await getBook(book.fileName)
        if (result) {
          const model = book.toDb()
          await update(model, 'book', `where fileName='${book.fileName}'`)
          resolve()
        }
      } else {
        reject(new Error('错误的处理对象'))
      }
    } catch(err) {
      reject(err)
    }
  })
}

function getBook(fileName) {
  return new Promise(async (resolve, reject) => {
    const bookSql = `select * from book where fileName='${fileName}';`
    const contentsSql = `select * from contents where fileName='${fileName}' order by \`order\``
    try {
      const bookData = await queryOne(bookSql)
      const bookContents = await querySql(contentsSql)
      if (!bookData || bookData.length === 0) {
        reject(new Error('电子书不存在'))
      }
      bookData.cover = Book.genCoverUrl(bookData)
      bookData.contentsTree = Book.genContentsTree(bookContents)
      resolve(bookData)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  insertBook,
  getBook,
  updateBook
}