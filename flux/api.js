const api = {}
const rootpath = 'http://fe.superjia.com:8080/s/api/debug/3cd55e/house/'
  // var rootpath = window.pageConfig.siteUrl+"house/"
Vue.use(require('vue-resource'))
Vue.http.options.timeout = 5000
Vue.http.options.emulateJSON = true

//发布出租第一步
api.postRentHouse = function (json) {
  json = json || {}
  return Vue.http.post(rootpath + 'releaseRentHouseCheck', json)
}

//发布出租第二步
api.postRentPublish = function (json) {
  json = json || {};
  return Vue.http.post(rootpath + 'publish', json);
}

//发布出售第一步
api.publishSellFirst = function (json) {
  json = json || {}
  return Vue.http.get(rootpath + 'publishSellFirstStep', json)
}

//发布出售第二步
api.postpublishSell = function (json) {
  json = json || {}
  return Vue.http.post(rootpath + 'publishSellSecondStep', json)
}

//获取小区信息
api.getArea = function (json) {
  json = json || {}
  return Vue.http.get(rootpath + 'getEstatesByName', json)
}

//根据小区获取楼栋号
api.getBuilding = function (json) {
  json = json || {}
  return Vue.http.get(rootpath + 'getBuildingListBySubEstateId', json)
}

//根据楼栋号获取室号
api.getRoom = function (json) {
  json = json || {}
  return Vue.http.get(rootpath + 'getRoomsByBuilding', json)
}

module.exports = api
