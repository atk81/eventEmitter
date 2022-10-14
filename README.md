# Event Emitter
An event emitter is a pattern that listens to a named event, fires a callback, then emits that event with a value. 
Sometimes this is referred to as a “pub/sub” model, or listener. 
It’s referring to the same thing.


```javascript
let n = 0;
const event = new EventEmitter();

event.subscribe("THUNDER_ON_THE_MOUNTAIN", value => (n = value));

event.emit("THUNDER_ON_THE_MOUNTAIN", 18);

// n: 18

event.emit("THUNDER_ON_THE_MOUNTAIN", 5);

// n: 5
```

