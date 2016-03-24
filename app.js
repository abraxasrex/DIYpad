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


function startSound(){
  if(!oscillator){
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.value = 3000;
    oscillator.start(0);
    oscillator.connect( audioCtx.destination);
  }
}
function stopSound(){
  if(!!oscillator){
    oscillator.disconnect();
    oscillator.stop();
    oscillator = null;
  }

}

document.getElementById('start-sound').addEventListener('click', startSound);
document.getElementById('stop-sound').addEventListener('click', stopSound);

document.getElementById('C5').addEventListener('click', function(){
  if(!!oscillator){
    oscillator.frequency.value = 1046.50;
  }
});
document.getElementById('D5').addEventListener('click', function(){
  if(!!oscillator){
    oscillator.frequency.value = 1174.66;
  }
});

//document.getElementById()
