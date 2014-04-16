module.exports = function(environment) {
  var ENV = {
    rootURL: '/',
    gmapsApiKey: 'AIzaSyCnZsN4gNqD4HPs5LaHlmZ11ATJsWkj6NQ',
    FEATURES: {
      "query-params-new" : true
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_MODULE_RESOLVER = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'production') {

  }

  return JSON.stringify(ENV); // Set in index.html
};
