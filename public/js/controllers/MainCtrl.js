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



  $scope.stopScale = function(){
    if(!!oscillator){
      oscillator.disconnect();
      oscillator.stop();
      oscillator = null;
      console.log('stopped sound');
    }
  };

  $scope.oscType = 'square';
  $scope.startingFreq = 466.16;
  $scope.freqSpacing = 27;
  $scope.scaleLength = 12;
  $scope.noteLength = 500;

$scope.startScale = function(){
    if(!oscillator){
      oscillator = audioCtx.createOscillator();
      oscillator.type = $scope.oscType;
      oscillator.frequency.value = $scope.startingFreq;
      oscillator.start(0);
      oscillator.connect( audioCtx.destination);
      console.log('started sound, osc: ', oscillator);

      var i = 0;
      setInterval( function(){
        if(i <= $scope.scaleLength){

          $scope.stopScale();
          oscillator = audioCtx.createOscillator();
          oscillator.type = $scope.oscType;
          var max = ($scope.freqSpacing * $scope.scaleLength) + $scope.startingFreq;
          var min = $scope.startingFreq;
          oscillator.frequency.value = Math.random() * (max - min) + min;
          console.log('frequency: ', oscillator.frequency.value);
          oscillator.start(0);
          oscillator.connect( audioCtx.destination);
            i += 1;
        }else{
          $scope.stopScale();
          clearInterval();
        }
      }, $scope.noteLength);
    }
  }

  /*$scope.playC5 = function(){
    if(!!oscillator){
      oscillator.frequency.value = 1046.50;
    }
  };

  $scope.playD5 = function(){
    if(!!oscillator){
      oscillator.frequency.value = 1174.66;
    }
  }; */
  ////end of web audio code

});
