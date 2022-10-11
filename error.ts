/*
Error in event emitter is handle by special method.

Problem: You’re dealing with multiple non-blocking APIs, but are struggling to effectively handle errors.
Solution: Node’s domain module can be used to centralize error handling for a set of asynchronous operations,
and this includes EventEmitter instances that emit unhandled error events.
 */

const utils = require("util");
const EventEmitter = require("events").EventEmitter;
const domain = require('domain');
const audioDomain = domain.create();


class AudioDevice extends EventEmitter {
    constructor() {
        super();
        this.on('play', this.play.bind(this));
    }

    play(){
        this.emit('error', 'Play is not implemented yet');
    }
}



class MusicPlayer extends EventEmitter {
    constructor() {
        super();
        this.playing = false;
        this.audioDevice = new AudioDevice();
        // Just for testing, it should also be handled properly.
        this.audioDevice.emit('error', 'No audio track found!');
    };

    play(){
        this.playing = true;
        this.audioDevice = new AudioDevice();
        console.log(this.audioDevice);
        this.audioDevice.emit('play');
        console.log('Now playing');
    }
}


audioDomain.on('error', (err)=>{
    console.log(err);
})

audioDomain.run(function(){
    const musicPlayer = new MusicPlayer();
    musicPlayer.play();
});
