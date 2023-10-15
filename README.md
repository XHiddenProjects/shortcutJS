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
const t1 = sc.bind('g',function(){console.log('New Tab');},s.NO_SHIFT,s.CTRL);
const t2 = sc.bind(['g'],[function(){console.log('New Tab');}],[s.NO_SHIFT],[s.CTRL]);
```
