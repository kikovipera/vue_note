import 'whatwg-fetch'
module.exports = (url, opt) => {
  const cf = Object.assign({
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }, opt)
  const method = cf.method.toLowerCase()
  // if ( && cf.body) {
  //   const _query = Object.keys(cf.body).map(key => cf.body[key] && `${key}=${cf.body[key]}`).join('&')
  //   url += url.indexOf('?') > 1 ? '&' : '?'
  //   url += _query
  //   delete cf.body
  // }
  if (method === 'post' || method === 'put') {
    cf.body = JSON.stringify(cf.body)
  } else if (cf.body) {
    const _query = Object.keys(cf.body).map(key => cf.body[key] && `${key}=${cf.body[key]}`).join('&')
    url += url.indexOf('?') > 1 ? '&' : '?'
    url += _query
    delete cf.body
  }
  const promise = fetch(url, cf)
  .then(res => {
    if (res.status >= 200 && res.status <= 300) {
      return res.json()
    } else throw new Error('Something went wrong on api server!');
  })
  .then(res => {
    if (res.status !== 1) {
      console.log(res.msg)
    }
    return res
  })
  return promise
}

/*
// const header = new Headers()
//   header.append('Accept', 'application/json')
// const req = new Request(api(opt.url), {
//   headers: header,
//   method: opt.method || 'GET',
//   cache: 'reload',
//   mode: 'no-cors',
//   body: opt.data || {}
// })
reqHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
 */