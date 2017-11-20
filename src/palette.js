import {getComputedValue,rgbDecompose,rgbCombine} from './rgbHandle'
import styleModifier from './styleModifier'
import bomEventBind from './bomEvent'
//palette:Sth use to custom color

//________________________
//|						  |
//| --------||----------  | <--input
//| -----||-------------  |
//| ------------||------  |
//|_______________________|
//
//this module create a div like this

export var onlyPalette = ''

var createPalette = function(colorRGB){
	var div = document.createElement('div')
	div.setAttribute('class','palette')
	for (var x=0;x<=2;x++)
	{
		//在div元素中插入3个input用于调节颜色
		var input = document.createElement('input')
		input.setAttribute('value',parseInt(colorRGB[x]))
		input.setAttribute('max',255)
		input.setAttribute('min',0)
		input.setAttribute('type','range')
		div.append(input)
	}
	styleModifier(div,{
		backgroundColor:'#89be82',
		width:'200px',
		height:'100px',
		textAlign:'center',
		position:'fixed',
		top:'0',
		left:'0',
		paddingTop:'15px',
		display:'none',
		opacity:'0',
		transition:'opacity 1s'
	})
	
	//右上角一个叉，用来关闭palette

	var a = document.createElement('a')
	a.innerHTML = '×'
	a.setAttribute('href','javascript:void(0)')
	styleModifier(a,{
		position:'absolute',
		top:'0',
		right:'20px',
		display:'block',
		width:'10px',
		height:'10px',
		fontSize:'1.5rem',
		textDecoration:'none',
		color:'white'
	})
	
	div.append(a)

	return div
}



//append a div and return an object
export function buildPalette(N,Target){
	this._node = N
	this.target = Target
	//this.palette = palette
	
}


buildPalette.prototype.bindNode = function(){
	//N mean node ,the node which need to change color

	//用于定义初始值
	var colorRGB = getComputedValue(this._node,this.target)
	var palette = createPalette(colorRGB)
	//将整个palette节点储存起来
	this.palette = palette
	var vm = this

	this._node.append(palette)

	//给palette上的表单逐个绑定input事件
	for (let x=0;x<this.palette.childNodes.length;x++){
		this.palette.childNodes[x].addEventListener('input',function(){
			vm.changeColor()
			
		})
	}
	//
	bomEventBind(this)
}

var displayEvent = function(vm){
	vm._node.addEventListener('mouseenter',function(){
		vm.defineOnly(true)
		
	})
	vm.palette.childNodes[3].addEventListener('click',function(){
		vm.defineOnly(false)		
	})
}
//只允许一个palette存在，用于切换当前的palette并且显示出来。
buildPalette.prototype.defineOnly = function(display){
	
	
		onlyPalette = this
		
		
}

//用于改变颜色，每次都重新获取绑定在该元素上的三个表单的值，然后改变它的style
buildPalette.prototype.changeColor = function(){
	var rgb = []
	//减一个是为了减掉×这个节点
	for (let x=0;x<this.palette.childNodes.length - 1;x++){
		rgb.push(this.palette.childNodes[x].value)
	}
	var rgb = rgbCombine(rgb)
	this._node.style[this.target] = rgb
}


