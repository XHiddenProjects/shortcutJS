/*
@Author XHiddenProjects
@Version 1.1.2
@Updated 06/19/24
*/
const SHIFT = true;
const CTRL = true;
const ALT = true;
const NO_SHIFT = false;
const NO_CTRL = false;
const NO_ALT = false;
var kL = [];
var IFs = '';
var tar = 0;
class shortcutJS{
	constructor(){
		this.keyBind = {};
		this.r = true;
	}
	createListener(obj=window){
		kL = Object.entries(this.keyBind);
		for(let i=0;i<kL.length;i++){
			obj.addEventListener('keydown', function(event, tar=i){
				let ifs = '';
				if(typeof kL[tar][0]==='string')
					ifs+='event.key==="'+kL[tar][0]+'"';
				if(typeof kL[tar][0]==='number')
					ifs+='event.keyCode==='+kL[tar][0];
				if(kL[tar][1].shift){
					ifs+='&&event.shiftKey';
				}else{
					ifs+='&&!event.shiftKey';
				}
				if(kL[tar][1].ctrl){
					ifs+='&&event.ctrlKey';
				}else{
					ifs+='&&!event.ctrlKey';
				}
				if(kL[tar][1].alt){
					ifs+='&&event.altKey';
				}else{
					ifs+='&&!event.altKey';
				}
				if(eval(ifs)){
					event.preventDefault();
					kL[tar][1].func();
					return false;
				}
				ifs='';
			});
		}
	}
	bind(key, func, shift=NO_SHIFT||[NO_SHIFT], ctrl=CTRL||[CTRL], alt=ALT||[ALT]){
		if(typeof func==='function'||Array.isArray(func)){
			/*KeyValue*/
			if(typeof key==='string'){
				key = key.substr(0,15);
				this.keyBind[key] = {'shift':shift,'ctrl':ctrl, 'alt':alt ,'func':func};
				return true;
			}else if(Array.isArray(key)){
				for(let i=0;i<key.length;i++){
					key[i] = key[i].substr(0,15);
					if(typeof func[i]==='function'){
						if(typeof key[i]==='string'||typeof key[i]==='number'){
							this.keyBind[key[i]] = {'shift':shift[i],'ctrl':ctrl[i], 'alt':alt[i], 'func':func[i]};
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
				console.error(key+' must be a string|array');
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
	update(oldKey, newKey){
		this.keyBind[newKey] = this.keyBind[oldKey];
		return delete this.keyBind[oldKey];
	}
	setDesc(key, desc=''){
		if(this.keyBind[key]){
			this.keyBind[key].desc = desc;
		}else{
			console.error(key+' doesn`t have a set value');
			return false;
		}
	}
	remDesc(key){
		if(this.keyBind[key].desc){
			return delete this.keyBind[key].desc;
		}else{
			console.error(key+' doesn`t have a set description');
			return false;
		}
	}
	strip(str){
		let cm = '';
		for(let i=0;i<str.split('').length;i++){
			if(i<=15)
				cm+=str.split('')[i];
		}
		return cm;
	}
	get(){
		return this.keyBind;
	}
	showList(elem, clsLst=''){
		let x = document.querySelector(elem);
		if(x&&x.tagName.toLowerCase()==='ol'||x.tagName.toLowerCase()==='ul'){
			x.classList.add('scList');
			let style = document.createElement('style');
			style.innerHTML = '.scList .cmd{float:right;font-weight:bold;font-style:italic;color:#7a7878;}';
			document.head.appendChild(style);
			let obj = Object.entries(this.keyBind);
			for(let i=0;i<obj.length;i++){
				let L = document.createElement('li');
				if(Array.isArray(clsLst)){
					L.classList.add(clsLst[i]);
				}else if(clsLst!==''){
					L.classList.add(clsLst);
				}else{
					L.className = '';
				}
				L.innerHTML+='<span class="desc">'+(obj[i][1].desc ? obj[i][1].desc : '')+'</span> ';
				L.innerHTML+='<span class="cmd">'+(obj[i][1].alt ? 'ALT+' : '')+(obj[i][1].ctrl ? 'CTRL+' : '')+(obj[i][1].shift ? 'Shift+' : '')+obj[i][0]+'</span>';
				x.appendChild(L);
			}	
		}else{
			console.error(elem+' does not exists or element is not OL/UL!');
			return false;
		}
	}
}
