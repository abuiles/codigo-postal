var ZipCodeComponent = Ember.Component.extend({
  zip: null,
  flash: function(){
    this.$('').addClass('animated flash');
  }.on('didInsertElement')
});

export default ZipCodeComponent;
