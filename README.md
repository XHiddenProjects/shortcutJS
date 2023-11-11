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
const t1 = sc.bind('g',function(){console.log('New Tab');},s.NO_SHIFT,s.CTRL, S.NO_ALT); //Loads an event with the key of "g"+ctrlKey
const t2 = sc.bind(['g','s'],[function(){console.log('New Tab');},function(){console.log("Saved")}],[s.NO_SHIFT, s.NO_SHIFT],[s.CTRL, s.CTRL], [s.NO_ALT, s.NO_ALT]); //Loads multiple events of key of "g"+ctrlKey and "s"+ctrlKey
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
## update events
If you want to update a kind bind type:
```js
sc.update(oldKey, newKey);
```

make sure you unbind it before _creating a listener_

## stripping
This is for security tool that prevents any XSS injection onto the software, It takes a long string and splits in and returns into one character.

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

## adding/removing descriptions
To add a description, which can be usful to describe what the keybinds are, is to type this:
```js
sc.setDesc(key, desc='');//Set desc to description value
```
and to remove use:
```js
sc.remDesc(key);//Remove description off this key
```

## Show List
To display the the list off keybinds and description make sure you target a `UL/OL` list, this will render out the list on that.

Type:
```js
sc.showList(elem, clsLst='');// clsLst can be a string/array
```

## Actions
| VARIABLE | UI_VAR | OUTPUT | DESCRIPTION |
| -------- | ------ | ------ | ----------- |
| SHIFT    | *.SHIFT | TRUE | Sets ShiftKey true |
| CTRL     | *.CTRL | TRUE | Sets CtrlKey to true |
| ALT      | *.ALT  | TRUE | Sets AltKey to true |
| NO_SHIFT | *.NO_SHIFT | FALSE | Sets ShiftKey to false |
| NO_CTRL  | *.NO_CTRL | FALSE | Sets CtrlKey to false |
| NO_ALT   | *.NO_ALT  | FALSE | Sets AltKey to false |
