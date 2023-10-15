const SHIFT = true;
const CTRL = true;
const NO_SHIFT = false;
const NO_CTRL = false;
var kL = [];
var IFs = '';
var tar = 0;
class shortcutJS{
	constructor(){
		this.keyBind = {};
		this.r = true;
	}
	createListener(){
		kL = Object.entries(this.keyBind);
		for(let i=0;i<kL.length;i++){
			window.addEventListener('keydown', function(event, tar=i){
				let ifs = '';
				if(typeof kL[tar][0]==='string')
					ifs+='event.key==="'+kL[tar][0]+'"';
				if(typeof kL[tar][0]==='number')
					ifs+='event.keyCode==='+kL[tar][0];
				if(kL[tar][1].shift)
					ifs+='&&event.shiftKey';
				if(kL[tar][1].ctrl)
					ifs+='&&event.ctrlKey';
				
				if(eval(ifs)){
					event.preventDefault();
					kL[tar][1].func();
					return false;
				}
				ifs='';
			});
		}
	}
	bind(key, func, shift=NO_SHIFT||[NO_SHIFT], ctrl=CTRL||[CTRL]){
		if(typeof func==='function'||Array.isArray(func)){
			if(typeof key==='string'||typeof key==='number'){
				key = key.substr(0,1);
				this.keyBind[key] = {'shift':shift,'ctrl':ctrl, 'func':func};
				return true;
			}else if(Array.isArray(key)){
				for(let i=0;i<key.length;i++){
					key[i] = key[i].substr(0,1);
					if(typeof func[i]==='function'){
						if(typeof key[i]==='string'||typeof key[i]==='number'){
							this.keyBind[key[i]] = {'shift':shift[i],'ctrl':ctrl[i], 'func':func[i]};
						}else{
							console.error(key[i]+' must be a function');
							return false;
						}
					}else{
						console.error(func[i]+' must be a function');
						return false;
					}
				}
				return true;
			}else{
				console.error(key+' must be a string|number|array');
				this.r = false;
			}
		}else{
			console.error(func+' must be a function|array');
			return false;
		}
		this.keyBind = {};
	}
	unbind(key){
		if(this.keyBind[key]){
			return delete this.keyBind[key];
		}else{
			console.error(key+' doesn`t have a set value');
			return false;
		}
	}
	strip(str){
		return str.split('')[0];
	}
	get(isKeyBind=true){
		return this.keyBind;
	}
}
export {shortcutJS, SHIFT, CTRL, NO_SHIFT, NO_CTRL} 