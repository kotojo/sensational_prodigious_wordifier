import Koa from 'koa'
const app = new Koa()
import WordPOS from 'wordpos'
const wordpos = new WordPOS()
import thesaurus from 'thesaurus'

app.use(async (ctx, next) => {
  try {
    let word = ctx.request.url.slice(1)
    await wordpos.getAdjectives(word, res => {
      if (res.length > 0) {
        ctx.body = thesaurus.find(word)[0]
      } else {
        ctx.body = 'no'
      }
    })
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})

app.listen(3000)
