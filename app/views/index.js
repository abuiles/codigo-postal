import GMaps from 'GMaps';

var computed = Ember.computed;

var IndexView = Ember.View.extend({
  animate: function() {
    if (this.get('controller.zip')) {
      this.get('infoWindow').setContent('<p class="info-marker">' + this.get('controller.zip') + '</p>');
      $(".info-marker").addClass('animated flash');
    }
  }.observes('controller.zip'),
  map: computed(function(){
    return new GMaps({
      el: '#map',
      lng: -75.57513699999998,
      lat: 6.235925
    });
  }),
  marker: computed(function(){
    var controller = this.get('controller');
    var lat = 6.235925,
        lng = -75.57513699999998;

    if (controller.get('lat') && controller.get('lng')){
      lat = controller.get('lat');
      lng = controller.get('lng');
    }
    var myLatlng = new google.maps.LatLng(lat,lng);

    return new google.maps.Marker({
      position: myLatlng,
      draggable:true,
      title:"Drag me!"
    });
  }),
  infoWindow: computed(function(){
    return new google.maps.InfoWindow({
      content: ""
    });
  }),
  markerChange: function() {
    var controller = this.get('controller'),
        marker = this.get('marker');

    controller.set('lat', marker.position.lat());
    controller.set('lng', marker.position.lng());
    this.get('map').setCenter(marker.position.lat(), marker.position.lng());
  },
  renderMap: function() {
    var map = this.get('map'),
        marker = this.get('marker'),
        infoWindow = this.get('infoWindow');

    marker.setMap(map.map);
    infoWindow.open(map,marker);


    var markerChange = this.markerChange.bind(this);
    google.maps.event.addListener(marker, 'dragend', markerChange);

    if (this.get('controller.search') === null){
      GMaps.geolocate({
        success: function(position){
          map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function(error){
          console.log('Geolocation failed: '+error.message);
        },
        not_supported: function(){
          console.log("Your browser does not support geolocation");
        },
        always: function(){
          console.log("Done!");
        }
      });
    }
  }.on('didInsertElement'),
  search: function(){
    var controller = this.get('controller'),
      search = controller.get('search'),
      map = this.get('map'),
      marker = this.get('marker');

    if (!search) {
      return false;
    }

    GMaps.geocode({
      address: search.trim(),
      callback: function(results, status){
        if(status=='OK'){
          var latlng = results[0].geometry.location;
          map.setCenter(latlng.lat(), latlng.lng());
          marker.setPosition(latlng);
          controller.setProperties({lat: latlng.lat(), lng: latlng.lng()});
        }
      }
    });
  },
  mapObserver: function(){
    Ember.run.debounce(this, this.search, 300);
  }.observes('controller.search')
});


export default IndexView;
