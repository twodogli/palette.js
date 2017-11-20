var mouseCurrentPos = ''
var onlyPalette = ''
var transition = false

var keyboardEvent = function(vm){
	vm._node.addEventListener('mouseenter',function(){
		mouseCurrentPos = vm
	})
	vm.palette.childNodes[3].addEventListener('click',function(){
		display(false)
		
	})

	window.addEventListener('keydown',function(e){
		if(transition){
			return
		}
		if(e.key == 'm'){
			if(onlyPalette){
				return
			}
			display(true)
		}
		else if(e.key == 'Escape'){
			display(false)
		}
	})
}

var display = function(is){
	onlyPalette = mouseCurrentPos
	if(is){
		onlyPalette.palette.style.display = 'block'
		setTimeout(function(){
			onlyPalette.palette.style.opacity = '1'
		},100)
	}
	else{
		transition = true
		
		onlyPalette.palette.style.opacity = '0'
		setTimeout(function(){
			onlyPalette.palette.style.display = 'none'
			onlyPalette = ''
			transition = false
		},1000)
		
	}
}

export default keyboardEvent