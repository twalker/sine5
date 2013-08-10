require.config({
  include: ["app"],
  paths: {
    d3: "d3.v3",
    "socket.io": "empty:"
  },

  shim: {
    "d3": {
      exports: "d3"
    },
    "socket.io": {
      exports: "io"
    }
  }
});

define(function(require, exports, module){
  var app = require('app'),
    domReady = require('domReady');

  domReady(function(){
    // initialize sine5
    app.init({ noboard: module.config().noboard });
  });
});