const EventEmitter = require('events').EventEmitter;

class Pulser extends EventEmitter {
    constructor(speed, times) {
        super();
        this.speed = speed;
        this.times = times;
        // Add a event-listener whenever a new eventlistener is added.
        this.on('newListener', this.newListener);
    }

    newListener(name, listener){
        if(name==='pulse'){
            this.start();
        }
    }

    start(){
        const id = setInterval(()=>{
            this.emit('pulse');
            this.times--;
            if(this.times===0){
                clearInterval(id);
            }
        }, this.speed);
    }
}

const pulser = new Pulser(500, 5);

pulser.on('pulse', ()=>{
    console.log('.');
});
