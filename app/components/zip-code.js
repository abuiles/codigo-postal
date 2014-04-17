var ZipCodeComponent = Ember.Component.extend({
  classNames: ['zip-result-component'],
  zip: null,
  flash: function(){
    this.$('').addClass('animated flash');
  }.on('didInsertElement')
});

export default ZipCodeComponent;
