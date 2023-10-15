<html>
<head>
	<title>shortcutJS</title>
</head>
<body>
<input type="text"/>

<script type="module">
import * as s from './shortcut.js?t=<?php echo time();?>';
let sc = new s.shortcutJS();
if(sc.bind(['r', 'g'],[function(){window.location.reload();},function(){console.log('New Tab');}],[s.NO_SHIFT,s.NO_SHIFT],[s.CTRL,s.NO_CTRL])){
		sc.createListener();
};
</script>
</body>
</html>