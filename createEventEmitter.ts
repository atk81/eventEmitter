/*
 * Event Emitter can be created using two method
 * 1. By inheriting from base class
 * 2. Mixing: Copy it's method into other classes.
 * In this example we are going to explore the 1st way of doing things.
 * Next example: createEventEmitter1.ts.
 */

const utils = require("util");
const EventEmitter = require("events").EventEmitter;

// Create a MusicPlayer which will bind a new Event Emitter.
function MusicPlayer() {
    this.playing = false;
    EventEmitter.call(this);
}

// Audio Device will play/pause the music whenever you create a new event.
const AudioDevice = {
    play: (track) => {
        console.log(`Playing new track ${track}....🎸`);
    },
    stop: () => {
        console.log(`Stop playing...`)
    }
};

// Inherite Event Emitter.
utils.inherits(MusicPlayer, EventEmitter);

const musicPlayer = new MusicPlayer();

musicPlayer.on('play', (track)=>{
    this.playing = true;
    AudioDevice.play(track);
});

musicPlayer.on('error', (err)=>{
    this.playing = false;
    // Check if audio device is playing.. if so stop it.
    AudioDevice.stop();
    console.log(`Error: ${err}`);
});

musicPlayer.on('stop', ()=>{
    this.playing = false;
    console.log("Stopping .....");
    AudioDevice.stop();
    console.log(`Total Music played: ${Date.now() - this.startTime}`);
});

musicPlayer.once('play', ()=>{
    this.startTime = new Date(Date.now());
    console.log(`Timer Started: ${this.startTime}`);
})

// Use emit to trigger events.
musicPlayer.emit('play', "Kafirana sa hai");

setTimeout(()=>{
    musicPlayer.emit('stop');
}, 1000);

musicPlayer.emit('play', "Saiyyan- Kailash Kher");

// Remove play emitter: Not working...
musicPlayer.removeListener('play', ()=>{});

musicPlayer.emit('play', "Tujhe Dekh ke sona - Rahat Fateh Ali Khan");
