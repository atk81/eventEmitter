const EventEmitter1 = require("events").EventEmitter;

function MusicPlayer1(track){
    this.playing = false;
    this.track = track;
    for(const methodName in EventEmitter1.prototype){
        this[methodName] = EventEmitter1.prototype[methodName];
    }
}

MusicPlayer1.prototype = {
    toString: function (){
        if(this.playing) {
            return `${this.track} is playing...🎸🎸`;
        } else {
            return `Stopped`;
        }
    }

}

const musicPlayer1 =  new MusicPlayer1("Aashiq banaya apne");

// There are some time, when we feel there are too many event listener exists, then we can create a centralized place where we can access all the diff. event listener.
const eventListener = {
    play: 'play',
    stop: 'stop',
}

musicPlayer1.on(eventListener.play, function () {
    this.playing = true;
    console.log(this.toString());
    // console.log(musicPlayer1);
    // console.log(`Current track is : ${this.track}`);
});

musicPlayer1.on(eventListener.stop, function (){
    this.playing = false;
    console.log(this.toString());
});

musicPlayer1.emit(eventListener.play);

setTimeout(()=>{
    musicPlayer1.emit(eventListener.stop);
}, 1000);
