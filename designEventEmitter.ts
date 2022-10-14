
/*

* Create an event emitter that goes like this

* emitter = new Emitter();

*

* Allows you to subscribe to some event

* sub1 = emitter.subscribe('function_name', callback1);

* (you can have multiple callbacks to the same event)

* sub2 = emitter.subscribe('function_name', callback2);

*

* You can emit the event you want with this api

* (you can receive 'n' number of arguments)

* emitter.emit('function_name', foo, bar);

*

* And allows you to release the subscription like this

* (but you should be able to still emit from sub2)

* sub1.release();

*/

class Emitter {
    // Create a subscriptions map
    subscriptions = new Map();
    subscribe(eventName, callback) {
        // Check if eventName exists or not, if not add it into the subscription map
        if(!this.subscriptions.get(eventName)){
            this.subscriptions.set(eventName, new Set());
        }

        const subscriptions = this.subscriptions.get(eventName);
        const callbackObj = { callback };
        subscriptions.add(callbackObj);

        return {
            release: ()=>{
                // Remove the only current callback.
                subscriptions.delete(callbackObj);
                // If not callback exists, then only delete the event.
                if(subscriptions.size === 0){
                    this.subscriptions.delete(eventName);
                }
            },
        }
    }

    emit(eventName, ...args){
        const subscriptions = this.subscriptions.get(eventName);
        if(subscriptions) {
            subscriptions.forEach(callbackObj => {
                callbackObj.callback.apply(this, args);
            });
        }
    }
}

const emitter = new Emitter();

const sub1 = emitter.subscribe('console', ()=>{
    console.log(`console`);
});

const sub2 = emitter.subscribe('add', (a, b)=>{
    console.log(`${a + b}`);
});

const sub3 = emitter.subscribe('add', (a,b)=>{
    console.log(`${a}, ${b}`);
});

emitter.emit('add', 'foo', 'bar');
emitter.emit('add', 11, 12);
sub3.release();
emitter.emit('add', 12, 13);

sub2.release();
