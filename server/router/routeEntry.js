module.exports = function(app, router) {
  app.use(router.routes())
  router.get('/login', function*() {
    yield this.render('index', {
      staticTag: 'app'
    })
  })
  router.get('/user', function*() {
    yield this.render('index', {
      staticTag: 'app'
    })
  })
  router.get('/home', function*() {
    yield this.render('index', {
      staticTag: 'app'
    })
  })
}

/*
ar payload = {
    a: 1,
    b: 2
};
var data = new FormData();
data.append( "json", JSON.stringify( payload ) );
fetch("/echo/json/",{
    method: "POST",
    body: data
})
*/