import {request} from 'ic-ajax';

var IndexController = Ember.Controller.extend({
  queryParams: ['search', 'lat', 'lng'],
  findZip: function(){
    if (this.get('lat') && this.get('lng')){
      var data = {
        data: {
          outFields: '*',
          f: 'json',
          geometry: '{"x":' + this.get('lng') + ' , "y":' + this.get('lat') + '}',
          geometryType: 'esriGeometryPoint',
          returnGeometry: 'true'
        },
        dataType: 'jsonp',
        jsonpCallback: 'loadData'
      };

      var url = 'http://www.codigopostal4-72.com.co/AGS/rest/services/Mapa472/MapServer/5/query';

      var _this = this;
      request(url, data).then(function(response){
        if ( response.features[0].attributes && response.features[0].attributes.Codigo_Postal) {
          _this.set('zip', response.features[0].attributes.Codigo_Postal);
        }
      });
    }
  },
  fireSearch: function(){
    Ember.run.debounce(this, this.findZip, 500);
  }.observes('lat', 'lng')
});

export default IndexController;
