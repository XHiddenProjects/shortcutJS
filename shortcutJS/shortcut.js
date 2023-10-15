const SHIFT = true;
const CTRL = true;
const NO_SHIFT = false;
const NO_CTRL = false;
var kL = [];
var IFs = '';
var tar = 0;
function backspace(key, str){
		if(key==='Backspace'){
			return str = str.substr(0,str.length-1);
		}else{
			return key;
		}
	}
function fixate(key, str){
	str += (str===''||str===null ? key : str);
	str = backspace(key, str);
	return str;
}
class shortcutJS{
	constructor(){
		this.keyBind = {};
		this.r = true;
	}
	createListener(){
		kL = Object.entries(this.keyBind);
		for(let i=0;i<kL.length;i++){
			window.addEventListener('keydown', function(event, tar=i){
				event.preventDefault();
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
					kL[tar][1].func();
				}else{
					if(document.activeElement.tagName.toLowerCase()==='input'||document.activeElement.tagName.toLowerCase()==='textarea'){
						if(!document.activeElement.disabled||!document.activeElement.readOnly){
							document.activeElement.value = fixate(event.key, document.activeElement.value);
						}
					}else{
						if(document.activeElement.getAttribute('contenteditable')){
							document.activeElement.innerHTML = fixate(event.key,document.activeElement.innerHTML);
						}
					}
				}
				ifs='';
			});
		}
	}
	bind(key, func, shift=NO_SHIFT|[NO_SHIFT], ctrl=NO_CTRL|[NO_CTRL]){
		if(typeof func==='function'||Array.isArray(func)){
			if(typeof key==='string'||typeof key==='number'){
				key = key.substr(0,1);
				this.keyBind[key] = {'shift':shift,'ctrl':ctrl, 'func':func};
			}else if(Array.isArray(key)){
				for(let i=0;i<key.length;i++){
					key[i] = key[i].substr(0,1);
					if(typeof key[i]==='string'||typeof key[i]==='number'||typeof func[i]==='function')
						this.keyBind[key[i]] = {'shift':shift[i],'ctrl':ctrl[i], 'func':func[i]};
				}
				return true;
			}else{
				console.error('KEY must be a string|number|array');
				this.r = false;
			}
		}else{
			console.error('bind[2] must be a function');
			return false;
		}
		this.keyBind = {};
	}
	strip(str){
		return str.split('')[0];
	}
	get(){
		return this.keyBind;
	}
}
export {shortcutJS, SHIFT, CTRL, NO_SHIFT, NO_CTRL} 