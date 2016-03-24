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

  /////beginning of web audio code
  var audioCtx;
  var oscillator;
  var connected;
  var currentOscs = [];

  //tone library provided by johnny reis (https://github.com/jjjreisss)
  var Tones = {
    "A#3": 466.16,
    "B3": 493.88,
    "C4":	523.25,
    "C#4": 554.37,
    "D4":	587.33,
    "D#4": 622.25,
    "E4":	659.25,
    "F4":	698.46,
    "F#4": 739.99,
    "G4":	783.99,
    "G#4":	830.61,
    "A4":	880.00,
     "A#4": 932.33,
    "B4":	987.77,
    "C5":	1046.50,
    "C#5": 	1108.73,
    "D5":	1174.66,
    "D#5": 	1244.51,
    "E5":	1318.51,
    "F5":	1396.91,
    "F#5": 	1479.98,
    "G5":	1567.98
  };


  (function initContext(){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }());


  $scope.startSound = function(){
    if(!oscillator){
      oscillator = audioCtx.createOscillator();
      oscillator.type = 'square';
      oscillator.frequency.value = 3000;
      oscillator.start(0);
      oscillator.connect( audioCtx.destination);
      console.log('started sound, osc: ', oscillator);
    }
  };
  $scope.stopSound = function(){
    if(!!oscillator){
      oscillator.disconnect();
      oscillator.stop();
      oscillator = null;
      console.log('stopped sound');
    }
  };
  $scope.playC5 = function(){
    if(!!oscillator){
      oscillator.frequency.value = 1046.50;
    }
  };

  $scope.playD5 = function(){
    if(!!oscillator){
      oscillator.frequency.value = 1174.66;
    }
  };
  ////end of web audio code

});
