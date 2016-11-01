const Reflux = require('reflux');
const api = require('./api.js');
const action = require('./action.js');

module.exports = Reflux.createStore({
  init() {
    this.listenToMany(action);
  },
  onPostRentHouse(obj) {
    const self = this;
    api.postRentHouse(obj).then(function (data) {
      self.trigger('postRentHouse', data);
    });
  },
  onPostRentPublish(obj) {
    const self = this;
    api.postRentPublish(obj).then(function (data) {
      self.trigger('postRentPublish', data);
    });
  },
  onGetRoom(obj) {
    const self = this;
    api.getRoom(obj).then(function (data) {
      self.trigger('getRoom', data);
    });
  },
  onGetBuilding(obj) {
    const self = this;
    api.getBuilding(obj).then(function (data) {
      self.trigger('getBuilding', data);
    });
  },
  onPostpublishSell(obj) {
    const self = this;
    api.postpublishSell(obj).then(function (data) {
      self.trigger('postpublishSell', data);
    });
  },
  onPublishSellFirst(obj) {
    const self = this;
    api.publishSellFirst(obj).then(function (data) {
      self.trigger('publishSellFirst', data);
    });
  },
  onGetArea(obj) {
    const self = this;
    api.getArea(obj).then(function (data) {
      self.trigger('getArea', data);
    });
  }
})

/*
Reflux.ListenerMethods.listenTo(stores, (key, value, node) => {
})
actions.postRentHouse()
 */
