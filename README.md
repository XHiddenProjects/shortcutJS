# shortcutJS
A JS library that allows users to create shortcuts

## Install
Import code by using this, you can use `.min` or not
```js
import * as s from './shortcut.min.js';
//Loaded
let sc = new s.shortcutJS();
```
## Executing
To execute the code, you can add multiple/singler by using array/string. 

**NOTE: String will only executing once and cannot be added on.**

```js
const t1 = sc.bind('g',function(){console.log('New Tab');},s.NO_SHIFT,s.CTRL); //Loads an event with the key of "g"+ctrlKey
const t2 = sc.bind(['g','s'],[function(){console.log('New Tab');},function(){console.log("Saved")}],[s.NO_SHIFT, s.NO_SHIFT],[s.CTRL, s.CTRL]); //Loads multiple events of key of "g"+ctrlKey and "s"+ctrlKey
```

## activate events
To activate the events, you must create a listener, by typing:
```js
sc.createListener(); //Combines array "binds" and single "binds" with key events
```

## unbind events
If you want to remove a bind from existence you would have to unbind it, type:
```js
sc.unbind(keyName);
```
make sure you unbind it before _creating a listener_

## stripping
This is for security tool that prevents any XSS injection onto the software, It takes a long string and splits in and returns into on character.

Example:
`"<h1>" (before striped) -> "<" (after stripped)`

You would type:
```js
sc.strip(str);
```

## Returing keyBinds
To return the list of keybinds, you would have to type this:
```js
sc.get();//return JSON format of keyBinds
```
