/*
Problem:
    You need to either catch when a listener has been added to an emitter, or query the existing listeners.
Solution:
    To track when listeners are added, EventEmitter emits a special event called new-Listener.
    Listeners added to this event will receive the event name and the listener function.
 */

const EventEmitter = require('events').EventEmitter;

class MusicPlayer extends EventEmitter{
    constructor() {
        super();
        this.playing = false;
        this.on('newListener', this.newListner.bind(this));
    }

    // Listen a new listner is added into MusicPlayer
    newListner(name, listener){
        console.log(`A new listener has been added : ${name}`);
    }
}

const musicPlayer = new MusicPlayer();

musicPlayer.on('play', ()=>{
    this.playing = true;
    console.log("Playing...");
});

musicPlayer.on('stop', ()=>{
    this.playing = false;
    console.log("Stopping..");
});
