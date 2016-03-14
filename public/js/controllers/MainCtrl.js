angular.module('MainCtrl', []).controller('MainController', function($scope) {

  $scope.tagline = 'drum machine and sampler';
  $scope.samples = [ {name: 'snare'}, {name: 'kick'} ];

  var browser = window.navigator.platform;
  var lang = window.navigator.language;
  console.log(browser, lang);

  navigator.getUserMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  $scope.requestMic = function(){
    navigator.getUserMedia({audio: true}, function(stream){
      var mic = context.createMediaStreamSource(stream);
      var filter = context.createBiquadFilter();
      mic.connect(filter);
      filter.connect(context.destination);
    }, function(){
      console.log('mic permission denied');
    });
  };

});
